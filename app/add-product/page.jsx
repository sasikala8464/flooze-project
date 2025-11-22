"use client";

import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { getRole } from "../products/utils/roles";

export default function AddProductPage({ onAdd, onClose }) {
  const [role, setRole] = useState("");
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRole(getRole());
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newProduct.title,
          price: parseFloat(newProduct.price),
          description: newProduct.description,
          thumbnail: "https://via.placeholder.com/150",
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const createdProduct = await res.json();

      if (onAdd) onAdd(createdProduct);
      if (onClose) onClose();

      alert("Product added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add product!");
    } finally {
      setLoading(false);
    }


  };

  return (<Modal show={true} onHide={onClose} centered>
    <Modal.Header closeButton style={{ backgroundColor: "#1f2937", color: "#fff" }}>
      <Modal.Title>Add Product</Modal.Title>
    </Modal.Header>


    <Modal.Body>
      <Form onSubmit={handleAddProduct}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </Form.Group>

        <Button
          type="submit"
          className="w-100"
          style={{ backgroundColor: "#1f2937" }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </Form>
    </Modal.Body>
  </Modal>


  );
}
