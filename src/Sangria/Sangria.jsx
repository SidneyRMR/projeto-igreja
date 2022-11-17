

const Sangria = () => {
    
    return (
        <div className="borda">
            <br />
            <h1 className="title">Sangria</h1><br />
            <input className="valorSangria" type="text" placeholder="Digite o valor" /><br />
            <textarea className="descricaoSangria" type="text" placeholder="Observação" /><br />        
        
            <a id="sangria" href="/vendas">Efetuar Sangria</a>
            {/* <button onClick={e => abrirCaixa}>Entrar</button> */}
        </div>
    )
}

export default Sangria