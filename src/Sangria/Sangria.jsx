import { Col, Container, Row } from "react-bootstrap"

import InfUsuario from '../InfUsuario'

const Sangria = () => {

    return (
        
        <Container fluid='true'>
            {InfUsuario()}
            <Row>
                <Col>
                    <div className="title">Sangria</div>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Digite o valor a ser retirado </div>
                    <input className="valorSangria" type="text" placeholder="Valor à retirar" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Motivo da retirada </div>
                    <textarea md className="descricaoSangria" type="text" placeholder="Observação" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <button id="sangria" onClick={() => { window.location.href = "/vendas" }}>Aceitar</button>
                    <button onClick={() => window.location.href = "/vendas"}>Voltar</button>
                </Col>
            </Row>
        </Container>
    )
}

export default Sangria