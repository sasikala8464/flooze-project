"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Form, Button } from "react-bootstrap";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  // Fetch single product
  useEffect(() => {
    if (!id) return;

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  // Save updated product
  const handleSubmit = (e) => {
    e.preventDefault();

    // Your requested code added here ↓↓↓
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT", // you can use PATCH also
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: product.title, // updating title
        price: product.price, // updating price also
      }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        console.log("Updated Product:", updatedProduct);
        alert(`Product updated: ${updatedProduct.title}`);

        router.push("/products"); // go back to list
      })
      .catch(console.error);
  };

  return (
    <Container className="mt-4">
      <h2>Edit Product</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={product.title}
            onChange={(e) =>
              setProduct({ ...product, title: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />
        </Form.Group>

        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
}
