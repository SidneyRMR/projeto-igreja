import produtos from '../../data/produtos';

const Produtos = () => {

    function getProdutos() {

        return produtos.map((produto, i) => {
            return (
                <tr key={produto.id}
                    className={i % 2 === 0 ? 'Par' : 'Impar'}
                    product={produto}>
                    <td >{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>R${(produto.preco).toFixed(2)}</td>
                    <td>{produto.tipo}</td>
                    <td><button onClick={() => alterar(produto)}>Alterar</button></td>
                </tr>
            )
        })
    }

    function alterar(produto) {
        window.location.href = `/cadastros/produtos/cadproduto/?id=${produto.id}`;
    }

    return (
        <div  >
            <table className='tabela'>
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Descrição</th>
                        <th>Valor R$</th>
                        <th>Tipo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {getProdutos()}
                </tbody>
            </table>
            <button className="cadastrar" onClick={() => window.location.href = "/cadastros/produtos/cadproduto"}>Cadastrar</button>
            <button className="voltar" onClick={() => window.location.href = "/abertura-caixa"}>Voltar</button>
        </div>
    )
}

export default Produtos