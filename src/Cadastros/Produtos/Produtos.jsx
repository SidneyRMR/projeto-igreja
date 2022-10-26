
// import Table from 'react-bootstrap/Table';
import produtos from '../../data/produtos';

const Produtos = () => {

    function getProdutos() {
        return produtos.map((produto, i) => {
            return (
                <tr key={produto.id}
                    className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    <td >{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>R${(produto.preco).toFixed(2)}</td>
                    <td>{produto.tipo}</td>
                    <td><button >Alterar</button></td>
                </tr>
                  )
                })
            }


        return (
            <div className='tabela'>
            <table>
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
            <a className="cadastrar" href="/cadastros/cadproduto">Cadastrar</a>
            <a className="voltar" href="/vendas">Voltar</a>
            </div>
        )
    }

export default Produtos