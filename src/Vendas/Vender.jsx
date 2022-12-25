import produtos from '../data/produtos'
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Vender = () => {



    const [produtosVenda, setProdutosVenda] = useState([]);
    // Recupera o valor do usuario da tela de login
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const valEntrada = JSON.parse(sessionStorage.getItem('valEntrada'));

    let [quantidade, setQuantidade] = useState(1)

    function addProduto(prod) {
        const produtoExistente = produtosVenda.find((p) => p.id === prod.id);
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
            setQuantidade(quantidade = quantidade - 1)
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

    // function somaTotal() {
    //     return produtosVenda.reduce((acc, cur) => acc + cur.preco, 0)
    // }

    return (
        <>

            <Container>
                {/* MENU SUSPENSO */}
                <div style={{ position: 'fixed', top: '0px', left: '0px', zIndex: 1 }}>
                    {/* Exibe o botão de menu */}
                    <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
                    {/* Exibe o menu se o estado isOpen for verdadeiro */}
                    {isOpen && (
                        <div style={{ position: 'fixed', top: '0px', left: '0px' }}>
                            <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
                            <button style={{ position: 'fixed', top: '42px', left: '0px' }} onClick={() => window.location.href = "/sangria"}>Sangria</button>
                            <button style={{ position: 'fixed', top: '84px', left: '0px' }} onClick={() => { window.location.href = "/fechamento-caixa" }}>Fech Caixa</button>
                            <button style={{ position: 'fixed', top: '126px', left: '0px' }} onClick={() => {
                                window.location.href = "/"
                                sessionStorage.removeItem('usuario');
                                sessionStorage.removeItem('valEntrada');
                            }}>Sair</button>
                        </div>
                    )}
                </div>
                <Row>
                        <Col style={{ position: 'fixed', left: '0%', maxWidth: '130vh' }}>
                            <div className='title'>Produtos</div>
                            {produtos.map((produto, i) => {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => addProduto(produto)}
                                        className={produto.ehComida === true ? 'ehComida' : 'nEhComida'}
                                    >
                                        <div>
                                            {produto.nome} <hr />
                                            R$ {produto.preco.toFixed(2).replace('.', ',')}
                                        </div>
                                    </button>
                                )
                            })}
                        </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ position: 'fixed', right: '0%', minWidth: '90vh', maxWidth: '120vh' }}>
                            <div className='title'>Resumo Pedido</div>
                            <table className='tabela'>
                                <thead>
                                    <tr>
                                        <th>Qnde</th>
                                        <th>Descrição</th>
                                        <th>Valor R$</th>
                                        <th>Medida</th>
                                        <th>Total R$</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody className='scrollable-tbody'>
                                    {produtosVenda.map((produto, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'Par' : 'Impar'} >
                                            <td>{quantidade}</td>
                                            <td>{produto.nome}</td>
                                            <td>{produto.preco.toFixed(2)}</td>
                                            <td>{produto.medida.toUpperCase()}</td>
                                            <td>{(quantidade * produto.preco).toFixed(2)}</td>
                                            <td><button onClick={() => removeProduto(produto)}>Excluir</button></td>
                                        </tr>))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3}>Total do Pedido:</td>
                                        <td colSpan={3}>{ }</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <button onClick={() => window.location.href = "/vendas/pagamento"} className="vender" >Pagamento</button>
                        </div>
                    </Col>
                </Row>
                <Row>

                    <Col style={{
                        fontSize: '15px',
                        fontWeight: '200', position: 'fixed',
                        bottom: '0px', backgroundColor: '#aa541b',
                        color: 'white', padding: '5px'
                    }}>
                        Nome do Caixa: {usuario.nome}
                        <br />
                        Saldo do caixa: {valEntrada.toFixed(2)}
                    </Col>
                </Row>
            </Container>


        </>

    )
}

export default Vender