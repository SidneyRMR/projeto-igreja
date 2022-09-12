
import Table from 'react-bootstrap/table';
import aCaixas from '../data/caixas';
import { useNavigate } from "react-router-dom";

export default function (props) {
    function getCaixas() {
        return aCaixas.map((oCaixa, i) => {
            return (
                <tr key={i}
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
                    <td><a href="/fechamento-geral">Detalhes</a></td>
                </tr>
            )
        })
    }

    return (
        <div className='tabela'>
            <table>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {getCaixas()}
                </tbody>
            </table>
            <a href="/vendas">Voltar</a>
        </div>
    )
}