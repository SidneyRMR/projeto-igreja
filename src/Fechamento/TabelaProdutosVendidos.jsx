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
                        <th width='10%'>Nº venda</th>
                        <th>Produtos</th>
                        <th>Pgto Debito</th>
                        <th>Pgto Crédito</th>
                        <th>Pgto Dinheiro</th>
                        <th>Pgto Pix</th>
                        <th>Valor total</th>
                        {/* <th width='10%'>Ações</th> */}
                    </tr>
                </thead>
                <tbody className="table-body-scroll" >
                {vendasProdutos.map((venda, i) => (
                         <tr key={venda.id_venda_produto} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                            <td>contador</td>
                            <td>{venda.id_produto} - Criar VW q mostre o array dos produtos</td>
                            <td>{venda.qtde_venda_produto}</td>
                            <td>{venda.qtde_venda_produto}</td>
                            <td>{venda.qtde_venda_produto}</td>
                            <td>{venda.qtde_venda_produto}</td>
                            <td>{venda.qtde_venda_produto}</td>
                            {/* <td><button className="botao" onClick={() => window.location.href = "/detalhe-caixa"}>Detalhes</button></td> */}
                        </tr>
                ))}
                </tbody>
            </Table>
        </>
    )
}