import produtos from '../data/produtos'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const Vender = () => {

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
        
            <Container>
                <Row>
                    <Col>
                        
                            <DropdownButton className="menuPrincipal" title="Menu" variant="warning" size="lg">
                                <Dropdown.Item href="/sangria">Sangria</Dropdown.Item>
                                <Dropdown.Item href="/cadastros/produtos">Ver Produtos</Dropdown.Item>
                                <Dropdown.Item href="/fechamento-caixa">Fechar Caixa</Dropdown.Item>
                                <Dropdown.Item href="/">Sair</Dropdown.Item>
                            </DropdownButton>
                        
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}><div className="title">Produtos</div>
                        <div>
                            {getProdutos()}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
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
                                    <td></td>
                                    <td>1</td>
                                    <td>Pastel</td>
                                    <td>10,00</td>
                                    <td>10,00</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <a className="vender" href="/vendas/pagamento">Pagamento</a>
                    </Col>
                </Row>

            </Container>
        



    )
}

export default Vender