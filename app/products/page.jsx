"use client";

import { useEffect, useState } from "react";
import ProductsContent from "./ProductsContent";
import ProductCard from "../components/ProductCard";
import UpdateProductModal from "../components/UpdateProductModal";
import DashboardLayout from "../dashboard/layout";
import { getRole } from "./utils/roles";
import { Button } from "react-bootstrap";
import AddProductPage from "../add-product/page";
import { FaPlus, FaSun, FaMoon } from "react-icons/fa";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [role, setRole] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);


  useEffect(() => setRole(getRole()), []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    setShowEditModal(false);
  };

  const handleTableUpdate = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };


  const handleAddNewProduct = (createdProduct) => {
    setProducts([createdProduct, ...products]);
    setShowAddModal(false);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""} style={{ minHeight: "100vh" }}>

      {role !== "manager" && (
        <nav
          className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm rounded"
          style={{
            backgroundColor: darkMode ? "#1f2937" : "#e1eaecff",
            color: darkMode ? "#fff" : "#000",
          }}
        > <h4 className="m-0">My Shop</h4> <div className="d-flex gap-2">
            <Button
              variant={darkMode ? "outline-light" : "primary"}
              size="sm"
              className="d-flex align-items-center gap-1"
              onClick={() => setShowAddModal(true)}
              style={{ backgroundColor: "#1f2937" }}
            > <FaPlus /> Add Product </Button>


            <Button
              variant={darkMode ? "light" : "secondary"}
              size="sm"
              className="d-flex align-items-center gap-1"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </nav>
      )}

      <div className="container py-4">

        {role === "manager" && (
          <DashboardLayout title="Products Dashboard">
            <div className="mb-3 text-end">
              <Button onClick={() => setShowAddModal(true)}>+ Add Product</Button>
            </div>
            <ProductsContent products={products} onProductUpdate={handleTableUpdate} />
          </DashboardLayout>
        )}

        {role !== "manager" && (
          <div className="row g-4 mt-3">
            {products.map((p) => (
              <div key={p.id} className="col-12 col-md-6 col-lg-4">
                <ProductCard product={p} onEdit={handleEdit} darkMode={darkMode} />
              </div>
            ))}
          </div>
        )}
      </div>


      {selectedProduct && (
        <UpdateProductModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          product={selectedProduct}
          onSubmit={handleUpdate}
          darkMode={darkMode}
        />
      )}


      {showAddModal && (
        <AddProductPage onAdd={handleAddNewProduct} onClose={() => setShowAddModal(false)} />
      )}

      <style jsx>{`
    .dark-mode {
      background-color: #111827;
      color: #fff;
    }
    .dark-mode .card {
      background-color: #1f2937;
      color: #fff;
    }
  `}</style>
    </div>


  );
}
