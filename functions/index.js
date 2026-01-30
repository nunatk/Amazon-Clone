const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const Stripe = require("stripe");
const express = require("express");
const cors = require("cors");

admin.initializeApp();

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");

/* ================== STRIPE WEBHOOK (NO EXPRESS) ================== */
exports.stripeWebhook = onRequest(
  { secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET] },
  async (req, res) => {
    const stripe = new Stripe(STRIPE_SECRET_KEY.value());
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody, 
        sig,
        STRIPE_WEBHOOK_SECRET.value()
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send("Webhook Error");
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      await admin
        .firestore()
        .collection("users")
        .doc(session.metadata.userId)
        .collection("orders")
        .doc(session.id)
        .set({
          amount: session.amount_total / 100,
          payment_status: session.payment_status,
          created: admin.firestore.FieldValue.serverTimestamp(),
          items: JSON.parse(session.metadata.items),
        });

      console.log("Order saved:", session.id);
    }

    res.json({ received: true });
  }
);

/* ================== EXPRESS API (CHECKOUT ONLY) ================== */
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/createCheckoutSession", async (req, res) => {
  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY.value());
    const { items, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      metadata: {
        userId,
        items: JSON.stringify(items),
      },
      success_url: "http://localhost:5173/Amazon-Clone/success",
      cancel_url: "http://localhost:5173/Amazon-Clone/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Checkout failed" });
  }
});

exports.api = onRequest(
  { secrets: [STRIPE_SECRET_KEY] },
  app
);
