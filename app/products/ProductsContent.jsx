"use client";

import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Button, Modal, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

export default function ProductsContent({ products, onProductUpdate }) {
  const [showEdit, setShowEdit] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handleEditClick = (product) => {
    setEditProduct({ ...product });
    setShowEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProductUpdate(editProduct);
    setShowEdit(false);
  };

  return (<div className="products-wrapper">
    <div className="table-scroll">
      <Table striped bordered hover responsive className="custom-table">
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
          {currentProducts.length > 0 ? (
            currentProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td> <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="product-img"
                />

                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>
                  <FaEdit
                    size={18}
                    className="edit-icon"
                    onClick={() => handleEditClick(p)}
                  />

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                Loading products... </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>


    <div className="pagination-row">
      <div className="pagination-buttons">
        <Button
          className="page-btn"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className="page-btn"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>

    <Modal centered show={showEdit} onHide={() => setShowEdit(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editProduct && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editProduct.title}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, title: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
                required
                min={0}
                step={0.01}
              />
            </Form.Group>

            <Button type="submit" className="update-btn w-100">
              Update Product
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>


    <style jsx>{`
    .products-wrapper {
      background: var(--content-bg);
      padding: 20px;
      border-radius: 10px;
      min-height: 82vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    }

    .table-scroll {
      overflow-x: auto;
      border-radius: 10px;
    }

    .custom-table {
      white-space: nowrap;
    }

    .product-img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 6px;
    }

    .pagination-row {
      display: flex;
      justify-content: center;
      margin-top: 15px;
      flex-wrap: wrap;
    }

    .pagination-buttons {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .page-btn {
      background-color: #2563eb;
      border: none;
      padding: 8px 16px;
      font-size: 14px;
      border-radius: 8px;
      color: white;
    }

    .page-btn:disabled {
      opacity: 0.6;
    }

    .page-info {
      font-size: 14px;
      margin: 0 5px;
    }

    .edit-icon {
      cursor: pointer;
      color: #2563eb;
    }

    :global(.dark-wrapper) {
      --content-bg: #1e293b;
      color: white;
    }

    :global(.light-wrapper) {
      --content-bg: white;
      color: #111827;
    }

    @media (max-width: 1024px) {
      .products-wrapper {
        padding: 15px;
        margin: 0 10px;
        max-width: calc(100% - 20px);
      }

      .page-btn {
        padding: 6px 12px;
        font-size: 13px;
      }

      .product-img {
        width: 35px;
        height: 35px;
      }
    }

    @media (max-width: 768px) {
      .products-wrapper {
        padding: 10px;
        margin: 0 5px;
      }

      .custom-table th,
      .custom-table td {
        font-size: 12px;
        padding: 6px;
      }

      .page-info {
        font-size: 12px;
      }
    }

    @media (max-width: 480px) {
      .products-wrapper {
        padding: 8px;
      }

      .product-img {
        width: 30px;
        height: 30px;
      }

      .page-btn {
        padding: 4px 8px;
        font-size: 11px;
      }

      .page-info {
        font-size: 11px;
      }

      .pagination-buttons {
        flex-direction: column;
        gap: 5px;
      }
    }
  `}</style>
  </div>


  );
}
