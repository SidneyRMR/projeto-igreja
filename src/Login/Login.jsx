import diocese from "../img/diocese.png"
export default props => {

function verificarLogin(){
    if  ((document.getElementsByClassName("user") === "rafa")  && 
        (document.getElementsByClassName("password") ==="teste")){
            
        }
}


    return (
        <>
            <img src={diocese} alt="" sizes="500x300" />
            <br />
            <h1 className="title">Paróquia Santa Cruz</h1>
            <input id="user" type="text" placeholder="Usuário" /><br />
            <input id="password" type="password" placeholder="Senha" /><br />
            <input id="enter" type="button" value="Entrar" onClick={verificarLogin()}/>
            <a href="/abertura-caixa">Entrar</a>
        </>
    )
}