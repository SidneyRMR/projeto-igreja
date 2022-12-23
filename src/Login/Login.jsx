import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'

import diocese from "../img/diocese.png"
import usuarios from "../data/usuarios"
import { Container, Row, Col } from 'react-bootstrap'

const Login = () => {

    function testLogin(uss, pass) {
        // Verifica se o usuário e senha digitados estão presentes na lista de usuários
        const usuarioEncontrado = usuarios.find(usuario => usuario.login === uss && usuario.senha === pass)

        if (usuarioEncontrado) {
            // Se o usuário e senha forem válidos, redireciona para a página de abertura de caixa
            window.location.href = `/abertura-caixa`
            sessionStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));

        } else {
            // Se o usuário e senha forem inválidos, exibe uma mensagem de erro
            alert('Usuário ou senha inválidos')
        }
    }

    const [user, setUser] = useState()
    const [password, setPassword] = useState()

    const handleUserChange = (event) => {
        setUser(event.target.value)
    }

    const handlePasswordChange = (event) => {
        // Hash the password before storing it in the state
        setPassword(event.target.value)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div className="title">Paróquia Santa Cruz</div>
                </Col>
            </Row>
            <Container>
                <Row>
                    <Col>
                        <div>Digite seu nome de usuário:</div>
                    </Col>
                    <Col>
                        <input className="user" type="text" placeholder="Login" onChange={handleUserChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>Digite sua senha:</div>
                    </Col>
                    <Col>
                        <input className="password" type="password" placeholder="Senha" onChange={handlePasswordChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => testLogin(user, password)}>Entrar</Button>
                    </Col>
                    <Col>
                        <img src={diocese} alt="" sizes="500x300" />
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Login
