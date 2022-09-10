import diocese from "../img/diocese.png"
import { useNavigate } from "react-router-dom";

// function verificarLogin(){
//     const navigate = useNavigate();
    
//     if  ((document.getElementsByClassName("user").value == "rafa") ){
//             alert('passou!')
//         } else {
//             alert('tem algo errado')
//             navigate('/home', {user: document.getElementsByClassName("user").value});
//         }
// }

export default props => {




    return (
        <div className="borda">
            <img src={diocese} alt="" sizes="500x300" />
            <br />
            <h1 className="">Paróquia Santa Cruz</h1>
            <input className="user" type="text" placeholder="Usuário" /><br />
            <input className="password" type="password" placeholder="Senha" /><br />
            <input id="enter" type="button" value="Entrar" onClick={console.log('passei')}/>
            <a href="/abertura-caixa">Entrar</a>
        </div>
    )
}