import diocese from "../img/diocese.png"
import Button from 'react-bootstrap/Button';
const Login = () => {

    return (
        <div className="borda">
            <img src={diocese} alt="" sizes="500x300" />
            <br />
            <h1 className="">Paróquia Santa Cruz</h1>
            <input className="user" type="text" placeholder="Usuário" /><br />
            <input className="password" type="password" placeholder="Senha" /><br />
            <Button href="/abertura-caixa">Entrar</Button>
        </div>
    )
}

export default Login