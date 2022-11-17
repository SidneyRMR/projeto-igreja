// import aCaixas from '../data/caixas';
// import { useNavigate } from "react-router-dom";

const FechamentoCaixa = () => {

    // const abertura = idAbertura

    return (
        <div id='tabelasCentralizadas'>
            <table>
                <thead>
                    <tr align='center'>
                        <th>Caixa</th>
                        <th>Abertura</th>
                        <th>Sangria</th>
                        <th>Debito</th>
                        <th>Credito</th>
                        <th>Dinheiro</th>
                        <th>Pix</th>
                        <th>Total de venda</th>
                    </tr>
                </thead>
                <tbody>
                    <tr align='center'>
                        <td>{'Caixa 1'}</td> {/* este valor deve vir do login */}
                        <td>R$ 500,00</td>
                        <td>R$ 200,00</td>
                        <td>R$ 300,00</td>
                        <td>R$ 800,00</td>
                        <td>R$ 100,00</td>
                        <td>R$ 1200,00</td>
                        <td>R$ 2900,00</td>
                    </tr>
                </tbody>
            </table>
            <a id='fechar' href="/">Fechar Cx</a>
            <a id='voltar' href="/vendas">Voltar</a>
        </div>
    )
}

export default FechamentoCaixa