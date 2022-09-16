// import aCaixas from '../data/caixas';
// import { useNavigate } from "react-router-dom";

export default function (props) {

    return (
        <div className='tabela'>
            <table>
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
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{'Caixa 1'}</td> {/* este valor deve vir do login */}
                    <td><input id='idAbertura' className='fechCaixa' type="text" /></td>
                    <td><input id='idSangria' className='fechCaixa' type="text" /></td>
                    <td><input id='idDebito' className='fechCaixa' type="text" /></td>
                    <td><input id='idCredito' className='fechCaixa' type="text" /></td>
                    <td><input id='idDinheiro' className='fechCaixa' type="text" /></td>
                    <td><input id='idPix' className='fechCaixa' type="text" /></td>
                    <td><input id='idTotVenda' className='fechCaixa' type="text" /></td>
                    <td><input id='idTotCaixa' className='fechCaixa' type="text" /></td> 
                </tr>
                </tbody>
            </table>
            <a href="/">Lançar Fechamento</a>
            <a href="/vendas">Voltar</a>
        </div>
    )
}