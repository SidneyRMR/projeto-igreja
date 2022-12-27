
import { Col, Container, Row } from "react-bootstrap"

import Clock from './Clock'; // Importar o componente Clock

// Recupera o valor do usuario da tela de login
const usuario = JSON.parse(sessionStorage.getItem('usuario'));
const valEntrada = JSON.parse(sessionStorage.getItem('valEntrada'));

const resumoProdutosVenda = JSON.parse(sessionStorage.getItem('resumoProdutosVenda'));
function InfVendaAtual() {
    return(
    <Container fluid='true'>
        <Row style={{
            fontSize: '15px',
            fontWeight: '200', position: 'fixed',
            right: '0px', bottom: '5px', backgroundColor: '#ac724a',
            color: 'white', padding: '1px', zIndex: 1
        }}>
            <Col>
                Nome do Caixa: {usuario.nome}
                {' | '}
                Data e hora abertura: {Clock}
                {' | '}
                Produtos comprados obj: {resumoProdutosVenda.toFixed(2)} {/* Acessar pelo id da compra */}
                {' | '}
                Formas e valores de pagamento obj: {valEntrada.toFixed(2)} {/* Acessar pelo id da compra */}
                {' | '}
                Saldo do caixa: {valEntrada.toFixed(2)}
                {' | '}
                Data e hora fechamento: {valEntrada.toFixed(2)}
            </Col>
        </Row>
    </Container>
    )
}
export default InfVendaAtual