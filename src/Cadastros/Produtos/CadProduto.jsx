import React, { useState, useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CadProduto = () => {

    const urlParams = new URLSearchParams(window.location.search)
    const id = +urlParams.get('id')

    const [produtos, setProdutos] = useState([])

    const getprodutos = async () => {
        try {
            const res = await axios.get("http://localhost:8800/produtos")
            setProdutos(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)))
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        getprodutos()
    }, [setProdutos])

    // console.log(produtos)
    // !!!!!!!!   erro esta aqui, nao esta setando a variavel 
    //esta com erro no CadUsuario e CadProduto devido, ele esta lendo o bd, o id do param, 
    //mas quando passo pro get buscar no bd nao esta funcionando
    const produto = produtos.find((produto) => produto.id === id)
    console.log(id)

    // const [nome, setNome] = useState(id ? produto.nome : '');
    // const [preco, setPreco] = useState(id ? (produto.preco).toFixed(2) : '');
    // const [tipo, setTipo] = useState(id ? produto.tipo : '');

    // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
    // const handleNomeChange = (event) => {
    //     setNome(event.target.value);
    // };
    // const handlePrecoChange = (event) => {
    //     setPreco(event.target.value);
    // };
    // const handleTipoChange = (event) => {
    //     setTipo(event.target.value);
    // }

    // Função que altera o valor do objeto produto 
    // const salvaProduto = async (nome, preco, tipo) => {
    //     try {
    //         const res = await axios.post("http://localhost:8800/produtos", { nome, preco, tipo })
    //         return res.data
    //     } catch (error) {
    //         toast.error(error)
    //     }
    // }

    //   salvarProduto('Camisa vermelha', 39.99, 'Uma camisa vermelha básica');

    return (
        <Container fluid='true'>
            <Row>
                <div className="title">Cadastro de Produto</div>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Digite o nome do produto:</div>
            
                    <input className="nomeProduto" type="text"
                        placeholder="Nome do produto"
                        // onChange={handleNomeChange}
                        // value={nome}
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Digite o valor do produto:</div>
            
                    <input className="valorProduto" type="text"
                        placeholder="Valor do produto"
                        // onChange={handlePrecoChange}
                        // value={preco}
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Selecione o tipo:</div>
                
                    <select
                        // onChange={handleTipoChange}
                        // value={tipo}
                    >
                        <option value="un">Unidade</option>
                        <option value="kg">Quilograma</option>
                    </select>
                </Col>
            </Row>
            <br />  
            <Row>
                <Col>
                    <button onClick={() => {
                        // salvaProduto(nome, preco, tipo) 
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