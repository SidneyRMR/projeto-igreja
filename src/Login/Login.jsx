import diocese from "../img/diocese.png"
export default props => {

    return (
        <div className="borda">
            <img src={diocese} alt="" sizes="500x300" />
            <br />
            <h1 className="">Paróquia Santa Cruz</h1>
            <input className="user" type="text" placeholder="Usuário" /><br />
            <input className="password" type="password" placeholder="Senha" /><br />
            <a href="/abertura-caixa">Entrar</a>
            {/* <button onClick={e => abrirCaixa}>Entrar</button> */}
        </div>
    )
}