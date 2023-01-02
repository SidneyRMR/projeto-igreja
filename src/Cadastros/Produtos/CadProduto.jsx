import React, { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CadProduto = () => {

    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    const paramNome = urlParams.get('nome')
    const paramPreco = +urlParams.get('preco')
    const paramMedida = urlParams.get('medida')
    const paramTipo = urlParams.get('tipo')

    const [nome, setNome] = useState(id ? paramNome : '');
    const [preco, setPreco] = useState(id ? paramPreco.toFixed(2).replace('.', ',') : '');
    const [medida, setMedida] = useState(id ? paramMedida : 'Unidade');
    const [tipo, setTipo] = useState(id ? paramTipo : 'Comida');



    // !!!!!!!!   erro esta aqui, nao esta setando a variavel 
    //esta com erro no CadUsuario e CadProduto devido, ele esta lendo o bd, o id do param, 
    //mas quando passo pro get buscar no bd nao esta funcionando
    // const produto = props.produto
    // produtos.find((produto) => produto.id === id)
    // console.log(produto)



    // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };
    const handlePrecoChange = (event) => {
        setPreco(event.target.value);
    };
    const handleMedidaChange = (event) => {
        setMedida(event.target.value);
    }
    const handleTipoChange = (event) => {
        setTipo(event.target.value);
    }

    // Função que cria um novo produto 
    const novoProduto = async (nome, preco, medida, tipo) => {
        if (!nome || !preco || !medida || !tipo) {
            toast.error('Todos os campos são obrigatórios', {
                position: toast.POSITION.TOP_CENTER,
            })
            return
        }
        if (isNaN(preco)) {
            toast.error('O preço deve ser um número', {
                position: toast.POSITION.TOP_CENTER,
            })
            return
        }
        try {
            const res = await axios.post('http://localhost:8800/produtos', {
                nome,
                preco,
                medida,
                tipo,
            })
            toast.success(`${res.data} salvo com sucesso`, {
                position: toast.POSITION.TOP_CENTER,
            })
            return (res.data, (window.location.href = '/cadastros/produtos'))
        } catch (error) {
            toast.error(error)
        }
    }


    return (
        <Container fluid='true'>
            <ToastContainer />
            <Row>
                <div className="title">Cadastro de Produto</div>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Digite o nome do produto:</div>

                    <input className="nomeProduto" type="text"
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

                    <input className="valorProduto" type="text"
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
                        <option selected value="Unidade">Unidade</option>
                        <option value="Quilograma">Quilograma</option>
                    </select>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Selecione o tipo:</div>

                    <select onChange={handleTipoChange} value={tipo}>
                        <option selected value='Comida'>Comida</option>
                        <option value='Bebida'>Bebida</option>
                    </select>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    {!id && (
                        <button onClick={() => {
                            novoProduto(nome, preco, medida, tipo)
                            // window.location.href = "/cadastros/produtos"
                            console.log('novo')
                        }}>
                            Salvar
                        </button>
                    )}
                    {id && (
                        <button onClick={() => {
                            // editaProduto(nome, preco, medida, tipo)
                            // window.location.href = "/cadastros/produtos"
                            console.log('editado')
                        }}>
                            Salvar
                        </button>
                    )}

                    <button onClick={() => window.location.href = "/cadastros/produtos"}>Voltar</button>
                </Col>
            </Row>
        </Container>
    )
}

export default CadProduto