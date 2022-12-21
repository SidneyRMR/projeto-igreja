import produtos from '../data/produtos'
import produtosVenda from '../data/produtosVenda'
import { useEffect, useState } from 'react';


const Vender = () => {

    // Recupera o valor do usuario da tela de login
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    function getProdutos() {
        return produtos.map((produto, i) => {
            return (
                <button className={produto.ehComida === true ? 'ehComida' : 'nEhComida'}
                    key={i}>{produto.nome} <hr />
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                </button>
            )
        })
    }

    function getVendido() {
        return produtosVenda.map((produto, i) => {
            return (
                <tr key={i} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    <th>{produto.itens}</th>
                    <th>{produto.nome}</th>
                    <th>{produto.preco.toFixed(2)}</th>
                    <th>{(produto.itens * produto.preco).toFixed(2)}</th>
                    <th><button>Excluir</button></th>
                </tr>
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
            setIsOpen(false);
        }
        document.addEventListener('click', handleClickOutside);
        // Remove o evento de clique quando o componente é desmontado
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


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
                                <button onClick={() => {
                                    window.location.href = "/fechamento-caixa"
                                }}>Fech Caixa</button>
                                <button onClick={() => {
                                    window.location.href = "/"
                                    sessionStorage.removeItem('usuario');
                                }}>Sair</button>
                            </div>
                        )}
                    </th>
                </tr>
                <tr className="justify-content-md-center">
                    <th sm={7} className='title'>Produtos</th>
                    <th sm={5} className='title'>Pagamento</th>
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
                                    <th> # </th>
                                    <th>Un</th>
                                    <th>Descrição</th>
                                    <th>Valor R$</th>
                                    <th>Total R$</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getVendido()}
                            </tbody>
                            <tfoot>
                                <tr id='pagamento'>
                                    <td colSpan={2} ><b>
                                        Total do Pedido:
                                    </b>
                                    </td>
                                    <td colSpan={3} ><b>R$ 100.00</b> </td>
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