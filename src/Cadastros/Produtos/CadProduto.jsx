

const CadProduto = () => {
    
    return (
        <div className="borda">
            <br />
            <h1 className="">Cadastro de Produto</h1>
            <input className="descricaoProduto" type="text" placeholder="Descrição" /><br />
            <input className="valorProduto" type="text" placeholder="Valor" /><br />        
            <div className="tipoProduto" >Selecione o tipo:
                <select className="">
                    <option value="un">Unidade</option>
                    <option value="kg">Quilograma</option>
                </select>
            </div>
            <a href="/cadastros/produtos">Cadastrar</a>
            {/* <button onClick={e => abrirCaixa}>Entrar</button> */}
        </div>
    )
}

export default CadProduto