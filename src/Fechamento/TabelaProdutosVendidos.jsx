import { Table } from "react-bootstrap";
import { useState, useEffect } from "react"
import axios from "axios"
import DetalheCaixa from './DetalheCaixa'

export default function TabelaProdutosVendidos() {

    const caixa = (JSON.parse(sessionStorage.getItem('caixa')))
    const [vendas, setVendas] = useState([])
    useEffect(() => {
        const getVendas = async () => {
            try {
                const res = await axios.get("http://localhost:8800/vendas")
                setVendas(res.data.filter(item => item.id_caixa === caixa.id_caixa).sort((a, b) => (a.id > b.id ? 1 : -1)))
            } catch (error) {
                console.error(error)
            }
        };
        getVendas();
    });

    
    
    return (
        <>
            <Table className="tabela" striped bordered hover>
                <thead>
                    <tr>
                        {/* Esta tabela deve mostrar a somatoria dos valores de cada pedido feito pelo caixa */}
                        <th width='10%'>Id venda</th>
                        <th>Hora do Pedido</th>
                        <th>Pgto Debito</th>
                        <th>Pgto Crédito</th>
                        <th>Pgto Dinheiro</th>
                        <th>Pgto Pix</th>
                        <th>Valor total</th>
                        <th width='10%'>Ações</th>
                    </tr>
                </thead>
                <tbody className="table-body-scroll" >
                    
                {vendas &&
                vendas.map((venda, i) => (
                         <tr key={venda.id_venda} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                            {/* <td>contador</td> */}
                            <td>{venda.id_venda}</td>
                            <td>{venda.hora_venda}</td>
                            <td>{venda.debito}</td>
                            <td>{venda.credito}</td>
                            <td>{venda.dinheiro}</td>
                            <td>{venda.pix}</td>

                            <td>{venda.debito + venda.credito + venda.dinheiro + venda.pix }</td>
                            
                            <td><DetalheCaixa idVenda={venda.id_venda}/></td>
                        </tr>
                ))}
                </tbody>
            </Table>
        </>
    )
}