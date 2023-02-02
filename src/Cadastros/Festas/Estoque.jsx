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
  console.log(estoqueFesta);
  const getEstoqueFesta = async () => {
    try {
      const res = await api.get("/estoque");
      setEstoqueFesta(
        res.data.festas.filter(
          (estoqueFesta) => estoqueFesta.id_festa !== id_festa
        )
      );
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getEstoqueFesta();
  }, [getEstoqueFesta, setEstoqueFesta]);
  // fim do trecho

      // Este trecho busca os produtos no BD e seta os valores na const produtos
  const [produtos, setProdutos] = useState([]);
  const [allProdutos, setAllProdutos] = useState([]);
  console.log(produtos);
  const getProdutos = async () => {
    try {
      const res = await api.get("/produtos");
      const filtraAtivos = res.data.filter(prod => prod.ativo === 1)
      setProdutos(
        filtraAtivos.sort((a, b) => ((a.nome.toLowerCase() < b.nome.toLowerCase() ? 1 : -1) && (a.ativo === 0) ? 1 : -1))
      );
      setAllProdutos(
        filtraAtivos.sort((a, b) => ((a.nome.toLowerCase() < b.nome.toLowerCase() ? 1 : -1) && (a.ativo === 0) ? 1 : -1))
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
          allProdutos.filter(produto => produto.nome.toLowerCase().includes(inputValue.toLowerCase())).sort((a, b) => ((a.nome.toLowerCase() < b.nome.toLowerCase() ? 1 : -1) && (a.ativo === 0) ? 1 : -1))
        );
      }
      useEffect(() => {
        filtraInput.current.focus();
      }, []);
  return (
    <>
      <div className="title d-flex justify-content-between ">
        <button
          className="botao botaoTitle"
          onClick={() => (window.location.href = `/cadastros/festas`)}
        >
          Voltar
        </button>
        <span className="centered-element">Gerenciamento de estoque da festa: <span className="aberto">{nome_festa}</span></span>
      </div>
      <ToastContainer />
      <div >
        <span>Digite o nome do produto: </span>
        <input type="text" onChange={handleFiltroProdutos} className="" ref={filtraInput}/>
      </div>
      <Table className="tabela" striped bordered hover>
        <thead>
          <tr>
            {/* Esta tabela deve mostrar a somatoria dos valores de cada pedido feito pelo caixa */}
            <th>Produto</th>
            <th>Qtde vendida</th>
            <th>Qtde estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className="table-body-scroll">
          {produtos &&
            produtos.map((produto, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "Par" : "Impar"}
              >
                {/* <td>contador</td> */}
                <td>{produto.nome}</td>
                <td>{produto.qtde_vendida}</td>
                <td>{produto.qtde_estoque}</td>
                <td>
                  <CadEstoqueModal id_produto={produto.id_produto} id_festa={id_festa} estoqueFestaAtual={produto.qtde_estoque} nome={produto.nome}>Alterar estoque</CadEstoqueModal>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
