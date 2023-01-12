import { Table } from "react-bootstrap";
import { useState, useEffect } from "react"
import axios from "axios"

export default function TabelaProdutosVendidos(props) {

    const [vendasPgto, setVendasPgto] = useState([])
    useEffect(() => {
        const getVendasPgto = async () => {
            try {
                const res = await axios.get("http://localhost:8800/vendasprodutos")
                setVendasPgto(res.data)
            } catch (error) {
                console.error(error)
            }
        };
        getVendasPgto();
    }, []);
    
    return (
        <>
            <Table className="tabela" striped bordered hover>
                <thead>
                    <tr>
                        <th width='10%'>ID venda</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {vendasPgto.map((vendaPgto, i) => (
                         <tr key={vendaPgto.id_venda_produto} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                            <td>{vendaPgto.id_venda}</td>
                            <td>{vendaPgto.id_produto}</td>
                            <td>{vendaPgto.id_venda}</td>
                            <td><button className="botao">Detalhes</button></td>
                        </tr>
                ))}
                </tbody>
            </Table>
        </>
    )
}