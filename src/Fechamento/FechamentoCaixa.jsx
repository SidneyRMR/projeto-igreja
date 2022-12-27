import { Table } from "react-bootstrap";

const FechamentoCaixa = () => {
    // Recupera o valor do usuario da tela de login
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    return (
        <div>
            <Table className="tabela">
                <thead>
                    <tr>
                        <th>Usuário</th>
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
                    <tr >
                        <td>{usuario.login}</td> {/* este valor deve vir do login */}
                        <td>R$500,00</td>
                        <td>R$200,00</td>
                        <td>R$300,00</td>
                        <td>R$800,00</td>
                        <td>R$100,00</td>
                        <td>R$1200,00</td>
                        <td>R$2900,00</td>
                    </tr>
                </tbody>
            </Table>
            <button onClick={() => {
                window.location.href = "/"
                sessionStorage.removeItem('usuario');
            }}>Fechar Cx</button>
            <button onClick={() => window.location.href = "/vendas"}>Voltar</button>
        </div>
    )
}

export default FechamentoCaixa