import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail.jsx";
import { API_URL } from "../../config/api";

export const ItemDetailContainer = () => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener el curso");
        }
        return res.json();
      })
      .then((data) => {
        setDetail(data);
      })
      .catch((err) => {
        setError(err.message || "Error inesperado");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main>
        <h1>Cargando curso...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Error</h1>
        <p>{error}</p>
      </main>
    );
  }

  if (!detail) {
    return (
      <main>
        <h1>Curso no encontrado</h1>
      </main>
    );
  }

  return (
    <main>
      <ItemDetail detail={detail} />
    </main>
  );
};
