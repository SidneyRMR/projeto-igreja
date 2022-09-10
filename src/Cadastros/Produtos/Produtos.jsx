
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
                    <td>R${produto.preco}</td>
                    <td>{produto.tipo}</td>
                    <td><button >Alterar</button></td>
                </tr>
                  )
                })
            }


        return (
            <div className='borda'>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Descrição</th>
                        <th>Valor R$</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {getProdutos()}
                </tbody>
            </Table>

            </div>
        )
    }