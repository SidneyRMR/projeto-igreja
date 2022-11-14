import produtos from '../data/produtos'
import produtosVenda from '../data/produtosVenda'
import diocese from "../img/diocese.png"

import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Vender = () => {

    // //Hook useState
    // const produto = useState('')



    function getProdutos() {
        return produtos.map((produto, i) => {
            return (
                <button key={i} id='botaoProdutos'
                    className='produtosVenda'>{produto.nome}<br />
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                </button>
            )
        })
    }

    function getVendido() {
        return produtosVenda.map((produto, i) => {
            return (
                <tr key={i}
                    className='produtosVenda'>
                        <td><Button>Excluir</Button></td>
                        <td>{produto.itens}</td>
                        <td>{produto.nome}</td>
                        <td>R$ {produto.preco.toFixed(2)}</td>
                        <td>R$ {(produto.itens * produto.preco).toFixed(2)}</td>
                </tr>
            )
        })
    }

    return (

        <Table>
            <thead>
                <tr>
                    <th className='titleVendas'>Menu</th>
                    <th className='titleVendas' >Produtos</th>
                    <th className='titleVendas'>Pagamento</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='tdVender'>

                        <Dropdown.Item href="/sangria">Sangria</Dropdown.Item>
                        <Dropdown.Item href="/cadastros/produtos">Ver Produtos</Dropdown.Item>
                        <Dropdown.Item href="/fechamento-caixa">Fechar Caixa</Dropdown.Item>
                        <Dropdown.Item href="/">Sair</Dropdown.Item>

                        <img src={diocese} alt="" sizes="500x300" />

                    </td>
                    <td className='tdVender'>
                        <Col xs={6}>
                            <div >
                                {getProdutos()}
                            </div>
                        </Col>
                    </td>
                    <td className='tdVenderScroll'>
                        <Table >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Un</th>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getVendido()}
                                <tr>
                                    <td colSpan={2}>
                                        Total do Pedido:
                                    </td>
                                    <td colSpan={2} align='right'>R$ 100.00</td>
                                </tr>

                            </tbody>
                        </Table>
                        <a className="vender" href="/vendas/pagamento">Pagamento</a>
                    </td>
                </tr>
            </tbody>
        </Table>




    )
}

export default Vender