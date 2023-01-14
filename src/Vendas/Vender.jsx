import { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import InfCaixa from '../InfCaixa'
import BotaoMenu from '../Botoes/BotaoMenu';
import ModalPagamento from './ModalPagamento';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Vender = (props) => {

    const [precoTotal, setPrecoTotal] = useState(0)
    const [bebidas, setBebidas] = useState([])
    const [comidas, setComidas] = useState([])

    // Este trecho busca os produtos no BD e seta os valores na const produtos
    const [produtos, setProdutos] = useState([])
    const getProdutos = async () => {
        try {
            const res = await axios.get("http://localhost:8800/produtos")
            setProdutos(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProdutos()
    }, [setProdutos])
    // fim do trecho 

    // aqui eu preciso trabalhar com 2 objetos que irao conversar entre si,
    /*objeto caixa e objeto compras pedido,
        no objeto caixa tenho:
            id_caixa,
            abertura, 
            sangria(acumulativo), 
            data_abertura,
            data_fechamento,
            id_compras, que tera:
                id_compra,
                id_produto,
                quantidade,
    */

    // Declare a list of objects and a state for the form input values
    const [resumoPedido, setResumoPedido] = useState([])

    const addProduto = (nomeProd, precoProd, medidaProd) => {
        // Read the values of the button's attributes
        const nome = nomeProd
        const preco = precoProd
        const medida = medidaProd

        // Check if an object with the same values already exists in the list
        const existeProduto = resumoPedido.find((produto) => {
            return produto.nome === nome && produto.preco === preco && produto.medida === medida
        })

        if (existeProduto) {
            // If the produto exists, increase the quantity by 1
            setResumoPedido(
                resumoPedido.map((produto) => {
                    if (produto === existeProduto) {
                        return { ...produto, qnde: produto.qnde + 1 }
                    }
                    return produto;
                })
            );
        } else {
            // If the object does not exist, create a new one and add it to the list
            const novoProduto = {
                qnde: 1,
                nome: nome,
                preco: preco,
                medida: medida
            };
            setResumoPedido([...resumoPedido, novoProduto])
        }
    };

    function removeProduto(prod) {
        const updatedResumoPedido = resumoPedido.map((produto) => {
            if (produto === prod && produto.qnde >= 1) {
                return { ...produto, qnde: produto.qnde - 1 }
            }
            return produto;
        });
        const filteredResumoPedido = updatedResumoPedido.filter((produto) => produto.qnde !== 0);
        setResumoPedido(filteredResumoPedido)
    }
    // Atualiza o preço total do resumoPedido
    useEffect(() => {
        const newPrecoTotal = resumoPedido.map((produto) => produto.preco * produto.qnde).reduce((acc, cur) => acc + cur, 0);
        // Set the new precoTotal value
        setPrecoTotal(newPrecoTotal)
    }, [resumoPedido]);


    useEffect(() => {
        setBebidas(produtos.filter((produto) => produto.tipo === 'Bebida'))
        setComidas(produtos.filter((produto) => produto.tipo === 'Comida'))
    }, [produtos])


    //  função que cria um novo pedido de compras 
    // const novaCompra = async (id_produto, quantidade_produto, id_caixa) => {
    //     if (!id_produto || !quantidade_produto || !id_caixa) {
    //         console.error('Todos os campos devem estar preenchidos!')
    //         return
    //     }
    //     try {
    //         const res = await axios.post('http://localhost:8800/compras', {
    //             id_produto,
    //             quantidade_produto,
    //             id_caixa,
    //         })
    //         console.log(`${res.data} salvo com sucesso`)
    //         // return (res.data, (window.location.href = '/cadastros/produtos'))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const openModal = () => {
        props.setIsModalPgtoOpen(true);
    };


    return (
        <div>
            {/* <ToastContainer/> */}
            <InfCaixa />
                                <BotaoMenu style={{position: 'fixed', }}/>
            <Container fluid='true' >
                <Row >
                    <Col className='m-0 p-0' style={{borderRight: '2px solid #9e501c'}}  >
                        {/* BOTÕES DE PRODUTOS */}
                        <div className=''>
                            <div className='title'>
                                Bebidas
                                <div className='botao-menu'> 
                                </div>
                            </div>

                            {bebidas && bebidas.map((produto, i) => {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            addProduto(produto.nome, produto.preco, produto.medida)
                                        }}
                                        className={produto.tipo === 'Comida' ? 'botaoProdutos ehComida' : 'botaoProdutos nEhComida'
                                        }>
                                        <div>
                                            <div style={{ fontSize: '12px' }}>
                                                {produto.nome}
                                            </div>
                                            <div style={{ fontSize: '18px' }}>
                                                {produto.preco.toFixed(2).replace('.', ',')}
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                        
                        <div className='p-0 m-0'>

                            <div className='title'>Comidas</div>
                            {comidas && comidas.map((produto, i) => {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            addProduto(produto.nome, produto.preco, produto.medida)
                                        }}
                                        className={produto.tipo === 'Comida' ? 'botaoProdutos ehComida' : 'botaoProdutos nEhComida'}>
                                        <div>
                                            <div style={{ fontSize: '12px' }}>
                                                {produto.nome}
                                            </div>
                                            <div style={{ fontSize: '20px' }}>
                                                {produto.preco.toFixed(2).replace('.', ',')}
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                        {/* FIM BOTÕES DE PRODUTOS */}
                    </Col>

                    {/* RESUMO DO PEDIDO */}
                    <Col sm={5} className='p-0 m-0'>
                        <div className='title'>Resumo Pedido</div>
                        <Table className='tabela' bordered>
                            <thead>
                                <tr>
                                    <th width="2%">Qnde</th>
                                    <th width="30%">Descrição</th>
                                    <th width="15%">Preço</th>
                                    <th width="5%">Medida</th>
                                    <th width="15%">Total</th>
                                    <th width="15%">Ações</th>
                                </tr>
                            </thead>
                            <tbody >
                                {resumoPedido &&
                                    resumoPedido.map((produto, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'Par' : 'Impar'} >
                                            <td>{produto.qnde}</td>
                                            <td>{produto.nome}</td>
                                            <td>{produto.preco}</td>
                                            <td>{produto.medida === 'Unidade' ? 'UN' : 'KG'}</td>
                                            <td>{
                                                typeof produto.qnde === 'number'
                                                    ? (produto.qnde * produto.preco).toFixed(2).replace('.', ',') : ''}</td>
                                            <td><button
                                                className='botao'
                                                onClick={() => {
                                                    removeProduto(produto)
                                                }}>Excluir</button></td>
                                        </tr>))
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td style={{ fontSize: '18px' }} colSpan={3}>
                                        Total do Pedido:</td>
                                    <td style={{ fontSize: '18px' }} colSpan={3}>
                                        R$ {typeof precoTotal === 'number'
                                            ? (precoTotal.toFixed(2).replace('.', ',')) : ''}</td>
                                </tr>
                                <tr>
                                    <td colSpan={6} >
                                        <div>
                                            <ModalPagamento openModal={openModal} precoTotal={precoTotal} />
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                        {/* FIM DO RESUMO DO PEDIDO */}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Vender
