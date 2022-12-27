import { Col, Container, Row } from "react-bootstrap"


const Pagamento = () => {

    return (
        <Container >
            <div className="title">Opções de Pagamento</div>
            <Container className="tabela">
                <Row>
                    <Col md>Crédito: <input type="text" className="cred" /></Col>
                </Row>
                
                    <Col>Débito: <input type="text" className="deb" /></Col>
                    <Col>Dinheiro: <input type="text" className="din" /></Col>
                    
                    
                    <Col>Pix</Col>
                    
                <Row> 
                    <Col align='center'>
                        <Col><input type="text" className="pix" /></Col>
                    </Col>
                    <Col>
                        <td align={2}>Total Pago</td>
                        <td align={2}>{'R$ 50,00'}</td>
                   
                        <td align={2}>Troco</td>
                        <td align={2}>{'R$ 5,00'}</td>
                    </Col>
                </Row>
            </Container>
            <button onClick={() => window.location.href="/vendas"}>Confirmar</button>
            <button onClick={() => window.location.href="/vendas"}>Voltar</button>
        </Container>
    )
}


export default Pagamento