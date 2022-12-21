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
            window.location.href = '/abertura-caixa'
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
                    <h1 className="title">Paróquia Santa Cruz</h1>
                </Col>
                <Col>
                    <input className="user" type="text" placeholder="Usuário" onChange={handleUserChange} /><br />
                    <input className="password" type="password" placeholder="Senha" onChange={handlePasswordChange} /><br />
                </Col>
                <Col>
                    <Button onClick={() => testLogin(user, password)}>Entrar</Button>
                </Col>
                <Col>
                    <img src={diocese} alt="" sizes="500x300" />
                </Col>
            </Row>
        </Container>
    )
}

export default Login
