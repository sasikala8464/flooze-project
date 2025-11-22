"use client";

import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function UpdateProductModal({ show, onHide, product, onSubmit, darkMode }) {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    price: product?.price || "",
    description: product?.description || "",
  });

  useEffect(() => {
    setFormData({
      title: product?.title || "",
      price: product?.price || "",
      description: product?.description || "",
    });
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update product via API
    fetch(`https://dummyjson.com/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        onSubmit(updatedProduct); // Update parent state
        alert("Product updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update product!");
      });
  };

  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: darkMode ? "#1f2937" : "#f8f9fa",
          color: darkMode ? "#fff" : "#000",
          borderBottom: "none",
        }}
      >
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "2rem", backgroundColor: darkMode ? "#1f2937" : "#f7f7f7" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ borderRadius: "8px", backgroundColor: darkMode ? "#374151" : "#fff", color: darkMode ? "#fff" : "#000" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={{ borderRadius: "8px", backgroundColor: darkMode ? "#374151" : "#fff", color: darkMode ? "#fff" : "#000" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ borderRadius: "8px", backgroundColor: darkMode ? "#374151" : "#fff", color: darkMode ? "#fff" : "#000" }}
            />
          </Form.Group>

          <Button type="submit" className="w-100" style={{ backgroundColor: darkMode ? "#374151" : "#007bff", color: "#fff" }}>
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
