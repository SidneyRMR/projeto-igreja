import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

const Produtos = () => {

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

    function mapearProdutos() {

        return produtos.map((produto, i) => {
            return (
                <tr key={produto.id}
                    className={i % 2 === 0 ? 'Par' : 'Impar'}
                    // produto={produto}
                    >
                    <td >{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>R${(produto.preco).toFixed(2)}</td>
                    <td>{produto.tipo}</td>
                    <td>
                        <button onClick={() => alterar(produto)}>Alterar</button>
                        {/* <button onClick={() => handleDelete(produto.id)}>Excluir</button> */}
                    </td>
                </tr>
            )
        })
    }

    function alterar(produto) {

        window.location.href = `/cadastros/produtos/cadproduto/?id=${produto.id}`;
        // console.log(produto)
    }

    return (
        <div  >
            <table className='tabela'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Descrição</th>
                        <th>Valor R$</th>
                        <th>Tipo</th>
                        <th>Ação</th>
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