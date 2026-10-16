import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { normalizeMealForCart } from "../utils/pricing";

const CartContext = createContext(null);

const loadInitial = () => {
  try {
    const raw = localStorage.getItem("fasteat_cart");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const item = action.payload;
      const existing = state.find((i) => i.id === item.id);
      if (existing) {
        return state.map((i) =>
          i.id === item.id ? { ...i, qty: Math.min(20, i.qty + (item.qty || 1)) } : i
        );
      }
      return [...state, { ...item, qty: item.qty || 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.payload);
    case "SET_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) return state.filter((i) => i.id !== id);
      return state.map((i) => (i.id === id ? { ...i, qty: Math.min(20, qty) } : i));
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, [], loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem("fasteat_cart", JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  const value = useMemo(() => {
    const addToCart = (mealItem, qty = 1) => {
      const normalized = normalizeMealForCart(mealItem);
      dispatch({ type: "ADD", payload: { ...normalized, qty } });
    };
    const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: String(id) });
    const setQty = (id, qty) => dispatch({ type: "SET_QTY", payload: { id: String(id), qty } });
    const clearCart = () => dispatch({ type: "CLEAR" });
    const count = items.reduce((a, b) => a + b.qty, 0);
    const subtotal = items.reduce((a, b) => a + b.qty * b.price, 0);
    const deliveryFee = items.length === 0 ? 0 : subtotal > 40 ? 0 : 2.99;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;
    return { items, addToCart, removeFromCart, setQty, clearCart, count, subtotal, deliveryFee, tax, total };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
