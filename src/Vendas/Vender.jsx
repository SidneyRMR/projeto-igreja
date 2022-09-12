import produtos from '../data/produtos'

export default props => {

    function getProdutos() {
        return produtos.map((produto, i) => {
            return (
                <button key={i} 
                        onClick={e => console.log(`Botão de ${produto.nome} funciona!`)}
                        className='produtosVenda'>{produto.nome}<br />
                        R$ {produto.preco.toFixed(2).replace('.', ',')}
                </button>
            )
        })
    }

    return (
        <div>
            <div className="menu">
                <a className="vender" href="/sangria">Sangria</a>
                <a className="vender" href="/cadastros">Cadastros</a>
                <a className="vender" href="/fechamento-geral">Fechamento</a>
                <a className="vender" href="/">Sair</a>
            </div>
            <h1 className="title">Produtos</h1>

            {getProdutos()}
                <a className="vender" href="/vendas/pagamento">Pagamento</a>

        </div>
    )
}