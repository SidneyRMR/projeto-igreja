import { React, useState } from "react"
import produtos from "../../data/produtos"

const CadProduto = () => {

    const urlParams = new
        URLSearchParams(window.location.search)

    // const [todosProdutos, setTodosProdutos] = useState(produtos)
    const [produto, setProduto] = useState()
    produto = produtos.find((produto) => produto.id === urlParams.get('id'))
  

    // Recupera o valor 'nome' do url passado pela tela de abertura
    const [desc, setDesc] = useState(produto.nome)
    const [preco, setPreco] = useState(produto.preco)
    const [tipo, setTipo] = useState(produto.tipo)

    //Função que altera o nome do botão para altera ou cadastrar
    function nomeBotao() {
        if (!desc) {
            return 'Cadastrar'
        } else {
            return 'Alterar'
        }
    }

    // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };
    const handlePrecoChange = (event) => {
        setPreco(event.target.value);
    };
    const handleTipoChange = (event) => {
        setTipo(event.target.value);
    };

    // Função que altera o valor do objeto produto 
    function atualizarProduto(newName, newPrice, newDescription) {
        setProduto({
          nome: newName,
          preco: newPrice,
          tipo: newDescription,
        });
      }

      atualizarProduto('Camisa vermelha', 39.99, 'Uma camisa vermelha básica');

    return (
        <form>
            <h1 className="title">Cadastro de Produto</h1>
            <div>
                <span>Digite o nome do produto:</span>
                <input className="descricaoProduto" type="text" 
                    placeholder="Nome do produto" 
                    onChange={handleDescChange} 
                    value={desc} />
            </div>
            <div>
                <span>Digite o valor do produto:</span>
                <input className="valorProduto" type="text" 
                    placeholder="Valor do produto" 
                    onChange={handlePrecoChange}
                    value={preco} />
            </div>
            <div className="tipoProduto" >Selecione o tipo:
                <select onChange={handleTipoChange} 
                        value={tipo}>
                    <option value="un">Unidade</option>
                    <option value="kg">Quilograma</option>
                </select>
            </div>
            <button onClick={() => window.location.href = "/cadastros/produtos"}>Voltar</button>
            <button id="cadastrar" onClick={() => {
                window.location.href = "/cadastros/produtos"
                atualizarProduto(desc, preco, tipo)
                }
            }>{nomeBotao()}</button>
        </form>
    )
}

export default CadProduto