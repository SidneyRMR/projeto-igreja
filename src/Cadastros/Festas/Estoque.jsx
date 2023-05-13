/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import CadEstoqueModal from "./CadEstoqueModal";
import "react-toastify/dist/ReactToastify.css";

export default function TabelaProdutosVendidos() {
  const filtraInput = useRef(null);
  const urlParams = new URLSearchParams(window.location.search);
  const id_festa = urlParams.get("id");
  const nome_festa = urlParams.get("nome");
  
  const [estoqueFesta, setEstoqueFesta] = useState([]);
  const getEstoqueFesta = async () => {
    try {
      const res = await api.get("/estoque");
      setEstoqueFesta(
        res.data
        )
      
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getEstoqueFesta();
  }, [setEstoqueFesta]);
  // Chame a função `getEstoqueFesta` com o id da festa apropriada

  

  // Este trecho busca os produtos no BD e seta os valores na const produtos
  const [produtos, setProdutos] = useState([]);
  const [allProdutos, setAllProdutos] = useState([]);
  // console.log(produtos);
  const getProdutos = async () => {
    try {
      const res = await api.get("/produtos");
      const filtraAtivos = res.data.filter((prod) => prod.ativo === 1);
      // console.log(filtraAtivos);
      setProdutos(
        filtraAtivos.sort((a, b) => {
          if (a.nome.toLowerCase() < b.nome.toLowerCase()) {
            return -1;
          } else if (a.nome.toLowerCase() > b.nome.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      );
      setAllProdutos(
        filtraAtivos.sort((a, b) => {
          if (a.nome.toLowerCase() < b.nome.toLowerCase()) {
            return -1;
          } else if (a.nome.toLowerCase() > b.nome.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      );
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getProdutos();
  }, [setProdutos]);
  // fim do trecho

  function handleFiltroProdutos(event) {
    const inputValue = event.target.value;
    setProdutos(
      allProdutos
        .filter((produto) =>
          produto.nome.toLowerCase().includes(inputValue.toLowerCase())
        )
        .sort((a, b) => {
          if (a.nome.toLowerCase() < b.nome.toLowerCase()) {
            return -1;
          } else if (a.nome.toLowerCase() > b.nome.toLowerCase()) {
            return 1;
          }
          return 0;
        })
        
    );
  }
  useEffect(() => {
    filtraInput.current.focus();
  }, []);

  const [produtosVenda, setProdutosVenda] = useState([])
  useEffect(() => {
      const getProdutosVenda = async () => {
          try {
              const res = await api.get("/vendasprodutos")
              setProdutosVenda(res.data.filter(item => +item.id_festa === +id_festa))
              console.log(res.data.filter(item => +item.id_festa === +id_festa))
              
          } catch (error) {
              console.error(error)
          }
      };
      getProdutosVenda();
  },[produtosVenda]);

  return (
    <>
      <div className="title d-flex justify-content-between ">
        <button
          className="botao botaoTitle"
          onClick={() => (window.location.href = `/cadastros/festas`)}
        >
          Voltar
        </button>
        <span className="centered-element">
          Gerenciamento de Estoque - Festa:{" "}
          <span className="aberto">{nome_festa}</span>
        </span>
      </div>
      <ToastContainer />
      <div>
        <span>Digite o nome do produto: </span>
        <input
          type="text"
          onChange={handleFiltroProdutos}
          className=""
          ref={filtraInput}
        />
      </div>
      <Table className="tabela" striped bordered hover>
        <thead>
          <tr>
            {/* Esta tabela deve mostrar a somatoria dos valores de cada pedido feito pelo caixa */}
            <th>Produto</th>
            {/* <th>idestoque</th> */}
            <th>Qtde vendida</th>
            <th>Qtde estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className="table-body-scroll">
          {produtos &&
            produtos.map((produto, i) => {
              const totalQtdeVendaProduto = produtosVenda.filter((prod) => prod.id_produto === produto.id_produto).reduce((total, produto) => total + produto.qtde_venda_produto, 0);
// console.log(totalQtdeVendaProduto)
              const quantidades = estoqueFesta.find(
                (estoqueVendido) =>
                  +estoqueVendido.id_produto === +produto.id_produto &&
                  +estoqueVendido.id_festa === +id_festa
              );
              // console.log('quantidades: ',quantidades)
              // console.log('Estoquefesta: ',estoqueFesta)
              return (
                <tr key={i} className={i % 2 === 0 ? "Par" : "Impar"}>
                  {/* <td>contador</td> */}
                  <td>{produto.nome}</td>
                  {/* <td>{quantidades ? quantidades.id_estoque : "nada ainda"}</td> */}
                  <td>{totalQtdeVendaProduto ? totalQtdeVendaProduto : "Sem vendas ainda"}</td>
                  <td>{quantidades ? +quantidades.qtde_estoque- +totalQtdeVendaProduto : "Sem estoque ainda"}</td>
                  <td>
                    <CadEstoqueModal
                      id_estoque={quantidades ? quantidades.id_estoque : ""}
                      id_festa={id_festa}
                      id_produto={produto.id_produto}
                      qtde_estoque={quantidades ? quantidades.qtde_estoque : ""}
                      qtdeVendida={quantidades ? quantidades.qtde_vendida : ""}
                      nomeFesta={nome_festa}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
