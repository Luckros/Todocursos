import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ItemList } from "../ItemList/ItemList";
import { API_URL } from "../../config/api";
import "./ItemListContainer.css";

const ITEMS_PER_PAGE = 6;

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [category, search]);

  if (loading) {
    return (
      <section className="listContainer">
        <h1>Cargando cursos...</h1>
      </section>
    );
  }

  if (error) {
    return (
      <section className="listContainer">
        <h1>Error</h1>
        <p>{error}</p>
      </section>
    );
  }

  const byCategory = category
    ? products.filter(
        (p) =>
          String(p.category).toLowerCase() ===
          String(category).toLowerCase()
      )
    : products;

  const searchLower = search.toLowerCase();
  const filtered = byCategory.filter((p) =>
    String(p.name).toLowerCase().includes(searchLower)
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / ITEMS_PER_PAGE)
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageTitle = category
    ? `Todocursos | ${category}`
    : "Todocursos | Todos los cursos";

  const pageDescription =
    "Catálogo de cursos online de programación, edición de video e impresión 3D.";

  return (
    <section className="listContainer container">
      {}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <header className="listHeader">
        <h1 className="listTitle">
          {category ? `Cursos de ${category}` : "Todos los cursos"}
        </h1>

        <div className="searchBox">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar curso por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <ItemList list={pageItems} />

      {}
      {totalPages > 1 && (
        <nav className="paginationContainer">
          <button
            className="pageBtn"
            disabled={currentPage === 1}
            onClick={handlePrev}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`pageBtn ${
                  page === currentPage ? "pageBtnActive" : ""
                }`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="pageBtn"
            disabled={currentPage === totalPages}
            onClick={handleNext}
          >
            Siguiente
          </button>
        </nav>
      )}
    </section>
  );
};
