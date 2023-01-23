import { api } from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Produtos = () => {

    // Este trecho busca os produtos no BD e seta os valores na const produtos
    const [produtos, setProdutos] = useState([])
    console.log(produtos)
    const getProdutos = async () => {
        try{
            const res = await api.get("/produtos")
            setProdutos(res.data.sort((a,b) => (a.id > b.id ? 1 : -1)))
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getProdutos()
    }, [setProdutos])
    // fim do trecho 

    function alterar(produto) {
        window.location.href = `/cadastros/produtos/cadproduto/?id_produto=${produto.id_produto}&nome=${produto.nome}&preco=${produto.preco}&medida=${produto.medida}&tipo=${produto.tipo}`
    }

    // Esta funcionando
    const handleDelete = async (id_produto, nome) => {
        if (window.confirm('Tem certeza de que deseja excluir este item?')) {
          await api
            .delete('/produtos/' + id_produto)
            .then(({ data }) => {
              const newArray = produtos.filter((produto) => produto.id_produto !== id_produto)
              setProdutos(newArray)
              toast.success(`${nome} excluído com sucesso`, {
                position: toast.POSITION.TOP_CENTER
              })})
            .catch(({ data }) => toast.error(data))
        }
      }
      
    return (
        <div  >
            <ToastContainer/>
            <div className='title d-flex justify-content-between ' >
                <button className="botao botaoTitle" onClick={() => window.location.href = `/abertura-caixa`}>Voltar</button>
                Lista de Produtos
                <button className="botao botaoTitle" onClick={() => window.location.href = `/cadastros/produtos/cadproduto`}>Novo</button>
            </div>
            <Table className='tabela align-center' >
                <thead>
                    <tr >
                        {/* <th>Id</th> */}
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Medida</th>
                        <th>Tipo</th>
                        <th width='25%'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto, i) => {
            return (
                <tr key={produto.id_produto} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    {/* <td >{produto.id}</td> */}
                    <td>{produto.nome}</td>
                    <td>R${(produto.preco).toFixed(2)}</td>
                    <td>{produto.medida}</td>
                    <td>{produto.tipo}</td>
                    <td>
                        <button className='botao ' onClick={() => alterar(produto)}>Alterar</button>
                        <button className='botao ' onClick={() => handleDelete(produto.id_produto, produto.nome)}>Excluir</button>
                    </td>
                </tr>
            )
        })}
                </tbody>
            </Table>

        </div>
    )
}

export default Produtos


// criação de tabela de produtos
/* CREATE TABLE tb_produtos (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    medida VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    id_festa INTEGER NOT NULL
    PRIMARY KEY (id)
  ); */
  