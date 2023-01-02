import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

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

    function mapearProdutos() {
        return produtos.map((produto, i) => {
            return (
                <tr key={produto.id} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    <td >{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>R${(produto.preco).toFixed(2)}</td>
                    <td>{produto.medida}</td>
                    <td>{produto.tipo}</td>
                    <td>
                        <button onClick={() => alterar(produto)}>Alterar</button>
                        <button onClick={() => handleDelete(produto.id, produto.nome)}>Excluir</button>
                    </td>
                </tr>
            )
        })
    }

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
            <table className='tabela'>
                <thead>
                    <tr >
                        <th>Id</th>
                        <th>Descrição</th>
                        <th>Valor R$</th>
                        <th>Medida</th>
                        <th>Tipo</th>
                        <th width='20%'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {mapearProdutos()}
                </tbody>
            </table>
            <button className="cadastrar" onClick={() => window.location.href = `/cadastros/produtos/cadproduto`}>Cadastrar</button>
            <button className="voltar" onClick={() => window.location.href = `/abertura-caixa`}>Voltar</button>
        </div>
    )
}

export default Produtos