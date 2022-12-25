import produtos from '../data/produtos'
import { useEffect, useState } from 'react';


const Vender = () => {

    

      const [produtosVenda, setProdutosVenda] = useState([]);
      // Recupera o valor do usuario da tela de login
      const usuario = JSON.parse(sessionStorage.getItem('usuario'));
      const valEntrada = JSON.parse(sessionStorage.getItem('valEntrada'));
      
      let [quantidade, setQuantidade] = useState(1)

    // Função principal
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

      function addProduto(prod) {
        const produtoExistente = produtosVenda.find((p) => p.id === prod.id);
        if (produtoExistente) {
            setQuantidade(quantidade += 1)
            setProdutosVenda([...produtosVenda])
        } else {
            setProdutosVenda([...produtosVenda, prod])
        }
    }

    function removeProduto(prod) {
        const produtoExistente = produtosVenda.find((p) => p.id === prod.id);
        if ((produtoExistente) && (quantidade > 0)) {
            setQuantidade(quantidade = quantidade - 1)
          setProdutosVenda([...produtosVenda]);

        }
        if ( (quantidade < 1)) {
            setQuantidade(1)
          setProdutosVenda([]);
        }
        
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

    // function somaTotal() {
    //     return produtosVenda.reduce((acc, cur) => acc + cur.preco, 0)
    // }

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Nome do Caixa: {usuario.nome}
                    </th>
                    <th>
                        Saldo do caixa: {valEntrada.toFixed(2)}
                    </th>
                    <th >
                        <div style={{ position: 'fixed', top: '30px', left: '25px' }}>
                            {/* Exibe o botão de menu */}
                            <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
                            {/* Exibe o menu se o estado isOpen for verdadeiro */}
                            {isOpen && (
                                <div style={{ position: 'fixed', top: '30px', left: '25px'}}>
                                    <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
                                    <button onClick={() => window.location.href = "/sangria"}>Sangria</button>
                                    <button onClick={() => { window.location.href = "/fechamento-caixa" }}>Fech Caixa</button>
                                    <button onClick={() => {
                                        window.location.href = "/"
                                        sessionStorage.removeItem('usuario');
                                        sessionStorage.removeItem('valEntrada');
                                    }}>Sair</button>
                                </div>
                            )}
                        </div>
                    </th>
                </tr>
                <tr>
                    <th className='title'>Produtos</th>
                    <th className='title'>Resumo Pedido</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ position: 'fixed', top: '120px', right: '390px' }}>
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
                                        <td>{quantidade}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.preco.toFixed(2)}</td>
                                        <td>{produto.medida.toUpperCase()}</td>
                                        <td>{(quantidade * produto.preco).toFixed(2)}</td>
                                        <td><button onClick={() => removeProduto(produto)}>Excluir</button></td>
                                    </tr>))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3}>Total do Pedido:</td>
                                    <td colSpan={3}>{}</td>
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