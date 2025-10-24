import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail.jsx";


export const ItemDetailContainer = () => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Hubo un problema al buscar productos");
        return res.json();
      })
      .then((data) => {
        const found = data.find((p) => String(p.id) === String(id));
        setDetail(found || null);
      })
      .catch((e) => setError(e?.message || "Error al cargar producto"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main><h1>Cargando...</h1></main>;
  if (error) return <main><h1>Error</h1><p>{error}</p></main>;

  return <main>{detail ? <ItemDetail detail={detail} /> : <p>No encontrado</p>}</main>;
};
