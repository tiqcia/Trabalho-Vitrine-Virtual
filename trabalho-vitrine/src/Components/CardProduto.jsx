import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './CardProduto.css';

function CardProduto({ id, nome, preco, imagemUrl, descricao }) {
  const precoFormatado = preco !== undefined && preco !== null 
    ? Number(preco).toFixed(2).replace('.', ',') 
    : "0,00";

  return (
    <Link 
      to={`/produto/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}>

      <Card className="shadow-sm h-100 card-personalizado" style={{ cursor: "pointer" }}>
        <Card.Img 
          variant="top" 
          src={imagemUrl} 
          className="card-imagem"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title>{nome}</Card.Title>
          <Card.Text className="mb-2">{descricao}</Card.Text>
          
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <Card.Text className="preco-card mb-0">R$ {precoFormatado}</Card.Text>
            
            <Button 
              className="btn-carrinho" 
              size="sm"
              onClick={(e) => e.preventDefault()}>
              <BsCartPlus size={20} style={{ marginRight: '2px' }}/> 
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CardProduto;