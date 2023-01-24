import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CadProduto = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id_produto = urlParams.get("id_produto");

  const paramNome = urlParams.get("nome");
  const paramPreco = +urlParams.get("preco");
  const paramMedida = urlParams.get("medida");
  const paramTipo = urlParams.get("tipo");

  const [nome, setNome] = useState(id_produto ? paramNome : "");
  const [preco, setPreco] = useState(id_produto ? paramPreco.toFixed(2) : 0);
  const [medida, setMedida] = useState(id_produto ? paramMedida : "Unidade");
  const [tipo, setTipo] = useState(id_produto ? paramTipo : "Comida");

  // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };
  const handlePrecoChange = (event) => {
    setPreco(event.target.value);
  };
  const handleMedidaChange = (event) => {
    setMedida(event.target.value);
  };
  const handleTipoChange = (event) => {
    setTipo(event.target.value)
  };
  // Função que cria um novo produto
  const novoProduto = async (nome, preco, medida, tipo) => {
    console.log(nome, preco, medida, tipo)
    const produtoEncontrado = produtos.find(
        (produto) =>
          produto.nome.toLowerCase() === nome.toLowerCase()
      );

    if (produtoEncontrado) {
      toast.error("Já tem um item com este nome!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (!nome || !preco || !medida || !tipo ) {
      toast.error("Todos os campos devem estar preenchidos!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (isNaN(preco) && (preco > 0)) {
      toast.error("O preço deve ser um número maior que 0!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    try {
      const res = await api.post("/produtos", {
        nome,
        preco,
        medida,
        tipo,
      });
      toast.success(`${res.data} salvo com sucesso`, {
        position: toast.POSITION.TOP_CENTER,
      });
      // return res.data (window.location.href = "/cadastros/produtos");
    } catch (error) {
      toast.error(error);
    }
  };

  // Função que altera um produto existente
  const alteraProduto = async (
    id_produto,
    nome,
    preco,
    medida,
    tipo,
  ) => {
    const produtoEncontrado = produtos.find(
      (produto) =>
        produto.nome.toLowerCase() === nome.toLowerCase() &&
        produto.id_produto !== id_produto
    );

    if (produtoEncontrado) {
      toast.error("Já tem um item com este nome!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (!nome || !preco || !medida || !tipo ) {
      toast.error("Todos os campos devem estar preenchidos!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (isNaN(preco)) {
      toast.error("O preço deve ser um número!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    try {
      const res = await api.put(`/produtos/${id_produto}`, {
        id_produto,
        nome,
        preco,
        medida,
        tipo
      });
      toast.success(`${nome} alterado com sucesso`, {
        position: toast.POSITION.TOP_CENTER,
      });
      // return res.data (window.location.href = "/cadastros/produtos");
    } catch (error) {
      toast.error(error);
    }
  };

  // Este trecho busca os produtos no BD e seta os valores na const produtos
  const [produtos, setProdutos] = useState([]);
  const getProdutos = async () => {
    try {
      const res = await api.get("/produtos");
      setProdutos(
        res.data.sort((a, b) => (a.id_produtos > b.id_produtos ? 1 : -1))
      );
      // console.log(produtos)
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getProdutos();
  }, [setProdutos]);
  // fim do trecho


  return (
    <Container fluid="true">
      <ToastContainer />
      <Row>
        <div className="title">Cadastro de Produto</div>
      </Row>
      <br />
      <Row>
        <Col>
          <div>Digite o nome do produto:</div>

          <input
            className="nomeProduto"
            type="text"
            placeholder="Nome do produto"
            onChange={handleNomeChange}
            value={nome}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <div>Digite o valor do produto:</div>

          <input
            className="valorProduto"
            type="number"
            placeholder="Valor do produto"
            onChange={handlePrecoChange}
            value={preco}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <div>Selecione a unidade de medida:</div>

          <select onChange={handleMedidaChange} value={medida}>
            <option defaultValue="Unidade" value="Unidade">
              Unidade
            </option>
            <option value="Quilograma">Quilograma</option>
          </select>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <div>Selecione o tipo:</div>

          <select onChange={handleTipoChange} value={tipo}>
            <option defaultValue="Comida" value="Comida">
              Comida
            </option>
            <option value="Bebida">Bebida</option>
          </select>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          {!id_produto && (
            <button
              className="botao"
              onClick={() => {
                novoProduto(nome, preco, medida, tipo);
                // console.log('novo')
              }}
            >
              Salvar
            </button>
          )}
          {id_produto && (
            <button
              className="botao"
              onClick={() => {
                alteraProduto(id_produto, nome, preco, medida, tipo);
                console.log('editado',id_produto, nome, preco, medida, tipo)
              }}
            >
              Salvar
            </button>
          )}

          <button
            className="botao"
            onClick={() => (window.location.href = "/cadastros/produtos")}
          >
            Voltar
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default CadProduto;
