
import Table from 'react-bootstrap/Table';
import aProdutos from '../data/produtos';
import aUsuarios from '../data/usuarios';
import aCaixas from '../data/caixas';


export default function (props) {

    function getCaixas() {
        return aCaixas.map((oCaixa, i) => {
            return (
                <tr key={oCaixa.i}
                    className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    <td>{oCaixa.caixa}</td>
                    <td>{oCaixa.abertura}</td>
                    <td>{oCaixa.sangria}</td>
                    <td>{oCaixa.debito}</td>
                    <td>{oCaixa.credito}</td>
                    <td>{oCaixa.dinheiro}</td>
                    <td>{oCaixa.pix}</td>
                    <td>{oCaixa.debito + oCaixa.credito + oCaixa.dinheiro + oCaixa.pix - oCaixa.abertura}</td>
                    <td>{oCaixa.debito + oCaixa.credito + oCaixa.dinheiro + oCaixa.pix - oCaixa.sangria}</td>
                </tr>
            )
        })
    }


    return (
        <div className='borda'>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Caixa</th>
                        <th>Abertura</th>
                        <th>Sangria</th>
                        <th>Debito R$</th>
                        <th>Credito R$</th>
                        <th>Dinheiro R$</th>
                        <th>Pix R$</th>
                        <th>Total de venda</th>
                        <th>Total em caixa</th>
                    </tr>
                </thead>
                <tbody>
                    {getCaixas()}
                </tbody>
            </Table>

        </div>
    )
}