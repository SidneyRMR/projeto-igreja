import React, { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import produtos from "../../data/produtos"

const CadProduto = () => {


    const urlParams = new URLSearchParams(window.location.search)
    const id = +urlParams.get('id')

    // const [nome, setNome] = useState('');
    // const [preco, setPreco] = useState('');
    // const [tipo, setTipo] = useState('');
    // if(id ) {
    const produto = produtos.find((produto) => produto.id === id)

    // setNome(produto.nome);
    // setPreco((produto.preco).toFixed(2));
    // setTipo(produto.tipo);

    const [nome, setNome] = useState(id ? produto.nome : '');
    const [preco, setPreco] = useState(id ? (produto.preco).toFixed(2) : '');
    const [tipo, setTipo] = useState(id ? produto.tipo : '');
    //     }
    //   }


    // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };
    const handlePrecoChange = (event) => {
        setPreco(event.target.value);
    };
    const handleTipoChange = (event) => {
        setTipo(event.target.value);
    }

    // Função que altera o valor do objeto produto 
    // function atualizarProduto(novoNome, novoPreco, novoTipo) {
    //     setNome(
    //         console.log(novoNome,novoPreco,novoTipo)
    //     //   nome: novoNome,
    //     //   preco: novoPreco,
    //     //   tipo: novoTipo,
    //     );
    //   }

    //   atualizarProduto('Camisa vermelha', 39.99, 'Uma camisa vermelha básica');

    return (
        <Container>
            <Row>
                <h1 className="title">Cadastro de Produto</h1>
            </Row>
            <Row>
                <Col>
                    <span>Digite o nome do produto:</span>
                </Col>
                <Col>
                    <input className="nomeProduto" type="text"
                        placeholder="Nome do produto"
                        onChange={handleNomeChange}
                        value={nome}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <span>Digite o valor do produto:</span>
                </Col>
                <Col>
                    <input className="valorProduto" type="text"
                        placeholder="Valor do produto"
                        onChange={handlePrecoChange}
                        value={preco}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <span>Selecione o tipo:</span>
                </Col>
                <Col>
                    <select
                        onChange={handleTipoChange}
                        value={tipo}
                    >
                        <option value="un">Unidade</option>
                        <option value="kg">Quilograma</option>
                    </select>
                </Col>
                <Col>
                    <button onClick={() => {
                        // atualizarProduto(nome, preco, tipo) 
                        window.location.href = "/cadastros/produtos"
                    }}
                    >Salvar</button>
                    <button onClick={() => window.location.href = "/cadastros/produtos"}>Voltar</button>
                </Col>
            </Row>
        </Container>
    )
}

export default CadProduto