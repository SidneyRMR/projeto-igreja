import produtos from '../data/produtos'
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const Vender = () => {

    // //Hook useState
    // const produto = useState('')



    function getProdutos() {
        return produtos.map((produto, i) => {
            return (
                <button key={i}
                    onClick={e => console.log(`Botão de ${produto.nome} funciona!`)}
                    className='produtosVenda'>{produto.nome}<br />
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                </button>
            )
        })
    }





    return (

        <Table>
            <thead>
                <tr>
                    <th>Menu</th>
                    <th>Vendas</th>
                    <th>Pagamento</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>

                        <Dropdown.Item href="/sangria">Sangria</Dropdown.Item>
                        <Dropdown.Item href="/cadastros/produtos">Ver Produtos</Dropdown.Item>
                        <Dropdown.Item href="/fechamento-caixa">Fechar Caixa</Dropdown.Item>
                        <Dropdown.Item href="/">Sair</Dropdown.Item>

                    </td>
                    <td>
                        <Col xs={6}><div className="title">Produtos</div>
                            <div>
                                {getProdutos()}
                            </div>
                        </Col>
                    </td>
                    <td>
                        <Table striped bordered hover size="sm">
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
                                <tr>
                                    <td>#</td>
                                    <td>1</td>
                                    <td>Refri</td>
                                    <td>8</td>
                                    <td>8</td>
                                 
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