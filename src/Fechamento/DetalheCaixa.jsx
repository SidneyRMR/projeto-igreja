import { useState, useEffect } from "react"
import { Modal, Table } from "react-bootstrap"
import { api } from "../services/api"

export default function ModalSangria(props) {
    
    const [isModalDetalhesOpen, setIsModalDetalhesOpen] = useState(false)
    
    const openModal = () => {
        setIsModalDetalhesOpen(true)
      }

      //esta certo, não esta aparecendo pois nao tem nada igual com o id venda  pois não esta salvando no banco de dados 
    const [produtosVenda, setProdutosVenda] = useState([])
    useEffect(() => {
        const getProdutosVenda = async () => {
            try {
                const res = await api.get("/vendasprodutos")
                setProdutosVenda(res.data.filter(item => item.id_venda === props.idVenda).sort((a, b) => (a.id_venda_produto  > b.id_venda_produto  ? 1 : -1)))
                //filtra todos os pedidos deste id_venda
                // console.log(res.data.filter(item => item.id_venda === props.idVenda))
                // console.log(produtosVenda)
                
            } catch (error) {
                console.error(error)
            }
        };
        getProdutosVenda();
    });

  
    return (
        <div>
        <button className="botao" onClick={openModal}>Detalhes  </button>

        <Modal show={isModalDetalhesOpen} onHide={() => { setIsModalDetalhesOpen(false) }}>
            <Modal.Header closeButton className="title">
                <Modal.Title className="title">Detalhes da compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Table className="tabela" striped bordered hover>
                <thead>
                    <tr>
                        {/* Esta tabela deve mostrar a somatoria dos valores de cada pedido feito pelo caixa */}
                        <th>Produto</th>
                        <th>Medida</th>
                        <th>Preço</th>
                        <th>Qtde</th>
                    </tr>
                </thead>
                <tbody className="table-body-scroll" >
                {produtosVenda.map((produto, i) => (
                         <tr key={produto.id_venda_produto } className={i % 2 === 0 ? 'Par' : 'Impar'}>
                            <td>{produto.nome}</td>
                            <td>{produto.medida}</td>
                            <td>{(produto.preco).toFixed(2).replace('.', ',')}</td>
                            <td>{produto.qtde_venda_produto}</td>
                        </tr>
                ))}
                </tbody>
            </Table>
            </Modal.Body>
        </Modal>
    </div>
    )
}