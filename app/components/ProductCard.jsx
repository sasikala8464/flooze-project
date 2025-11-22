"use client";

import { Card, Button } from "react-bootstrap";

export default function ProductCard({ product, onEdit, darkMode }) {
  if (!product) return null;

  return (
    <Card
      className="h-100 shadow-sm rounded"
      style={{
        backgroundColor: darkMode ? "#1f2937" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <Card.Img
        variant="top"
        src={product.thumbnail}
        style={{ height: "200px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{product.title}</Card.Title>
        <Card.Text className="text-muted mb-2">Price: ₹{product.price}</Card.Text>
        <Card.Text className="text-truncate">{product.description}</Card.Text>
        <Button
          onClick={() => onEdit(product)}
          className="mt-auto fw-bold"
          style={{ backgroundColor: darkMode ? "#374151" : "#007bff", color: "#fff" }}
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
}
