

const CadProduto = (props) => {
    
    const produto = props.product;
    console.log(produto)
    return (
        <div className="borda">
            <br />
            <h1 className="title">Cadastro de Produto</h1><br />
            <input className="descricaoProduto" type="text" placeholder="Descrição" /><br />
            <input className="valorProduto" type="text" placeholder="Valor" /><br />        
            <div className="tipoProduto" >Selecione o tipo:
                <select className="">
                    <option value="un">Unidade</option>
                    <option value="kg">Quilograma</option>
                </select>
            </div>
            <a id="cadastrar" href="/cadastros/produtos">Cadastrar</a>
            {/* <button onClick={e => abrirCaixa}>Entrar</button> */}
        </div>
    )
}

export default CadProduto