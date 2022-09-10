import produtos from '../data/produtos'

export default props => {

    function getProdutos() {
        return produtos.map((produto, i) => {
            return (
                <tr key={produto.id}
                    className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    <td >{produto.nome}
                    {produto.preco}</td>
                </tr>
                  )
                })
            }

    return (
        <div>
            <div className="menu">
                <a className="vender" href="/sangria">Sangria</a>
                <a className="vender" href="/cadastros">Cadastros</a>
                <a className="vender" href="/fechamento-geral">Fechamento</a>
                <a className="vender" href="/vendas/pagamento">Pagamento</a>
                <a className="vender" href="/">Sair</a>
            </div>
                <div>
                    <h1 className="title">Produtos</h1>
                <table>
                    <tbody>
                        {getProdutos()}
                    </tbody>
                </table>
                </div>
        </div>
    )
}