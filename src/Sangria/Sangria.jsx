

const Sangria = () => {
    
    return (
        <div >
            <h1 className="title">Sangria</h1>
            <input className="valorSangria" type="text" placeholder="Digite o valor" />
            <textarea className="descricaoSangria" type="text" placeholder="Observação" />       
        
            <button onClick={() => window.location.href="/vendas"}>Voltar</button>
            <button id="sangria" onClick={() => window.location.href="/vendas"}>Efetuar Sangria</button>
        </div>
    )
}

export default Sangria