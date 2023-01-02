import produtos from '../data/produtos'
import { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import InfUsuario from '../InfUsuario'
// import InfVendaAtual from '../InfVendaAtual'

const Vender = () => {

    // const [produto,setPedido] = useState([{
    //     id: produto.id,
    //     nome: produto.nome,
    //     preco: produto.preco,
    //     medida: produto.medida,
    //     ehComida: produto.ehComida,
    //     quantidade: produto.quantidade,
    // }],[])

    const resumoProdutosVenda = JSON.parse(sessionStorage.getItem('resumoProdutosVenda'));

    let [quantidade, setQuantidade] = useState(1)
    const [total, setTotal] = useState(0);
    const [produtosVenda, setProdutosVenda] = useState(resumoProdutosVenda || []);


    function addProduto(prod) {
        const produtoExistente = produtosVenda?.find((p) => p.id === prod.id);
        if (produtoExistente) {
            setQuantidade(quantidade += 1)
            setProdutosVenda([...produtosVenda])
        } else {
            setProdutosVenda([...produtosVenda, prod])
        }
    }
    function removeProduto(prod) {
        const produtoExistente = produtosVenda.find((p) => p.id === prod.id);
        if ((produtoExistente) && (quantidade > 0)) {
            setQuantidade(quantidade -= 1)
            setProdutosVenda([...produtosVenda]);
        }
        if ((quantidade < 1)) {
            setQuantidade(1)
            setProdutosVenda([]);
        }

    }



    const [isOpen, setIsOpen] = useState(false);
    // Adiciona um evento de clique fora do menu quando o componente é montado
    useEffect(() => {
        function handleClickOutside(event) {
            // Verifica se o clique foi fora do menu e do botão
            if (event.target.closest('.menu') || event.target.closest('button')) {
                return
            }// Fecha o menu
            setIsOpen(false)
        }
        document.addEventListener('click', handleClickOutside);
        // Remove o evento de clique quando o componente é desmontado
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])

    // function addPeso() {
    //     alert(
    //         <div>Digite Peso</div>,
    //         <input placeholder='Peso do produto'></input>
    //     )
    // }

    function salvaProdutosLocal() {
        const resumoProdutosVenda = [...produtosVenda];
        sessionStorage.setItem('resumoProdutosVenda', JSON.stringify(resumoProdutosVenda));
        // console.log(resumoProdutosVenda.reduce((acc, prod) => acc +(prod.preco * quantidade), 0))
        console.log(resumoProdutosVenda, resumoProdutosVenda.quantidade = quantidade)
    }

    return (
        <div>
            {/* Informações de caixa no rodapé */}
            {InfUsuario()}
            {/* {console.log(resumoProdutosVenda)} */}

            {/* MENU SUSPENSO */}
            <div style={{ position: 'fixed', top: '5px', left: '5px', zIndex: 1 }}>
                {/* Exibe o botão de menu */}
                <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
                {/* Exibe o menu se o estado isOpen for verdadeiro */}
                {isOpen && (
                    <div style={{ position: 'fixed', top: '5px', left: '5px' }}>
                        <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
                        <button style={{ position: 'fixed', top: '46px', left: '5px', width: '150px' }} onClick={() => window.location.href = "/sangria"}>Sangria</button>
                        <button style={{ position: 'fixed', top: '86px', left: '5px', width: '150px' }} onClick={() => { window.location.href = "/fechamento-caixa" }}>Fechamento Caixa</button>
                        <button style={{ position: 'fixed', top: '126px', left: '5px', width: '150px' }} onClick={() => {
                            window.location.href = "/"
                            sessionStorage.removeItem('usuario');
                            sessionStorage.removeItem('valEntrada');
                        }}>Sair</button>
                    </div>
                )}
            </div>



            <Container fluid='true'>
                <Row>
                    <Col sm={7}>
                        <div className='title'>Produtos</div>
                        {/* BOTÕES DE PRODUTOS */}
                        {produtos.map((produto, i) => {
                            return (
                                <button
                                    key={i}
                                    onClick={() => {
                                        addProduto(produto);
                                        setTotal(produtosVenda.reduce((acc, prod) => acc +(prod.preco * quantidade), 0))
                                        salvaProdutosLocal()
                                      }}
                                    className={produto.tipo === 'Comida' 
                                        ? 'ehComida' : 'nEhComida' 
                                    }
                                >
                                    <div>
                                        {produto.nome} <br />
                                        <div style={{ fontSize: '20px' }}>
                                            R$ {produto.preco.toFixed(2).replace('.', ',')}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                        {/* FIM BOTÕES DE PRODUTOS */}
                    </Col>

                    <Col sm={5}>
                        <div className='title'>Resumo Pedido</div>
                        {/* RESUMO DO PEDIDO */}
                        <Table className='tabela' bordered>
                            <thead>
                                <tr>
                                    <th width="2%">Qnde</th>
                                    <th width="30%">Descrição</th>
                                    <th width="15%">Valor</th>
                                    <th width="05%">Medida</th>
                                    <th width="15%">Total</th>
                                    <th width="15%">Ações</th>
                                </tr>
                            </thead>
                            <tbody >
                                {produtosVenda &&
                                produtosVenda.map((produto, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'Par' : 'Impar'} >
                                        <td>{quantidade}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.preco.toFixed(2)}</td>
                                        <td>{produto.medida.toUpperCase()}</td>
                                        <td>{(quantidade * produto.preco).toFixed(2)}</td>
                                        <td><button onClick={() => {
                                            removeProduto(produto)
                                            setTotal(produtosVenda.reduce((acc, prod) => -acc +(prod.preco * quantidade), 0))
                                            salvaProdutosLocal()
                                        }}>Excluir</button></td>
                                    </tr>))
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3}>Total do Pedido:</td>
                                    <td colSpan={3}>R$ {total.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={6} >
                                        <button
                                            className="w-100"
                                            onClick={() => {
                                                window.location.href = "/vendas/pagamento";
                                                salvaProdutosLocal()
                                            }}
                                        >
                                            Pagamento
                                        </button>
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