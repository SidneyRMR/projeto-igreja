import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { api } from "../../services/api";
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
    const novoUsuario = async (nome_usuario, login, senha, senha2, tipo) => {
        if (!nome_usuario || !login || !senha || !senha2 || !tipo) {
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
            const res = await api.post('/usuarios', {
                nome_usuario,
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
    const alteraUsuario = async (id_usuario, nome_usuario, login, tipo) => {
        if (!nome_usuario || !login || !tipo) {
            toast.error('Todos os campos devem estar preenchidos!', {
                position: toast.POSITION.TOP_CENTER,
            })
            return
        }
        try {
            const res = await api.put(`/usuarios/${id_usuario}`, {
                id_usuario,
                nome_usuario,
                login,
                tipo,
            })
            toast.success(`${res.data} alterado com sucesso`, {
                position: toast.POSITION.TOP_CENTER,
            })
            return (res.data, (window.location.href = '/cadastros/usuarios'))
        } catch (error) {
            console.error(error)
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
                        autoComplete='off'
                    />
                </Col>
            </Row>
            <br />
            {!id && (
                <>
                    <Row>
                        <Col>
                            <div>Digite a senha:</div>
                            <input
                                className="senhaUsuario"
                                type="password"
                                placeholder="Digite a senha"
                                onChange={handleSenhaChange}
                                value={senha}
                                autoComplete={false}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <div>Repita a senha:</div>
                            <input
                                className="senhaUsuario"
                                type="password"
                                placeholder="Repita a senha"
                                onChange={handleSenha2Change}
                                value={senha2}
                            />
                        </Col>
                    </Row>
                    <br />
                </>
            )}

            <Row>
                <Col>
                    <div>Selecione o tipo de usuário:</div>

                    <select onChange={handleTipoChange} value={tipo}>
                        <option defaultValue='Caixa' value="Caixa">Caixa</option>
                        <option value="Administrativo">Administrativo</option>
                    </select>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    {(!id && (
                        <button className='botao' onClick={() => {
                            novoUsuario(nome, login, senha, senha2, tipo)
                            // console.log('novo', id)
                        }}>Salvar
                        </button>
                    )) || (id && (
                        <button className='botao' onClick={() => {
                            alteraUsuario(id, nome, login, tipo)
                            // console.log('editado', id, nome, login, tipo)
                        }}>Salvar
                        </button>
                    ))}

                    <button className='botao' onClick={() => window.location.href = "/cadastros/usuarios"}>Voltar</button>
                </Col>
            </Row>
        </Container>
    )
}

export default CadUsuario