import aCaixas from '../data/caixas';
import Table from 'react-bootstrap/Table';

const FechamentoGeral = () => {
    function getCaixas() {
        
        return aCaixas.map((oCaixa, i) => {
           let tvenda = oCaixa.debito + oCaixa.credito + oCaixa.dinheiro + oCaixa.pix - oCaixa.abertura
           let tcaixa = oCaixa.debito + oCaixa.credito + oCaixa.dinheiro + oCaixa.pix - oCaixa.sangria
            return (
                <tr key={i}
                    className={i % 2 === 0 ? 'Par' : 'Impar'} id=''>
                    <td>{oCaixa.caixa}</td>
                    <td>{oCaixa.abertura.toFixed(2).replace('.',',')}</td>
                    <td>{oCaixa.sangria.toFixed(2).replace('.',',')}</td>
                    <td>{oCaixa.debito.toFixed(2).replace('.',',')}</td>
                    <td>{oCaixa.credito.toFixed(2).replace('.',',')}</td>
                    <td>{oCaixa.dinheiro.toFixed(2).replace('.',',')}</td>
                    <td>{oCaixa.pix.toFixed(2).replace('.',',')}</td>
                    <td>{tvenda.toFixed(2).replace('.',',')}</td>
                    <td>{tcaixa.toFixed(2).replace('.',',')}</td>
                    <td>{oCaixa.status}</td>
                    <td><a href="/detalhe-caixa">Detalhes</a></td>
                </tr>
            )
        })
    }

    return (
        <div className='tabelasCentralizadas'>
            <Table>
                <thead>
                    <tr>
                        <th>Caixa</th>
                        <th>Abertura R$</th>
                        <th>Sangria R$</th>
                        <th>Debito R$</th>
                        <th>Credito R$</th>
                        <th>Dinheiro R$</th>
                        <th>Pix R$</th>
                        <th>Total de venda R$</th>
                        <th>Total em caixa R$</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {getCaixas()}
                </tbody>
            </Table>
            <a href="/abertura-caixa">Voltar</a>
        </div>
    )
}

export default FechamentoGeral