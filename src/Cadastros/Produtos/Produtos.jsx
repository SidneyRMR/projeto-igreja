import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Produtos = () => {

    // Este trecho busca os produtos no BD e seta os valores na const produtos
    const [produtos, setProdutos] = useState([])
    const getProdutos = async () => {
        try{
            const res = await axios.get("http://localhost:8800/produtos")
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
        window.location.href = `/cadastros/produtos/cadproduto/?id=${produto.id}&nome=${produto.nome}&preco=${produto.preco}&medida=${produto.medida}&tipo=${produto.tipo}`
    }

    // Esta funcionando
    const handleDelete = async (id, nome) => {
        if (window.confirm('Tem certeza de que deseja excluir este item?')) {
          await axios
            .delete('http://localhost:8800/produtos/' + id)
            .then(({ data }) => {
              const newArray = produtos.filter((produto) => produto.id !== id)
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
            <div className='title d-flex justify-content-between p-1' >
                <button className="botao botaoTitle" onClick={() => window.location.href = `/abertura-caixa`}>Voltar</button>
                Lista de Produtos
                <button className="botao botaoTitle" onClick={() => window.location.href = `/cadastros/produtos/cadproduto`}>Novo</button>
            </div>
            <Table className='tabela p-100' >
                <thead>
                    <tr >
                        {/* <th>Id</th> */}
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Medida</th>
                        <th>Tipo</th>
                        <th width='20%'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto, i) => {
            return (
                <tr key={produto.id} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    {/* <td >{produto.id}</td> */}
                    <td>{produto.nome}</td>
                    <td>R${(produto.preco).toFixed(2)}</td>
                    <td>{produto.medida}</td>
                    <td>{produto.tipo}</td>
                    <td>
                        <button className='botao' onClick={() => alterar(produto)}>Alterar</button>
                        <button className='botao' onClick={() => handleDelete(produto.id, produto.nome)}>Excluir</button>
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
  