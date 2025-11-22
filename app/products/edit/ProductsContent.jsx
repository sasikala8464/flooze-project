"use client";

import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Button, Modal, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

export default function ProductsContent({ products, onProductUpdate }) {
  const [showEdit, setShowEdit] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowEdit(true);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    fetch(`https://dummyjson.com/products/${editProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editProduct.title,
        price: editProduct.price,
        description: editProduct.description,
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        onProductUpdate(updated); // update parent
        setShowEdit(false);
        alert("Product updated successfully!");
      })
      .catch(() => alert("Failed to update product"));
  };

  return (
    <div className="p-2" style={{ fontSize: "14px" }}>
      <h3 style={{ fontSize: "18px", marginBottom: "15px" }}>Products List</h3>

      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img
                    src={p.thumbnail}
                    width="35"
                    height="35"
                    style={{
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>

                {/* EDIT ICON */}
                <td>
                  <FaEdit
                    size={18}
                    style={{ cursor: "pointer", color: "#1f2937" }}
                    onClick={() => handleEditClick(p)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                Loading products...
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* ===== EDIT PRODUCT MODAL ===== */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#1f2937", color: "#fff" }}>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {editProduct && (
            <Form onSubmit={handleUpdateProduct}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editProduct.title}
                  onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, description: e.target.value })
                  }
                />
              </Form.Group>

              <Button type="submit" className="w-100" style={{ backgroundColor: "#1f2937" }}>
                Update Product
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
