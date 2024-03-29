import { api } from "../services/api";
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import diocese from "../img/diocese.png"

const Login = () => {

    const [usuarios, setUsuarios] = useState([])

    const getUsuarios = async () => {
        try{
            const res = await api.get("/usuarios")
            setUsuarios(res.data.sort((a,b) => (a.id_usuario > b.id_usuario ? 1 : -1)))
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getUsuarios()
    }, [setUsuarios])

    
    
    function testLogin(uss, pass) {
        // Verifica se o usuário e senha digitados estão presentes na lista de usuários
        const usuarioEncontrado = usuarios.find(usuario => usuario.login === uss && usuario.senha === pass)
    
        try {
            if (usuarioEncontrado) {
                // Se o usuário e senha forem válidos, redireciona para a página de abertura de caixa
                const {id_usuario, nome_usuario, id_festa, tipo} = usuarioEncontrado;
                sessionStorage.setItem('usuario', JSON.stringify({id_usuario, nome_usuario, id_festa, tipo}));
                // console.log(usuarioEncontrado)
                return window.location.href='/abertura-caixa'
            } else if (!usuarioEncontrado) {
                throw new Error('Usuário ou senha inválidos!')
            } else {
                throw new Error('Verifique sua conexão!')
            }
        } catch (error) {
            console.log(error)
            return toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
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
        <Container fluid='true'>
            <ToastContainer/>
            <Row>
                <Col>
                    <div className="title">Paróquia Santa Cruz</div>
                </Col>
            </Row>
            <br />
            <Row>
                <Col >
                    <div>Insira seu login:</div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input className="user" type="text" placeholder="Login" onChange={handleUserChange} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Insira sua senha:</div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input className="password" type="password" placeholder="Senha" onChange={handlePasswordChange} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col >
                    <button className='botao' onClick={() => testLogin(user, password)}
                        >Fazer Login
                    </button>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <img src={diocese} alt="" sizes="500x300" />
                </Col>
            </Row>
        </Container>

    )
}

export default Login
