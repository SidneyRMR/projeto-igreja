import { Table } from "react-bootstrap";
import { useState, useEffect } from "react"
import axios from "axios"

export default function TabelaProdutosVendidos() {

    const [vendasProdutos, setVendasProdutos] = useState([])
    useEffect(() => {
        const getVendasProdutos = async () => {
            try {
                const res = await axios.get("http://localhost:8800/vendasprodutos")
                setVendasProdutos(res.data)
            } catch (error) {
                console.error(error)
            }
        };
        getVendasProdutos();
    }, [vendasProdutos]);
    
    return (
        <>
            <Table className="tabela" striped bordered hover>
                <thead>
                    <tr>
                        {/* Esta tabela deve mostrar a somatoria dos valores de cada pedido feito pelo caixa */}
                        <th width='10%'>ID venda</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th width='10%'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {vendasProdutos.map((vendaPgto, i) => (
                         <tr key={vendaPgto.id_venda_produto} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                            <td>{vendaPgto.id_venda} </td>
                            <td>{vendaPgto.id_produto} - Criar VW para mostrar o nome a partir do id do produto</td>
                            <td>{vendaPgto.qtde_venda_produto}</td>
                            <td><button className="botao" onClick={() => window.location.href = "/detalhe-caixa"}>Detalhes</button></td>
                        </tr>
                ))}
                </tbody>
            </Table>
        </>
    )
}