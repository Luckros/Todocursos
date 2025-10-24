import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";

export const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { category } = useParams();

    useEffect(()=> {
    setLoading(true);
    setError(null);
    fetch("/data/products.json")
        .then((res)=>{
            if (!res.ok) {
                throw new Error("Hubo un problema al buscar productos")
            }
            return res.json()
        })
        .then((data) =>{
            setProducts(data)
        })
        .catch((err)=>{
            setError(err?.message || "Error al cargar productos")
        });
        setLoading(false);
    }, []); 

        const visible = category ? products.filter(p => String(p.category).toLowerCase() === String(category).toLowerCase()) : products;

        if (loading) return <section><h1>Cargando...</h1></section>;
    if (error) return <section><h1>Error</h1><p>{error}</p></section>;

    return ( 
        <section>
            <h1>{category ? `Cursos de ${category}` : "Cursos"}</h1>
            <ItemList list={visible}/>
        </section>
    );
};