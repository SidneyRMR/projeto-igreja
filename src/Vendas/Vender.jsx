import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import InfCaixa from '../InfCaixa'
// import BotaoSair from '../Botoes/BotaoSair';
import BotaoMenu from '../Botoes/BotaoMenu';

const Vender = () => {

    const caixaStorange = JSON.parse(sessionStorage.getItem('caixa'));
    // console.log(caixaStorange)
    const [caixa, setCaixa] = useState(caixaStorange)

    let abertura = '';
    let sangria = '';
    let data_abertura = '';
    let data_fechamento = '';
    let id_caixa = '';
    let id_compra = '';
    let id_festa = '';
    let id_usuario = ''
    let status_caixa = ''

    const [isModalPgtoOpen, setIsModalPgtoOpen] = useState(false);
    const [isModalSangriaOpen, setIsModalSangriaOpen] = useState(false);
    const [precoTotal, setPrecoTotal] = useState(0)
    const [bebidas, setBebidas] = useState([])
    const [comidas, setComidas] = useState([])

    const [valorNovaSangria, setValorNovaSangria] = useState();
    // const [descricaoSangria, setDescricaoSangria] = useState(caixa.descSangria);


    const [showPixInput, setShowPixInput] = useState(false);
    const [showDinheiroInput, setShowDinheiroInput] = useState(false);
    const [showCreditoInput, setShowCreditoInput] = useState(false);
    const [showDebitoInput, setShowDebitoInput] = useState(false);

    function handlePaymentPix(event) {
        setShowPixInput(event.target.value === 'Pix');
    }
    function handlePaymentDinheiro(event) {
        setShowDinheiroInput(event.target.value === 'Dinheiro');
    }
    function handlePaymentCredito(event) {
        setShowCreditoInput(event.target.value === 'Crédito');
    }
    function handlePaymentDebito(event) {
        setShowDebitoInput(event.target.value === 'Débito');
    }

    function handleSangriaValor(event) {
        setValorNovaSangria(event.target.value);
    }
    // function handleSangriaDescrição(event) {
    //     setShowDebitoInput(event.target.value);
    // }

    // const salvaSangria = async () => {
    //     console.log(valorNovaSangria)
    //     if ((valorNovaSangria > 0) && (valorNovaSangria < caixa.abertura)) {
    //         // alterações 
            
    //         // sangria = valorNovaSangria
    //         // iguais
    //         abertura = caixa.abertura
    //         data_fechamento = caixa.data_fechamento
    //         status_caixa = caixa.status_caixa
    //         data_abertura = caixa.data_abertura
    //         id_compra = caixa.id_compra
    //         id_festa = caixa.id_festa
    //         id_usuario = caixa.id_usuario
    //         try {
    //             const res = await axios.put(`http://localhost:8800/caixas/${id_caixa}`, {
    //                 id_caixa,
    //                 abertura,
    //                 sangria,
    //                 data_abertura,
    //                 data_fechamento,
    //                 id_compra,
    //                 id_festa,
    //                 id_usuario,
    //                 status_caixa,
    //             });
    //             console.log(`Caixa ${id_caixa} atualizado para  ${status_caixa} as ${data_fechamento}.'`);
    //             sessionStorage.setItem('caixa', JSON.stringify(caixa));
    //             return res.data;
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     } else {
    //         window.confirm('O valor deve ser menor do que o de saldo em dinheiro deste caixa.')

    //     }
    // }

    // Este trecho busca os produtos no BD e seta os valores na const produtos
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
    const novaCompra = async () => {
        // try {

        //     const id_caixa = 
        //     await axios.post('http://localhost:8800/compras', {
        //         id_caixa: 
        // });
        // //   Loop pelos produtos da lista de compras
        //   for (const produto of produtos) {
        //     // Adiciona uma linha à tabela "tb_compras" para cada produto
        //     await axios.post('http://localhost:8800/tb_compraprodutos', {
        //         id_produto: produto.id,
        //         quantidade_produto: produto.quantidade,
        //         id_compra: 1,
        //     });
        // }

        //   console.log(`Lista de compras salva com sucesso`);
        // } catch (error) {
        //   console.log(error);
        // }
    }




    return (
        <div>
            <InfCaixa/>
            <BotaoMenu />
            <Container fluid='true' >
                <Row>
                    <Col sm={8} xs={5}>
                        {/* BOTÕES DE PRODUTOS */}
                        <div>
                            <div className='title'>Bebidas</div>
                            {bebidas && bebidas.map((produto, i) => {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            addProduto(produto.nome, produto.preco, produto.medida)
                                        }}
                                        className={produto.tipo === 'Comida' ? 'ehComida' : 'nEhComida'
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
                            <div className='title'>Comidas</div>
                            {comidas && comidas.map((produto, i) => {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            addProduto(produto.nome, produto.preco, produto.medida)
                                        }}
                                        className={produto.tipo === 'Comida' ? 'ehComida' : 'nEhComida'}>
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
                    <Col sm={4} xs={5}>
                        <div className='title'>Resumo Pedido</div>
                        <Table className='tabela' bordered>
                            <thead>
                                <tr>
                                    <th width="2%">Qnde</th>
                                    <th width="30%">Descrição</th>
                                    <th width="15%">Preço</th>
                                    <th width="10%">Medida</th>
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
                                            <td>{produto.medida}</td>
                                            <td>{
                                                typeof produto.qnde === 'number'
                                                    ? (produto.qnde * produto.preco).toFixed(2).replace('.', ',') : ''}</td>
                                            <td><button onClick={() => {
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
                                        <button
                                            className="w-100"
                                            onClick={() => {
                                                novaCompra()
                                                setIsModalPgtoOpen(true)
                                            }}>Pagamento
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                        {/* FIM DO RESUMO DO PEDIDO */}
                    </Col>
                </Row>
            </Container>

            {/* Modal de pagamento */}
            <Modal show={isModalPgtoOpen} onHide={() => setIsModalPgtoOpen(false)}>
                <Modal.Header closeButton className="title">
                    <Modal.Title className="title">Formas de pagamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="payment" value="Pix"
                                onChange={handlePaymentPix} />
                            <label className="form-check-label" >
                                Pix
                            </label>
                            {showPixInput && (
                                <div className="form-group">
                                    <label htmlFor="pixAmount">Valor em Pix</label>
                                    <input type="text" className="form-control" />
                                </div>
                            )}
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="payment" value="Dinheiro"
                                onChange={handlePaymentDinheiro} />
                            <label className="form-check-label" >
                                Dinheiro
                            </label>
                            {showDinheiroInput && (
                                <div className="form-group">
                                    <label htmlFor="pixAmount">Valor em Dinheiro</label>
                                    <input type="text" className="form-control" />
                                </div>
                            )}
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="payment" value="Crédito"
                                onChange={handlePaymentCredito} />
                            <label className="form-check-label" >
                                Crédito
                            </label>
                            {showCreditoInput && (
                                <div className="form-group">
                                    <label htmlFor="pixAmount">Valor em Crédito</label>
                                    <input type="text" className="form-control" />
                                </div>
                            )}
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="payment" value="Débito"
                                onChange={handlePaymentDebito} />
                            <label className="form-check-label">
                                Débito
                            </label>
                            {showDebitoInput && (
                                <div className="form-group">
                                    <label htmlFor="pixAmount">Valor em Débito</label>
                                    <input type="text" className="form-control" />
                                </div>
                            )}
                        </div>

                        <Container className='title text-center' style={{ fontSize: '20px', fontWeight: '400' }}>
                            <Row >
                                <Col>
                                    Total à pagar
                                </Col>
                                <Col>
                                    R$ {typeof precoTotal === 'number'
                                        ? (precoTotal.toFixed(2).replace('.', ',')) : ''}
                                </Col>
                            </Row>
                            <Row >
                                <Col>
                                    Troco
                                </Col>
                                <Col>
                                    R$ 0,00
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <button className="w-100" onClick={() =>
                                        novaCompra()
                                    }>
                                        <div style={{ fontSize: '25px' }}>
                                            Confirmar Pagamento
                                        </div>
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Modal de sangria */}
            <Modal show={isModalSangriaOpen} onHide={() => { setIsModalSangriaOpen(false) }}>
                <Modal.Header closeButton className="title">
                    <Modal.Title className="title">Sangria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div>
                            <div className="form-group">
                                <div className="form-group">
                                    <label>Valor da sangria</label><br />
                                    <input type="number" onChange={handleSangriaValor} value={valorNovaSangria} className="valSangria form-control" />
                                </div>
                                <br />
                                <div className="form-group ">
                                    <label>Motivo da sangria</label><br />
                                    <textarea type="text" className="descSangria form-control" />
                                </div>
                                <br />
                                <button className="w-100 " onClick={() => {
                                        // salvaSangria(valorNovaSangria)
                                }}>
                                    <div style={{ fontSize: '25px' }}>
                                        Efetura Sangria
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Vender
