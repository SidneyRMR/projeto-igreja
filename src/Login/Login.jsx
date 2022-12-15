import diocese from "../img/diocese.png"
import Button from 'react-bootstrap/Button';
import usuarios from "../data/usuarios";
import React, { useState } from 'react';

const Login = () => {

    function testLogin(uss, pass) {
        // Verifica se o usuário e senha digitados estão presentes na lista de usuários
        const usuarioEncontrado = usuarios.find(usuario => usuario.login === uss && usuario.senha === pass);
        
        if (usuarioEncontrado) {
            // Se o usuário e senha forem válidos, redireciona para a página de abertura de caixa
            window.location.href = '/abertura-caixa';
        } else {
            // Se o usuário e senha forem inválidos, exibe uma mensagem de erro
            alert('Usuário ou senha inválidos');
        }
    }

    const [user, setUser] = useState()
    const [password, setPassword] = useState()

    const handleUserChange = (event) => {
        setUser(event.target.value);
    }

       const handlePasswordChange = (event) => {
        // Hash the password before storing it in the state
        setPassword(event.target.value);
    }

    return (
        <form className="borda">
            <img src={diocese} alt="" sizes="500x300" />
            <br />
            <h1 className="titleLogin">Paróquia Santa Cruz</h1>
            <input id="user" className="user" type="text" placeholder="Usuário" onChange={handleUserChange} /><br />
            <input id="password" className="password" type="password" placeholder="Senha" onChange={handlePasswordChange} /><br /><br />
            <Button id='botaoLogin' onClick={() => testLogin(user, password)}>Entrar</Button>
        </form>
    )
}

export default Login
