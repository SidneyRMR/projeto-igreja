import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CadUsuario = () => {

    const urlParams = new URLSearchParams(window.location.search)
    const id = +urlParams.get('id')

    const paramNome = urlParams.get('nome')
    const paramLogin = urlParams.get('login')
    const paramTipo = urlParams.get('tipo')

    const [nome, setNome] = useState(id ? paramNome : '');
    const [login, setLogin] = useState(id ? paramLogin : '');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');
    const [tipo, setTipo] = useState(id ? paramTipo : 'Caixa');

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
    const handleSenha2Change = (event) => {
        setSenha2(event.target.value);
    }
    const handleTipoChange = (event) => {
        setTipo(event.target.value);
    }

    // Função que cria um novo produto 
    const novoUsuario = async (nome, login, senha, senha2, tipo) => {
        if (!nome || !login || !senha || !senha2 || !tipo) {
            toast.error('Todos os campos devem estar preenchidos!', {
                position: toast.POSITION.TOP_CENTER,
            })
            return
        }
        if (senha.length < 6) {
                toast.error('A senha deve ter mais de seis caracteres!', {
                position: toast.POSITION.TOP_CENTER,
            })
            return
        }
        if (senha !== senha2) {
            console.log(senha, senha2)
            toast.error('As senhas devem ser iguais!', {
                position: toast.POSITION.TOP_CENTER,
            })
            return
        }
        try {
            const res = await axios.post('http://localhost:8800/usuarios', {
                nome,
                login,
                senha,
                tipo,
            })
            toast.success(`${res.data} salvo com sucesso`, {
                position: toast.POSITION.TOP_CENTER,
            })
            return (res.data, (window.location.href = '/cadastros/usuarios'))
        } catch (error) {
            toast.error(error)
        }
    }
    // Função que altera o usuario 
    /// !!!! esta com algum problema no back ou no front
    const alteraUsuario = async (id, nome, login, senha, senha2, tipo) => {
        if (!nome || !login || !senha || !senha2 || !tipo) {
            toast.error('Todos os campos devem estar preenchidos!', {
                position: toast.POSITION.TOP_CENTER,
            })
            return
        }
        if (senha.length < 6) {

            toast.error('A senha deve ter mais de seis caracteres!', {
                position: toast.POSITION.TOP_CENTER,
            })
            return
        }
        if (senha !== senha2) {
            console.log(senha, senha2)
            toast.error('As senhas devem ser iguais!', {
                position: toast.POSITION.TOP_CENTER,
            })
            return
        }
        try {
            const res = await axios.put(`http://localhost:8800/usuarios/${id}`, {
                id,
                nome,
                login,
                senha,
                tipo,
            })
            toast.success(`${res.data} alterado com sucesso`, {
                position: toast.POSITION.TOP_CENTER,
            })
            return (res.data, (window.location.href = '/cadastros/usuarios'))
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <Container fluid='true'>
            <ToastContainer />
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
                        value={nome}
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
                    <div>Digite a senha:</div>

                    <input className="senhaUsuario" type="password"
                        placeholder="Digite a senha"
                        onChange={handleSenhaChange}
                        value={senha}
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Repita a senha:</div>

                    <input className="senhaUsuario" type="password"
                        placeholder="Repita a senha"
                        onChange={handleSenha2Change}
                        value={senha2}
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Selecione o tipo de usuário:</div>

                    <select onChange={handleTipoChange} value={tipo}>
                        <option defaultValue='Caixa' value="Unidade">Caixa</option>
                        <option value="Administrativo">Administrativo</option>
                    </select>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    {!id && (
                        <button onClick={() => {
                            novoUsuario(nome, login, senha, senha2, tipo)
                            // console.log('novo', id)
                        }}>
                            Salvar
                        </button>
                    )}
                    {id && (
                        <button onClick={() => {
                            alteraUsuario(id, nome, login, senha, senha2, tipo)
                            console.log('editado', id, nome, login, senha, senha2, tipo)
                        }}>
                            Salvar
                        </button>
                    )}

                    <button onClick={() => window.location.href = "/cadastros/usuarios"}>Voltar</button>
                </Col>
            </Row>
        </Container>
    )
}

export default CadUsuario