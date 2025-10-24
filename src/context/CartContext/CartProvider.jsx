import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    const existsIndex = cart.findIndex((p) => p.id === item.id);
    if (existsIndex >= 0) {
      const copia = [...cart];
      const actual = copia[existsIndex];
      copia[existsIndex] = { ...actual, qty: (actual.qty || 1) + (item.qty || 1) };
      setCart(copia);
    } else {
      setCart([...cart, { ...item, qty: item.qty || 1 }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    let total = 0;
    cart.forEach((p) => { total += (p.qty || 1); });
    return total;
  };

  const totalPrice = () => {
    let total = 0;
    cart.forEach((p) => { total += p.price * (p.qty || 1); });
    return total;
  };

  const increment = (id) => {
    const copia = cart.map((p) => p.id === id ? { ...p, qty: (p.qty || 1) + 1 } : p);
    setCart(copia);
  };

  const decrement = (id) => {
    const copia = cart.map((p) => p.id === id ? { ...p, qty: Math.max(1, (p.qty || 1) - 1) } : p);
    setCart(copia);
  };

  const values = { cart, addItem, removeItem, clearCart, getTotalItems, totalPrice, increment, decrement };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};