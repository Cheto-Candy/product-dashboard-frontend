import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  // =========================
  // 📦 GET ALL PRODUCTS
  // =========================
  const getProducts = async (currentPage = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/products?page=${currentPage}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("GET PRODUCTS:", res.data);
      setProducts(res.data.data);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      console.log("GET ERROR:", err.response?.data || err.message);
    }
  };

  // =========================
  // ➕ ADD PRODUCT
  // =========================
const addProduct = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(name, price, description);
    // check point if the price is a valid number
    if (isNaN(price)) {
      alert("Price must be a valid number");
      return;
    }
    const response = await axios.post(
      "http://localhost:3000/products",
      {
        name,
        price,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};

  // =========================
  // ✏ UPDATE PRODUCT
  // =========================
  const updateProduct = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/products/${editingId}`,
        { name, price, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UPDATE:", res.data);

      clearForm();
      setEditingId(null);
      getProducts();
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  // =========================
  // ❌ DELETE PRODUCT
  // =========================
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("DELETE:", res.data);

      getProducts();
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  // =========================
  // 📝 EDIT CLICK
  // =========================
  const editProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setEditingId(product.id);
  };

  // =========================
  // 🧹 CLEAR FORM
  // =========================
  const clearForm = () => {
    setName("");
    setPrice("");
    setDescription("");
  };

  // =========================
  // 🚪 LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // =========================
  // ⬇ LOAD PRODUCTS
  // =========================
  useEffect(() => {
    getProducts(page);
    }, [page]);

 return (
    <div style={{ padding: "20px" }}>
      
      <h2>Products</h2>

      {/* ================= PRODUCTS LIST ================= */}
      <div>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{p.name}</h3>
            <p>Price: {p.price}</p>
            <p>{p.description}</p>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
};


export default Products;