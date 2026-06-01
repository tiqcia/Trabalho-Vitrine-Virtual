import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './CadastroProdutoPage.css';

function CadastroProdutoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    descricao: '',
    imagemUrl: '',
    marca: '',          // <-- Alterado de fabricante para marca
    especificacoes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/produtos', formData);
      alert("Produto cadastrado com sucesso!");
      setFormData({ nome: '', preco: '', descricao: '', imagemUrl: '', marca: '', especificacoes: '' });
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao salvar o produto. Verifique se o servidor está rodando.");
    }
  };

  return (
    <div className="bg-cadastro-tela"> 
      <Container className="py-5">
        <Card className="p-4 shadow-sm card-cadastro">
          <h2 className="titulo-cadastro">Cadastrar Novo Item</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Produto</Form.Label>
              <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preço (R$)</Form.Label>
                  <Form.Control type="number" name="preco" value={formData.preco} onChange={handleChange} required />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control type="text" name="marca" value={formData.marca} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" name="descricao" value={formData.descricao} onChange={handleChange} rows={2} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Especificações</Form.Label>
              <Form.Control as="textarea" name="especificacoes" value={formData.especificacoes} onChange={handleChange} rows={3}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL da Imagem</Form.Label>
              <Form.Control type="url" name="imagemUrl" value={formData.imagemUrl} onChange={handleChange} />
            </Form.Group>

            <Button type="submit" className="btn-salvar">Salvar Item</Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default CadastroProdutoPage;