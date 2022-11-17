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
                    className='produtosVenda'>{produto.nome}<br /><br />
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                </button>
            )
        })
    }

    function getVendido() {
        return produtosVenda.map((produto, i) => {
            return (
                <tr key={i}
                    className=''>
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
                        <br /><br />
                        <img src={diocese} alt="" sizes="500x300" />

                    </td>
                    <td className=''>
                        <Col xs={6}>
                            {getProdutos()}
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
                                <tr id='pagamento'>
                                    <td colSpan={2} ><b>
                                        Total do Pedido:
                                    </b>
                                    </td>
                                    <td colSpan={3} ><b>R$ 100.00</b> </td>
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