import { Table } from "react-bootstrap";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

const FechamentoCaixa = () => {
    // Recupera o valor do usuario da tela de login
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    // Este trecho busca os caixas no BD e seta os valores na const caixas
    const [caixas, setCaixas] = useState([])
    const getCaixas = async () => {
        try {
            const res = await axios.get("http://localhost:8800/caixas")
            setCaixas(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)))
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getCaixas()
    }, [setCaixas])
    // fim do trecho 
    return (
        <div>

            {/* aqui eu preciso filtrar pelo usuario.id e mostras as informações somente deste caixa   */}
            <ToastContainer/>
            <Table className="tabela">
                <thead>
                    <tr>
                        <th>Usuário</th>
                        <th>Abertura</th>
                        <th>Sangria</th>
                        <th>Data Abertura</th>
                        <th>Data Fechamento</th>
                        <th>Debito</th>
                        <th>Credito</th>
                        <th>Dinheiro</th>
                        <th>Pix</th>
                        <th>Total de venda</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {caixas.map(caixa => (
                        <tr key={caixa.id}>
                            <td>{usuario.nome}</td>
                            <td>{caixa.valorAbertura}</td>
                            <td>{caixa.valorSangria}</td>
                            <td>{caixa.dataHoraAbertura}</td>
                            <td>{caixa.dataHoraFechamento}</td>
                            <td>{caixa.pgDebito}</td>
                            <td>{caixa.pgCredito}</td>
                            <td>{caixa.pgDinheiro}</td>
                            <td>{caixa.pgPix}</td>
                            {/* <td>{caixa.id_festa}</td> */}
                            <td>{caixa.pgDebito+caixa.pgCredito+caixa.pgDinheiro+caixa.pgPix}</td>
                            <td>{caixa.status}</td>
                        </tr>
                        ))}

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