import { Table } from "react-bootstrap";
import { api } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

import FuncoesCaixa from "../AberturaCaixa/FuncoesCaixa";
import ModalDetalheCaixa from "./ModalDetalheCaixa";

const FechamentoGeral = (props) => {
  const [caixasUsuarios, setCaixasUsuarios] = useState([]);

  const getCaixasUsuarios = async () => {
    try {
      const res = await api.get("/caixas");
      
      console.log('recarregando no bd: caixas')
      setCaixasUsuarios(
        res.data.sort((a,b) => ((a.status_caixa === 'Aberto' ? 1 : -1)  &&  (b.status_caixa === 'Fechamento parcial'? 2 : -1)))
        
      );
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getCaixasUsuarios();
  }, [setCaixasUsuarios]);

  const openModal = () => {
    props.setIsModalOpen(true);
  };

  // fazer função ternaria que compare o caixa.id_festa com o festa.id_festa
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/usuarios");
      setUsuarios(response.data);
      console.log('recarregando no bd: usuarios')
    };
    fetchData();
  }, [setUsuarios]);

  const [festas, setFestas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/festas");
      setFestas(response.data);
      
      console.log('recarregando no bd: festas')
    };
    fetchData();
  }, [setFestas]);
  return (
    <div>
      <div className="title d-flex justify-content-between">
        <button
          className="botao botaoTitle "
          onClick={() => (window.location.href = "/abertura-caixa")}
        >
          Voltar
        </button>        
        <span className="centered-element">
            Gestão de Caixas
        </span> 
        <div>{""}</div>
      </div>
      <ToastContainer />
      <Table className="tabela">
        <thead>
          <tr>
            {/* <th>Id caixa</th> */}
            <th>Usuário</th>
            <th>Festa</th>
            <th>Data Abertura</th>
            <th>Hora Abertura</th>
            <th>Data Fechamento</th>
            <th width="18%">Status</th>
            <th colSpan={2} width="20%">Ações</th>
          </tr>
        </thead>

        <tbody>
          {caixasUsuarios.map((caixa, i) => {
            const usuario = usuarios.find(
              (usuario) => caixa.id_usuario === usuario.id_usuario
            );
            const festa = festas.find(
              (festa) => caixa.id_festa === festa.id_festa
            );
            return (
              <tr
                key={caixa.id_caixa}
                className={i % 2 === 0 ? "Par" : "Impar"}
              >
                <td>
                  {usuario ? usuario.nome_usuario : "Usuário não encontrado"}
                </td>
                <td>
                  {festa ? festa.nome_festa : "Festa não encontrada"}
                </td>
                <td>{caixa.data_abertura}</td>
                <td>{caixa.hora_abertura}</td>
                <td>
                    {+caixa.data_fechamento.slice(8, 10) !== 0
                    ? caixa.data_fechamento.slice(0, 10)
                    : "-"}
                </td>
                <td>
                  <div
                    className={
                      caixa.status_caixa === "Fechado"
                        ? "fechado"
                        : caixa.status_caixa === "Aberto"
                        ? "aberto"
                        : "parcial"
                    }
                  >
                    {caixa.status_caixa}
                  </div>
                </td>
                <td>
                  <ModalDetalheCaixa openModal={openModal} caixa={caixa} />
                  {/* {caixa.status_caixa === "Aberto" && (
                    <FuncoesCaixa
                    nomeBtn="Fechar Caixa"
                    valor="fecharCaixa"
                    id={caixa.id_caixa}
                    caixa={caixa}
                    />
                  )} */}
                </td>
                <td>
                  {caixa.status_caixa === "Fechamento parcial" && (
                    <FuncoesCaixa
                      nomeBtn="Fechar Caixa"
                      valor="fecharCaixa"
                      id={caixa.id_caixa}
                      caixa={caixa}
                      atualizar={getCaixasUsuarios}
                    />
                  )}
                  {/* {!caixa.status_caixa === "Fechado" && (
                    <FuncoesCaixa
                      nomeBtn="Fechar Caixa"
                      valor="fecharCaixa"
                      id={caixa.id_caixa}
                      caixa={caixa}
                    />
                  )} */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default FechamentoGeral;
