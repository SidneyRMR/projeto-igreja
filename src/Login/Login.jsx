import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import diocese from "../img/diocese.png"
import { Container, Row, Col } from 'react-bootstrap'

const Login = ({ props }) => {

    const [usuarios, setUsuarios] = useState([])
    // const [onEdit, setonEdit] = useState(null)

    const getusuarios = async () => {
        try{
            const res = await axios.get("http://localhost:8800/usuarios")
            setUsuarios(res.data.sort((a,b) => (a.id > b.id ? 1 : -1)))
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getusuarios()
    }, [setUsuarios])

    function testLogin(uss, pass) {
        // Verifica se o usuário e senha digitados estão presentes na lista de usuários
        const usuarioEncontrado = usuarios.find(usuario => usuario.login === uss && usuario.senha === pass)

        if (usuarioEncontrado) {
            // Se o usuário e senha forem válidos, redireciona para a página de abertura de caixa
            // if (props.efetuarLogin) {
                props.efetuarLogin()
            // }
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
        <Container fluid='true'>
            <form action='' method="get">

           
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
                <Col>
                    <button onClick={() => testLogin(user, password)}>Entrar</button>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <img src={diocese} alt="" sizes="500x300" />
                </Col>
            </Row>
            </form>
        </Container>

    )
}

export default Login
