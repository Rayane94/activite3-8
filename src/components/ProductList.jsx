import React, { useEffect, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'New Product',
          price: 29.99,
          description: 'A new product added via API',
          image: 'https://via.placeholder.com/150',
          category: 'electronics',
        }),
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      alert(`Product with id ${data.id} has been created`);
      fetchProducts();
    } catch (error) {
      alert("An error occurred while creating the product.");
      console.error(error);
    }
  };

  const updateProductFull = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Updated Product',
          price: 49.99,
          description: 'Updated description',
          image: 'https://via.placeholder.com/150',
          category: 'electronics',
        }),
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      alert(`Product with id ${data.id} has been updated`);
      fetchProducts();
    } catch (error) {
      alert("An error occurred while updating the product.");
      console.error(error);
    }
  };

  const updateProductPrice = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: 5 }),
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      alert(`Price of product with id ${data.id} has been updated`);
      fetchProducts();
    } catch (error) {
      alert("An error occurred while updating the product price.");
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      alert(`Product with id ${data.id} has been deleted`);
      fetchProducts();
    } catch (error) {
      alert("An error occurred while deleting the product.");
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2>Product List</h2>
      <Button onClick={addProduct} className="mb-3">Add Product</Button>
      <div className="product-grid">
        {products.map(product => (
          <Card key={product.id} className="product-card">
            <Card.Img variant="top" src={product.image} className="product-image" />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text><strong>Price:</strong> {product.price} €</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="primary"
                onClick={() => updateProductFull(product.id)}
                className="me-2"
              >
                Update Full
              </Button>
              <Button
                variant="warning"
                onClick={() => updateProductPrice(product.id)}
                className="me-2"
              >
                Update Price
              </Button>
              <Button variant="danger" onClick={() => deleteProduct(product.id)}>
                Delete
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
