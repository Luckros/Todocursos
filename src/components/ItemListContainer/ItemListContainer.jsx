import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { API_URL } from "../../config/api";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams(); // /category/:category

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los cursos");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err.message || "Error inesperado");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section>
        <h1>Cargando cursos...</h1>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1>Error</h1>
        <p>{error}</p>
      </section>
    );
  }

  const visible = category
    ? products.filter(
        (p) => String(p.category).toLowerCase() === String(category).toLowerCase()
      )
    : products;

  return (
    <section>
      <h1>{category ? `Cursos de ${category}` : "Todos los cursos"}</h1>
      <ItemList list={visible} />
    </section>
  );
};
