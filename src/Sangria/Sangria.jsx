import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Sangria = () => {

    return (
        <Container >
            <Row>
                <Col>
                    <h1 className="title">Sangria</h1>
                    <input className="valorSangria" type="text" placeholder="Digite o valor" />
                </Col>
                <Col>
                    <textarea className="descricaoSangria" type="text" placeholder="Observação" />

                </Col>
                <Col>

                    <button id="sangria" onClick={() => {window.location.href = "/vendas"}}>Aceitar</button>
                    <button onClick={() => window.location.href = "/vendas"}>Voltar</button>
                </Col>
            </Row>
        </Container>
    )
}

export default Sangria