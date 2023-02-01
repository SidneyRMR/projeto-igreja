import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";

const Produtos = () => {
  
  const filtraInput = useRef(null);
  // Este trecho busca os produtos no BD e seta os valores na const produtos
  const [produtos, setProdutos] = useState([]);
  const [allProdutos, setAllProdutos] = useState([]);
  console.log(produtos);
  const getProdutos = async () => {
    try {
      const res = await api.get("/produtos");
      setProdutos(
        res.data.sort((a, b) => ((a.nome.toLowerCase() < b.nome.toLowerCase() ? 1 : -1) && (a.ativo === 0) ? 1 : -1))
      );
      setAllProdutos(
        res.data.sort((a, b) => ((a.nome.toLowerCase() < b.nome.toLowerCase() ? 1 : -1) && (a.ativo === 0) ? 1 : -1))
      );
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getProdutos();
  }, [setProdutos]);
  // fim do trecho

  useEffect(() => {
    filtraInput.current.focus();
  }, []);
  // Função que altera um produto existente
  const desativarProduto = async (prod) => {
    try {
      await api.put(`/produtos/${prod.id_produto}`, {
        id_produto: prod.id_produto,
        nome: prod.nome,
        preco: prod.preco,
        medida: prod.medida,
        tipo: prod.tipo,
        ativo: 0,
      });
      toast.success("Produto desativado com sucesso!",{
        position: toast.POSITION.TOP_CENTER,
      });
      getProdutos();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }
  const ativarProduto = async (prod) => {
    try {
      await api.put(`/produtos/${prod.id_produto}`, {
        id_produto: prod.id_produto,
        nome: prod.nome,
        preco: prod.preco,
        medida: prod.medida,
        tipo: prod.tipo,
        ativo: 1,
      });
      toast.success("Produto reativado com sucesso!",{
        position: toast.POSITION.TOP_CENTER,
      });
      getProdutos();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }
  function handleFiltroProdutos(event) {
    const inputValue = event.target.value;
    setProdutos(
      allProdutos.filter(produto => produto.nome.toLowerCase().includes(inputValue.toLowerCase())).sort((a, b) => ((a.ativo === 0) ? 1 : -1))
    );
  }
  
  
  
  

  function alterar(produto) {
    window.location.href = `/cadastros/produtos/cadproduto/?id_produto=${produto.id_produto}&nome=${produto.nome}&preco=${produto.preco}&medida=${produto.medida}&tipo=${produto.tipo}`;
    }  return (
    <div>
      <ToastContainer />
      <div className="title d-flex justify-content-between ">
        <button
          className="botao botaoTitle"
          onClick={() => (window.location.href = `/abertura-caixa`)}
        >
          Voltar
        </button>
        Lista de Produtos
        <button
          className="botao botaoTitle"
          onClick={() =>
            (window.location.href = `/cadastros/produtos/cadproduto`)
          }
        >
          Novo
        </button>
      </div>
      {/* Buscar produtos */}
      <div >
        <span>Digite o nome do produto: </span>
        <input type="text" onChange={handleFiltroProdutos} className="" ref={filtraInput}/>
      </div>
      <Table className="tabela align-center">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Medida</th>
            <th>Tipo</th>
            {/* <th>Ativo</th> */}
            <th width="25%">Ação</th>
          </tr>
        </thead>
        <tbody>
  {produtos.map((produto, i) => {
 
      return (
        <tr
          key={produto.id_produto}
          className={i % 2 === 0 ? "Par" : "Impar"}
        >
          <td>{produto.nome}</td>
          <td>R${produto.preco.toFixed(2)}</td>
          <td>{produto.medida}</td>
          <td>{produto.tipo}</td>
          {/* <td>{produto.ativo }</td> */}
          <td>
            {produto.ativo === 1 ? (
              <>
                <button
                  className="botao"
                  onClick={() => alterar(produto)}
                >
                  Alterar
                </button>
                <button
                  className="botao"
                  onClick={() => desativarProduto(produto)}
                >
                  Desativar
                </button>
              </>
            ) : (
              <button
                className="botao"
                onClick={() => ativarProduto(produto)}
              >
                Ativar
              </button>
            )}
          </td>
        </tr>
      );
  })}
</tbody>

      </Table>
    </div>
  );
};

export default Produtos;

// criação de tabela de produtos
/* CREATE TABLE tb_produtos (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    medida VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  ); */
