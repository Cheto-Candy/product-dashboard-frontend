// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Products() {
//   const styles = {
//   page: {
//     padding: "20px",
//     fontFamily: "Arial",
//     background: "#f4f6f8",
//     minHeight: "100vh"
//   },

//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px"
//   },

//   title: {
//     margin: 0
//   },

//   logoutBtn: {
//     background: "#dc3545",
//     color: "white",
//     border: "none",
//     padding: "8px 14px",
//     borderRadius: "6px",
//     cursor: "pointer"
//   },

//   card: {
//     background: "white",
//     padding: "20px",
//     borderRadius: "10px",
//     maxWidth: "400px",
//     margin: "0 auto 30px auto",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
//   },

//   input: {
//     width: "100%",
//     padding: "10px",
//     margin: "8px 0",
//     borderRadius: "6px",
//     border: "1px solid #ccc"
//   },

//   textarea: {
//     width: "100%",
//     padding: "10px",
//     margin: "8px 0",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     minHeight: "60px"
//   },

//   addBtn: {
//     width: "100%",
//     padding: "10px",
//     background: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer"
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "15px"
//   },

//   productCard: {
//     background: "white",
//     padding: "15px",
//     borderRadius: "10px",
//     boxShadow: "0 3px 8px rgba(0,0,0,0.1)"
//   },

//   price: {
//     color: "green",
//     fontWeight: "bold"
//   },

//   desc: {
//     fontSize: "14px",
//     color: "#555"
//   }
// };
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     description: ""
//   });

//   // fetch products
//   const fetchProducts = async () => {
//     const res = await api.get("/products");
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // add product
//   const addProduct = async () => {
//     if (!form.name || !form.price) {
//       alert("Name and Price required");
//       return;
//     }

//     await api.post("/products", form);
//     setForm({ name: "", price: "", description: "" });
//     fetchProducts();
//   };

//   // logout
//   const logout = async () => {
//     try {
//       await api.post("/users/logout");
//       navigate("/"); // go to login page
//     } catch (err) {
//       alert("Logout failed");
//     }

//   };


//   return (
//     <div style={styles.page}>

//       {/* HEADER */}
//       <div style={styles.header}>
//         <h1 style={styles.title}>📦 Products Dashboard</h1>

//         <button style={styles.logoutBtn} onClick={logout}>
//           🚪 Logout
//         </button>
//       </div>

//       {/* FORM */}
//       <div style={styles.card}>
//         <h3>Add Product</h3>

//         <input
//           style={styles.input}
//           placeholder="Product Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           style={styles.input}
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//         />

//         <textarea
//           style={styles.textarea}
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <button style={styles.addBtn} onClick={addProduct}>
//           ➕ Add Product
//         </button>
//       </div>

//       {/* PRODUCTS GRID */}
//       <div style={styles.grid}>
//         {products.map((p) => (
//           <div key={p.id} style={styles.productCard}>
//             <h3>{p.name}</h3>
//             <p style={styles.price}>${p.price}</p>
//             <p style={styles.desc}>{p.description}</p>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Products() {
  const navigate = useNavigate();
    const styles = {
  page: {
    padding: "20px",
    fontFamily: "Arial",
    background: "#f4f6f8",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  title: {
    margin: 0
  },

  logoutBtn: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "400px",
    margin: "0 auto 30px auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  textarea: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "60px"
  },

  addBtn: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px"
  },

    productCard: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)"
  },

  price: {
    color: "green",
    fontWeight: "bold"
  },

  desc: {
    fontSize: "14px",
    color: "#555"
    }
    };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: ""
  });

  // 🔐 fetch products with auth check
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/", {
          state: { message: "Session expired. Please login again." }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ➕ add product
  const addProduct = async () => {
    if (!form.name || !form.price) {
      alert("Name and Price required");
      return;
    }

    try {
      await api.post("/products", form);
      setForm({ name: "", price: "", description: "" });
      fetchProducts();
    } catch (err) {
      alert("Error adding product");
    }
  };

  // 🚪 logout
  const logout = async () => {
    try {
      await api.post("/users/logout");

      // clear UI instantly
      setProducts([]);

      navigate("/");
    } catch (err) {
      alert("Logout failed");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>📦 Products Dashboard</h1>

        <button style={styles.logoutBtn} onClick={logout}>
          🚪 Logout
        </button>
      </div>

      {/* FORM */}
      <div style={styles.card}>
        <h3>Add Product</h3>

        <input
          style={styles.input}
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <textarea
          style={styles.textarea}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button style={styles.addBtn} onClick={addProduct}>
          ➕ Add Product
        </button>
      </div>

      {/* PRODUCTS */}
      <div style={styles.grid}>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((p) => (
            <div key={p.id} style={styles.productCard}>
              <h3>{p.name}</h3>
              <p style={styles.price}>${p.price}</p>
              <p style={styles.desc}>{p.description}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}