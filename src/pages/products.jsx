import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  // =========================
  // 📦 GET ALL PRODUCTS
  // =========================
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.data);
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
    getProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      
      <h2>Products</h2>

      <button onClick={logout}>Logout</button>

      {/* ================= FORM ================= */}
      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {editingId ? (
          <>
            <button onClick={updateProduct}>Update</button>
            <button onClick={clearForm}>Cancel</button>
          </>
        ) : (
          <button onClick={addProduct}>Add</button>
        )}
      </div>

      {/* ================= LIST ================= */}
      <div style={{ marginTop: "20px" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{p.name}</h4>
            <p>{p.price}</p>
            <p>{p.description}</p>

            <button onClick={() => editProduct(p)}>Edit</button>
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;