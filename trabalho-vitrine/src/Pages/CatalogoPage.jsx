import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import CardProduto from '../Components/CardProduto';
import './CatalogoPage.css';

function CatalogoPage() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/produtos')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => console.error("Erro ao buscar produtos:", error));
  }, []);

  return (
    <div className="catalogo-bg">
      <Container className="my-5">
        <Row className="justify-content-center">
          {produtos.map(produto => (
            <Col 
              key={produto._id} 
              xs={12} sm={6} md={4} lg={3}
              className="mb-5 d-flex justify-content-center">
              <CardProduto 
                id={produto._id} 
                nome={produto.nome} 
                preco={produto.preco} 
                imagemUrl={produto.imagemUrl} 
                descricao={produto.descricao} 
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default CatalogoPage;