import { Navigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";

export const ProtectedRoute = ({ children }) => {
  const { cart } = useCartContext();
  if (!cart || cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }
  return children;
};