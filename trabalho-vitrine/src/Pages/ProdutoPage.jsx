import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProdutoPage.css';

function ProdutoPage() {
  const { id } = useParams(); 
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/produtos/${id}`)
      .then(response => {
        setProduto(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar produto:", error);
        setLoading(false);
      });
  }, [id]);

  async function buscarCEP() {
    if (cep.length < 8) {
      setErro("Digite um CEP válido com 8 dígitos.");
      return;
    }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setErro("CEP não encontrado.");
        setCidade("");
        setEstado("");
        return;
      }
      setErro("");
      setCidade(data.localidade);
      setEstado(data.uf);
    } catch (error) {
      setErro("Erro ao buscar o CEP. Tente novamente.");
    }
  }

  if (loading) return <div className="container mt-5 text-center">Carregando...</div>;
  if (!produto) return <div className="container mt-5 text-center">Produto não encontrado!</div>;

  return (
    <div className="detalhes-bg">
      <div className="container my-5">
        <div className="row g-4">
          
          <div className="col-12 col-md-6">
            <img
              src={produto.imagemUrl}
              alt={produto.nome}
              className="produto-imagem img-fluid rounded"/>
          </div>

          <div className="col-12 col-md-6">
            <div className="info-container rounded shadow p-4 bg-white">
              <h2>{produto.nome}</h2>              
              {produto.marca && (
                <span className="badge bg-secondary mb-2" style={{ fontSize: '0.9rem' }}>
                  Marca: {produto.marca}
                </span>)}
              <p className="text-muted mt-2">{produto.descricao}</p>
              <h3 className="preco-produto">
                R$ {Number(produto.preco).toFixed(2).replace('.', ',')}
              </h3>

              {produto.especificacoes && (
                <div className="especificacoes-container mt-4 pt-3 border-top">
                  <h5><strong>Especificações Técnicas</strong></h5>
                  {/* O whiteSpace: 'pre-line' faz o React respeitar as quebras de linha digitadas no formulário */}
                  <p className="text-muted" style={{ whiteSpace: 'pre-line', fontSize: '0.95rem' }}>
                    {produto.especificacoes}
                  </p>
                </div>)}

              <button className="btn btn-primary btn-add-carrinho mt-3 w-100">
                Adicionar ao Carrinho</button>
            </div>

            <div className="cep-container mt-4 p-3 rounded shadow bg-white">
              <h4><strong>Consultar Entrega</strong></h4>
              <div className="d-flex gap-2 flex-wrap">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite o CEP"
                  maxLength="8"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}/>
                <button className="btn btn-outline-secondary" onClick={buscarCEP}>Buscar</button>
              </div>

              {erro && <p className="text-danger mt-2">{erro}</p>}

              {cidade && (
                <div className="mt-3 p-2 border rounded bg-light">
                  <strong>Entrega para:</strong>
                  <p className="mb-0">{cidade} - {estado}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdutoPage;