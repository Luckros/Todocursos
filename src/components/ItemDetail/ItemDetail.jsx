import { useCartContext } from "../../context/CartContext/useCartContext";
import { Item } from "../Item/Item";

export const ItemDetail = ({detail}) => {
  const { addItem } = useCartContext();

  return (
    <Item {...detail}>
      <button className="btn btn-primary" onClick={() => addItem(detail)}>
        Agregar al carrito
      </button>
    </Item>
  );
};
