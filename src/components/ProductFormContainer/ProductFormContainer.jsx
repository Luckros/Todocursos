import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "./ProductFormContainer.css";
import { API_URL } from "../../config/api";

const INITIAL_FORM = {
  name: "",
  description: "",
  price: "",
  category: "",
  imageUrl: ""
};

export const ProductFormContainer = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProducts = () => {
    setLoadingList(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener cursos");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((e) => setError(e.message || "Error al cargar cursos"))
      .finally(() => setLoadingList(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    if (!form.name.trim()) return "El nombre es obligatorio";
    if (!form.price || Number(form.price) <= 0)
      return "El precio debe ser mayor a 0";
    if (!form.description || form.description.trim().length < 10)
      return "La descripción debe tener al menos 10 caracteres";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price)
        })
      });

      if (!response.ok) throw new Error("Error al guardar el producto");

      toast.success(editingId ? "Curso actualizado correctamente" : "Curso creado correctamente");

      setForm(INITIAL_FORM);
      setEditingId(null);
      fetchProducts();
    } catch (e) {
      toast.error(e.message || "Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "",
      imageUrl: product.imageUrl || ""
    });
    setEditingId(product.id);
    setError("");
    setSuccess("");
  };

  const handleCancelEdit = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const confirma = window.confirm("¿Seguro que querés eliminar este curso?");
    if (!confirma) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar el curso");
      toast.success("Curso eliminado");
      fetchProducts();
    } catch (e) {
      setError(e.message || "Error al eliminar el curso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="productFormContainer">
      <h1 className="productFormTitle">
        {editingId ? "Editar curso" : "Alta de nuevo curso"}
      </h1>

      <form className="productForm" onSubmit={handleSubmit}>
        <label className="productFormLabel">
          Nombre
          <input
            className="productFormInput"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>

        <label className="productFormLabel">
          Precio
          <input
            className="productFormInput"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </label>

        <label className="productFormLabel">
          Categoría
          <input
            className="productFormInput"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="programacion / video / impresion3d..."
          />
        </label>

        <label className="productFormLabel">
          Descripción
          <textarea
            className="productFormTextarea"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <label className="productFormLabel">
          URL de la imagen
          <input
            className="productFormInput"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
          />
        </label>

        {error && <p className="productFormError">{error}</p>}
        {success && <p className="productFormSuccess">{success}</p>}

        <div className="productFormButtons">
          <button className="productFormButton" type="submit" disabled={loading}>
            {loading
              ? "Guardando..."
              : editingId
              ? "Guardar cambios"
              : "Crear curso"}
          </button>

          {editingId && (
            <button
              type="button"
              className="productFormButton productFormButtonCancel"
              onClick={handleCancelEdit}
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      <section className="productListSection">
        <h2 className="productListTitle">Cursos cargados</h2>

        {loadingList ? (
          <p>Cargando lista...</p>
        ) : products.length === 0 ? (
          <p>Aún no hay cursos.</p>
        ) : (
          <ul className="productList">
            {products.map((p) => (
              <li key={p.id} className="productListItem">
                <div>
                  <strong>{p.name}</strong> — ${p.price} ({p.category})
                </div>
                <div className="productListActions">
                  <button
                    className="productListBtn"
                    type="button"
                    onClick={() => handleEdit(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="productListBtn productListBtnDelete"
                    type="button"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};
