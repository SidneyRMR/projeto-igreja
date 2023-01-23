import { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { api } from "../services/api";
import InfCaixa from '../InfCaixa'
import BotaoMenu from '../Botoes/BotaoMenu';
import ModalPagamento from './ModalPagamento';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Vender = (props) => {
   
    
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const [caixa, setCaixa] = useState({})
    useEffect(() => {
    const caixaMaisRecente = async () => {
        const res = await api.get('/caixas');
        const caixasAbertosDesteUsuario = res.data.filter(caixa => caixa.status_caixa === 'Aberto' && caixa.id_usuario === usuario.id_usuario);
        const caixasAbertosClassificados = caixasAbertosDesteUsuario.sort((a, b) => b.id_caixa - a.id_caixa)
        await setCaixa(caixasAbertosClassificados[0])
        
        sessionStorage.setItem('caixa', JSON.stringify(caixasAbertosClassificados[0]))
    }
    caixaMaisRecente()
    }, [usuario])
// console.log(caixa)

    const [precoTotal, setPrecoTotal] = useState(0)
    const [bebidas, setBebidas] = useState([])
    const [comidas, setComidas] = useState([])

    // Este trecho busca os produtos no BD e seta os valores na const produtos
    const [produtos, setProdutos] = useState([])
    const getProdutos = async () => {
        try {
            const res = await api.get("/produtos")
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
        const [sangria, setSangria] = useState([])
        useEffect(() => {
            const getSangria = async () => {
                try{
                    const res = await api.get("/sangria")
                    const filteredData = res.data.filter(item => item.id_caixa === caixa.id_caixa)
                    //calculate the total here
                    const total = filteredData.reduce((total, item) => total + item.valorSangria, 0);
                    setSangria({data: filteredData, total});
                } catch (error) {
                    console.log(error)
                }
            }
            getSangria()
        },[caixa.id_caixa])
        
        
        // console.log(sangria.total)

    // Declare a list of objects and a state for the form input values
    const [resumoPedido, setResumoPedido] = useState([])

    const addProduto = (idProd, nomeProd, precoProd, medidaProd) => {
        // Read the values of the button's attributes
        const id_produto = idProd
        const nome = nomeProd
        const preco = precoProd
        const medida = medidaProd

        // Check if an object with the same values already exists in the list
        const existeProduto = resumoPedido.find((produto) => {
            return produto.id_produto === id_produto 
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
                id_produto: id_produto,
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

    let infoVendas = true

    const limpaListaProdutos = () => {
        setResumoPedido([]);
        };
        
        useEffect(() => {
        limpaListaProdutos();
        }, []);
   
        const [saldoCaixa, setSaldoCaixa] = useState(0)
        const handleSaldoCaixa = (value) => {
            setSaldoCaixa(value);
        }
    return (
        <div>
            {/* <ToastContainer/> */}
            <InfCaixa infoVendas={infoVendas} caixa={caixa} sangria={+sangria.total} onSaldoCaixa={handleSaldoCaixa}/>
            <Container fluid='true p-0 m-0' >
                <div className='titleVendas d-flex justify-content-between '>
                    <BotaoMenu saldoCaixa={saldoCaixa} sangria={sangria} id={caixa.id_caixa} caixa={caixa}/>
                    <span className="centered-element">
                        Gestão de Caixas
                    </span> 
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
                                            addProduto(produto.id_produto, produto.nome, produto.preco, produto.medida)
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
                            {comidas &&  comidas.map((produto, i) => {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            addProduto(produto.id_produto, produto.nome, produto.preco, produto.medida)
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
                                            <ModalPagamento limpaListaProdutos={limpaListaProdutos} 
                                                    openModal={openModal} precoTotalDosProdutos={precoTotal}
                                                    resumoPedido={resumoPedido} />
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
