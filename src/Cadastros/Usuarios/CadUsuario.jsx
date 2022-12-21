import { Container, Row, Col, Form } from 'react-bootstrap';

const CadUsuario = () => {

    return (
        <Container>
            <Row>
                <h1 className='title'>Cadastro de Usuario</h1> <br />
            </Row>
            <Row>
                <Col>
                    <div>Digite o nome do usuário:</div>
                </Col>
                <Col>
                    <input className="nomeUsuario" type="text" placeholder="Insira seu nome completo" /><br />
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>Digite o login do usuário:</div>
                </Col>
                <Col>
                    <input className="loginUsuario" type="text" placeholder="Cadastre um login" /><br />
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>Digite uma senha:</div>
                </Col>
                <Col>
                    <input className="senhaUsuario" type="text" placeholder="Cadastre uma senha" /><br />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Administrador"
                        />
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button id="cadastrar" onClick={() => {
                        // salvaUsuario()
                        window.location.href = "/cadastros/usuarios"
                    }}>Cadastrar</button>
                    <button onClick={() => window.location.href = "/cadastros/usuarios"}>Voltar</button>
                </Col>
            </Row>
        </Container>
    )
}

export default CadUsuario