const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const Stripe = require("stripe");
const express = require("express");
const cors = require("cors");

admin.initializeApp();

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");


/* ================= STRIPE WEBHOOK ================= */
exports.stripeWebhook = onRequest(
  { secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET] },
  async (req, res) => {
    const stripe = new Stripe(STRIPE_SECRET_KEY.value());

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        STRIPE_WEBHOOK_SECRET.value()
      );
    } catch (err) {
      return res.status(400).send("Webhook Error");
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;

      const pendingRef = admin
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("pendingOrders")
        .doc("cart");

      const snap = await pendingRef.get();
      const items = snap.data()?.items || [];

      await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("orders")
        .doc(session.id)
        .set({
          amount: session.amount_total / 100,
          payment_status: session.payment_status,
          created: admin.firestore.FieldValue.serverTimestamp(),
          items,
        });

      await pendingRef.delete();
    }

    res.json({ received: true });
  }
);


/* ================= API ================= */
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/createCheckoutSession", async (req, res) => {
  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY.value());
    const { items, userId } = req.body;

    await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("pendingOrders")
      .doc("cart")
      .set({ items });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.title },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

      metadata: { userId },

      success_url: "https://amazon-backend.netlify.app/success",
      cancel_url: "https://amazon-backend.netlify.app/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: "Checkout failed" });
  }
});

exports.api = onRequest({ secrets: [STRIPE_SECRET_KEY] }, app);
