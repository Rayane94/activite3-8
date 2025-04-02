import React from 'react';
import { Container } from 'react-bootstrap';
import ProductList from './components/ProductList';

function App() {
  return (
    <Container className="my-4">
      <h1>Gestion des Produits - Activités 3 à 8</h1>
      <ProductList />
    </Container>
  );
}

export default App;
