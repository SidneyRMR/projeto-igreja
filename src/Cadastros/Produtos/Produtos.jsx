
import { Button } from 'react-bootstrap';
import produtos from '../../data/produtos';
const Produtos = () => {

    function getProdutos() {

        return produtos.map((produto, i) => {
            return (
                <tr key={produto.id}
                    className={i % 2 === 0 ? 'Par' : 'Impar'}
                    product = {produto}>
                    <td >{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>R${(produto.preco).toFixed(2)}</td>
                    <td>{produto.tipo}</td>
                    <td><Button onClick={() => alterar(produto)}>Alterar</Button></td>
                </tr>
                  )
                })
            }
            
            
            function alterar(produto) {
                window.location.href = `/cadastros/cadproduto`;
              }

        return (
            <div className='tabela' id='tabelasCentralizadas'>
            <table >
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
            <a id="cadastrar" href="/cadastros/cadproduto">Cadastrar</a>
            <a id="voltar" href="/abertura-caixa">Voltar</a>
            </div>
        )
    }

export default Produtos