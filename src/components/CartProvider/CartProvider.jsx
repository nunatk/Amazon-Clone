import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // This array stores all cart items
  const [cart, setCart] = useState([]);

  // Adds a product to the cart
  const addToCart = (product) => {
    const qtyToAdd = product.quantity || 1;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      // If the product is already in the cart, just increase its quantity
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }

      // If it's a new product, add it with the selected quantity
      return [...prev, { ...product, quantity: qtyToAdd }];
    });
  };

  // Increases quantity by 1 (used inside the cart page)
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decreases quantity by 1 and removes item if it reaches zero
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Completely removes a product from the cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Total number of items shown in the cart icon
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook so components can easily access cart data
export function useCart() {
  return useContext(CartContext);
}
