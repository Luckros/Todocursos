import { useCartContext } from "../../context/CartContext/useCartContext";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cart, removeItem, clearCart, totalPrice, increment, decrement } = useCartContext();

  if (!cart || cart.length === 0) {
    return (
      <main>
        <h1>Tu carrito está vacío</h1>
        <p>Explorá nuestros cursos y agregá los que te interesen.</p>
        <Link to="/">Volver al inicio</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Carrito</h1>
      <div className="cart-list">
        {cart.map((p) => (
          <div className="cart-item" key={p.id}>
            <img src={p.imageUrl} alt={p.name} />
            <div className="cart-info">
              <h2>{p.name}</h2>
              <div className="qty-controls">
              <button className="btn btn-ghost" onClick={() => decrement(p.id)}>−</button>
              <span className="qty">{p.qty || 1}</span>
              <button className="btn btn-ghost" onClick={() => increment(p.id)}>+</button>
            </div>
              <p>Precio: ${p.price}</p>
              <button className="btn btn-ghost" onClick={() => removeItem(p.id)}>Quitar</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <p className="total">Total: ${totalPrice()}</p>
        <div className="actions">
          <button className="btn btn-ghost" onClick={clearCart}>Vaciar carrito</button>
          <Link className="btn btn-primary" to="/checkout">Continuar</Link>
        </div>
      </div>
    </main>
  );
};