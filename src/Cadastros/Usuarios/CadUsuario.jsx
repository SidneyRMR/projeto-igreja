import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CadUsuario = () => {

    const urlParams = new URLSearchParams(window.location.search)
    const id = +urlParams.get('id')
    const [usuario, setUsuario] = useState()
    

    const getUsuario = async (id) => {
        try {
          const res = await axios.get(`http://localhost:8800/usuarios/${id}`)
          return res.data
        } catch (error) {
          console.log(error)
        }
      }
      

    useEffect(() => {
        getUsuario()
    }, [setUsuario])
    // esta com erro no CadUsuario e CadProduto devido, ele esta lendo o bd, o id do param
    //, mas quando passo pro get buscar no bd nao esta funcionando
    console.log(usuario) // logs the product data
    
    const [nome_usuario, setNome] = useState(id ? usuario.nome_usuario : '');
    const [login, setLogin] = useState(id ? usuario.login : '');
    const [senha, setSenha] = useState(id ? usuario.senha : '');

    // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };
    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };
    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    }

    return (
        <Container fluid='true'>
            <Row>
                <div className='title'>Cadastro de Usuario</div>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Digite o nome do usuário:</div>
                
                    <input className="nomeUsuario" type="text" 
                        placeholder="Insira seu nome completo" 
                        onChange={handleNomeChange}
                        value={nome_usuario}
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Digite o login do usuário:</div>
                
                    <input className="loginUsuario" type="text" 
                    placeholder="Cadastre um login" 
                    onChange={handleLoginChange}
                    value={login}   
                />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Digite uma senha:</div>
               
                    <input className="senhaUsuario" type="text" 
                        placeholder="Cadastre uma senha" 
                        onChange={handleSenhaChange}
                        value={senha} 
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <button id="cadastrar" onClick={() => {
                        // salvaUsuario()
                        window.location.href = "/cadastros/usuarios" 
                    }}>Salvar</button>
                    <button onClick={() => window.location.href = "/cadastros/usuarios"}>Voltar</button>
                </Col>
            </Row>
        </Container>
    )
}

export default CadUsuario