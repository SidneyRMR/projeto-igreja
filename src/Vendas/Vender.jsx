import produtos from '../data/produtos'
import produtosVenda from '../data/produtosVenda'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

const Vender = () => {

    // Recupera o valor 'nome' do url passado pela tela de abertura
    const urlParams = new
        URLSearchParams(window.location.search)
    const nome = urlParams.get('nome')

    function getProdutos() {
        return produtos.map((produto, i) => {
            return (
                <button key={i}>{produto.nome}<br /><br />
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                </button>
            )
        })
    }

    function getVendido() {
        return produtosVenda.map((produto, i) => {
            return (
                <tr key={i}>
                    <td><Button>Excluir</Button></td>
                    <td>{produto.itens}</td>
                    <td>{produto.nome}</td>
                    <td>R$ {produto.preco.toFixed(2)}</td>
                    <td>R$ {(produto.itens * produto.preco).toFixed(2)}</td>
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
                return;
            }

            // Fecha o menu
            setIsOpen(false);
        }

        document.addEventListener('click', handleClickOutside);

        // Remove o evento de clique quando o componente é desmontado
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (

        <Table>

            <thead>
                <tr>
             
                    <th className='titleVendas' >Produtos</th>
                    <th className='titleVendas'>Pagamento</th>
                </tr>
                <tr>
                    <th>
                        <span >Nome do Caixa: {nome}</span> {'                '}
                        <span >
                            {/* Exibe o botão de menu */}
                            <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
                            {/* Exibe o menu se o estado isOpen for verdadeiro */}
                            {isOpen && (
                                <ul >
                                    <a href="/sangria">Sangria</a>
                                    <a href="/fechamento-caixa">Fechar Caixa</a>
                                    <a href="/">Sair</a>
                                </ul>
                            )}
                        </span>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {getProdutos()}
                    </td>
                    <td className='tdVenderScroll'>
                        <Table >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Un</th>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getVendido()}
                                <tr id='pagamento'>
                                    <td colSpan={2} ><b>
                                        Total do Pedido:
                                    </b>
                                    </td>
                                    <td colSpan={3} ><b>R$ 100.00</b> </td>
                                </tr>

                            </tbody>
                        </Table>
                        <a className="vender" href="/vendas/pagamento">Pagamento</a>
                    </td>
                </tr>
            </tbody>
        </Table>




    )
}

export default Vender