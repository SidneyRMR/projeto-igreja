import produtos from '../data/produtos'
import { useEffect, useState } from 'react';


const Vender = () => {

    const [produtosVenda, setProdutosVenda] = useState([]);
    // Recupera o valor do usuario da tela de login
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    function addProduto(produto) {
        const produtoExistente = produtosVenda.find((p) => p.nome === produto.nome);
        if (produtoExistente) {
            produtoExistente.quantidade += produto.quantidade;
            setProdutosVenda([...produtosVenda]);
        } else {
            setProdutosVenda([...produtosVenda, produto]);
        }
    }

    function getProdutos() {
        return produtos.map((produto, i) => {
            return (
                <button
                    key={i}
                    onClick={() => addProduto(produto)}
                    className={produto.ehComida === true ? 'ehComida' : 'nEhComida'}
                >
                    <div>
                        {produto.nome} <hr />
                        R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </div>
                </button>
            )
        })
    }

    const [isOpen, setIsOpen] = useState(false);
    // Adiciona um evento de clique fora do menu quando o componente é montado
    useEffect(() => {
        function handleClickOutside(event) {
            // Verifica se o clique foi fora do menu e do botão
            if (event.target.closest('.menu') || event.target.closest('button')) {
                return
            }// Fecha o menu
            setIsOpen(false)
        }
        document.addEventListener('click', handleClickOutside);
        // Remove o evento de clique quando o componente é desmontado
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Nome do Caixa: {usuario.nome}
                    </th>
                    <th >
                        {/* Exibe o botão de menu */}
                        <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
                        {/* Exibe o menu se o estado isOpen for verdadeiro */}
                        {isOpen && (
                            <div >
                                <button onClick={() => window.location.href = "/sangria"}>Sangria</button>
                                <button onClick={() => { window.location.href = "/fechamento-caixa" }}>Fech Caixa</button>
                                <button onClick={() => {
                                    window.location.href = "/"
                                    sessionStorage.removeItem('usuario');
                                }}>Sair</button>
                            </div>
                        )}
                    </th>
                </tr>
                <tr>
                    <th sm={7} className='title'>Produtos</th>
                    <th sm={5} className='title'>Resumo Pedido</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {getProdutos()}
                    </td>
                    <td>
                        <table className='tabela'>
                            <thead>
                                <tr>
                                    <th>Qnde</th>
                                    <th>Descrição</th>
                                    <th>Valor R$</th>
                                    <th>Medida</th>
                                    <th>Total R$</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody className='scrollable-tbody'>
                                {produtosVenda.map((produto, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'Par' : 'Impar'} >
                                        <td>{produto.quantidade}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.preco.toFixed(2)}</td>
                                        <td>{produto.medida.toUpperCase()}</td>
                                        <td>{(produto.quantidade * produto.preco).toFixed(2)}</td>
                                        <td><button>Excluir</button></td>
                                    </tr>))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3}>Total do Pedido:</td>
                                    <td colSpan={2}>R$ 100.00 </td>
                                </tr>
                            </tfoot>
                        </table>
                        <button onClick={() => window.location.href = "/vendas/pagamento"} className="vender" >Pagamento</button>
                    </td>
                </tr>
            </tbody>
        </table>




    )
}

export default Vender