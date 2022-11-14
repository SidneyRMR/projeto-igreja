// import aCaixas from '../data/caixas';
// import { useNavigate } from "react-router-dom";

const FechamentoCaixa = () => {

    // const abertura = idAbertura

    return (
        <div id='tabelasCentralizadas'>
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
                    <td><label id='idAbertura' className='fechCaixa' type="text" /></td>
                    <td><label id='idSangria' className='fechCaixa' type="text" /></td>
                    <td><label id='idDebito' className='fechCaixa' type="text" /></td>
                    <td><label id='idCredito' className='fechCaixa' type="text" /></td>
                    <td><label id='idDinheiro' className='fechCaixa' type="text" /></td>
                    <td><label id='idPix' className='fechCaixa' type="text" /></td>
                    <td><label id='idTotVenda' className='fechCaixa' type="text" /></td>
                    <td><label id='idTotCaixa' className='fechCaixa' type="text" /></td> 
                    <td><label id='idstatus' className='statusCaixa' type="text" /></td> 
                </tr>
                </tbody>
            </table>
            <a id='fechar' href="/">Fechar Cx</a>
            <a id='voltar' href="/vendas">Voltar</a>
        </div>
    )
}

export default FechamentoCaixa