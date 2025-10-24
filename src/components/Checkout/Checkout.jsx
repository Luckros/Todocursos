import { useCartContext } from "../../context/CartContext/useCartContext";

export const Checkout = () => {
  const { totalPrice } = useCartContext();
  return (
    <main>
      <h1>Checkout</h1>
      <p>Total a pagar: ${totalPrice()}</p>
      <button className="btn btn-primary" onClick={() => alert("Simulación de pago completada")}>Pagar</button>
    </main>
  );
};