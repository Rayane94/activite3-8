import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const ajouterProduit = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Nouveau produit',
          price: 29.99,
          description: 'Un super produit ajouté via API',
          image: 'https://via.placeholder.com/150',
          category: 'electronics',
        }),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été créé`);
      fetchProducts(); 
    } catch (error) {
      alert("Une erreur est survenue lors de la création du produit");
      console.error(error);
    }
  };

  const modifierProduitComplet = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Produit mis à jour',
          price: 49.99,
          description: 'Description mise à jour',
          image: 'https://via.placeholder.com/150',
          category: 'electronics',
        }),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été modifié`);
      fetchProducts(); 
    } catch (error) {
      alert("Une erreur est survenue lors de la modification du produit");
      console.error(error);
    }
  };

  const modifierPrixProduit = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: 5 }),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      alert(`Le prix du produit avec l'id ${data.id} a été modifié`);
      fetchProducts(); 
    } catch (error) {
      alert("Une erreur est survenue lors de la modification du prix du produit");
      console.error(error);
    }
  };

  const supprimerProduit = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été supprimé`);
      fetchProducts(); 
    } catch (error) {
      alert("Une erreur est survenue lors de la suppression du produit");
      console.error(error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <Alert variant="danger">Erreur : {error}</Alert>;

  return (
    <div>
      <h2>Liste des produits</h2>
      <Button onClick={ajouterProduit} className="mb-3">Ajouter un produit</Button>
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4} className="mb-3">
            <Card>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>Prix :</strong> {product.price} €</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="primary"
                  onClick={() => modifierProduitComplet(product.id)}
                  className="me-2"
                >
                  Modifier le produit complet
                </Button>
                <Button
                  variant="warning"
                  onClick={() => modifierPrixProduit(product.id)}
                  className="me-2"
                >
                  Modifier le prix du produit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => supprimerProduit(product.id)}
                >
                  Supprimer le produit
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductList;
