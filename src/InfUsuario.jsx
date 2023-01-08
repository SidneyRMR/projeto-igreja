
import { Col, Container, Row } from "react-bootstrap"

import Clock from './Clock'; // Importar o componente Clock

// Recupera o valor do usuario da tela de login
const usuario = JSON.parse(sessionStorage.getItem('usuario'));
const caixaNovo = JSON.parse(sessionStorage.getItem('caixa'));
function InfUsuario() {

    return(
    <Container fluid='true'>
        <Row style={{
            fontSize: '15px',
            fontWeight: '200', position: 'fixed',
            left: '0px', bottom: '0px', backgroundColor: '#aa541b',
            color: 'white', padding: '1px', zIndex: 1
        }}>
            <Col>
                {Clock()}
                {' | '}
                Nome do caixa: {usuario.nome}
                {' | '}
                Saldo do caixa: {caixaNovo.valorAbertura}
            </Col>
        </Row>
    </Container>
    )
}
export default InfUsuario