import React, { useState } from "react"
import produtos from "../../data/produtos"

const CadProduto = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = +urlParams.get('id')
    const produto = produtos.find((produto) => produto.id === id)
    console.log(produto)
    // const [nome, setNome] = useState(produto.nome);
    // const [preco, setPreco] = useState(produto.preco);
    // const [tipo, setTipo] = useState(produto.tipo);

    //Função que altera o nome do botão para altera ou cadastrar
    // function nomeBotao() {
    //     if (!nome) {
    //         return 'Cadastrar'
    //     } else {
    //         return 'Alterar'
    //     }
    // }

    // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
    // const handleNomeChange = (event) => {
    //     setNome(event.target.value);
    // };
    // const handlePrecoChange = (event) => {
    //     setPreco(event.target.value);
    // };
    // const handleTipoChange = (event) => {
    //     setTipo(event.target.value);
    // };

    // Função que altera o valor do objeto produto 
    // function atualizarProduto(novoNome, novoPreco, novoTipo) {
    //     setProduto({
    //       nome: novoNome,
    //       preco: novoPreco,
    //       tipo: novoTipo,
    //     });
    //   }

    //   atualizarProduto('Camisa vermelha', 39.99, 'Uma camisa vermelha básica');

    return (
        <form>
            <h1 className="title">Cadastro de Produto</h1>
            <div>
                <span>Digite o nome do produto:</span>
                <input className="nomeProduto" type="text" 
                    placeholder="Nome do produto" 
                    // onChange={handleNomeChange} 
                    // value={nome} 
                    />
            </div>
            <div>
                <span>Digite o valor do produto:</span>
                <input className="valorProduto" type="text" 
                    placeholder="Valor do produto" 
                    // onChange={handlePrecoChange}
                    // value={preco} 
                    />
            </div>
            <div className="tipoProduto" >Selecione o tipo:
                <select 
                        // onChange={handleTipoChange} 
                        // value={tipo}
                        >
                    <option value="un">Unidade</option>
                    <option value="kg">Quilograma</option>
                </select>
            </div>
            <button onClick={() => 
                window.location.href = "/cadastros"
                
            }>Voltar
            </button>
            <button onClick={() => {
                // atualizarProduto(nome, preco, tipo)
                window.location.href = "/cadastros"
                }
            }>
                {/* {nomeBotao()} */}
            </button>
        </form>
    )
}

export default CadProduto