
import Table from 'react-bootstrap/Table';
import produtos from '../../data/produtos';


export default function(props) {

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
                        <th className='pos'>Posição</th>
                        <th className='des'>Descrição</th>
                        <th className='val'>Valor R$</th>
                        <th className='tip'>Tipo</th>
                        <th className='alt'></th>
                    </tr>
                </thead>
                <tbody>
                    {getProdutos()}
                </tbody>
            </table>
            <a className="voltar" href="/cadastros">Voltar</a>
            </div>
        )
    }