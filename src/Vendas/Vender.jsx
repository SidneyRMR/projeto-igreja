import { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import InfCaixa from '../InfCaixa'
import BotaoMenu from '../Botoes/BotaoMenu';
import ModalPagamento from './ModalPagamento';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Vender = (props) => {
    
    const caixa = JSON.parse(sessionStorage.getItem('caixa'));

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

        // Este trecho busca os Sangria no BD e seta os valores na const Sangria
        const [sangria, setSangria] = useState([]);

        const getSangria = async () => {
            try{
                const res = await axios.get("http://localhost:8800/sangria")
                const filteredData = res.data.filter(item => item.id_caixa === caixa.id_caixa).sort((a,b) => (a.id_sangria > b.id_sangria ? 1 : -1));
                //calculate the total here
                const total = filteredData.reduce((total, item) => total + item.valorSangria, 0);
                setSangria({data: filteredData, total});
            } catch (error) {
                console.log(error)
            }
        }
        useEffect(() => {
            getSangria()
        }, [sangria]);
        // console.log(sangria)
        // console.log(sangria.total)

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

    const openModal = () => {
        props.setIsModalPgtoOpen(true);
    };

    return (
        <div>
            {/* <ToastContainer/> */}
            <InfCaixa caixa={caixa} sangria={+sangria.total} />
            <Container fluid='true p-0 m-0' >
                <div className='titleVendas d-flex justify-content-between '>
                    <BotaoMenu />
                    <div>TELA DE VENDAS</div> 
                    <div>{''}</div>
                </div>
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
                                {/* {console.log(resumoPedido)} */}
                            </tbody>
                            {/*  Colocar tfoot no rodapé da página */}
                            <tfoot 
                            // style={{position:'fixed', width:'100%'}}
                            >
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
                                            <ModalPagamento openModal={openModal} precoTotalDosProdutos={precoTotal} resumoPedido={resumoPedido} />
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
