import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CadFesta from "./CadFesta";

const Festas = (props) => {
  // const [isModalFestaOpen, setIsModalFestaOpen] = useState(false)
  // Este trecho busca os Festas no BD e seta os valores na const Festas
  const [festas, setFestas] = useState([]);
  console.log(festas);
  const getFestas = async () => {
    try {
      const res = await api.get("/festas");
      setFestas(res.data.sort((a, b) => (a.id_festa > b.id_festa ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getFestas();
  }, [setFestas]);
  // fim do trecho

  const alteraFesta = async (
    id_festa,
    nome_festa,
    data_inicio,
    data_termino
  ) => {
    if (!id_festa || !data_inicio) {
      toast.error("Todos os campos devem estar preenchidos!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (window.confirm("Tem certeza de que deseja fechar este caixa?")) {
      try {
        const res = await api.put(`/festas/${id_festa}`, {
          id_festa,
          nome_festa,
          data_inicio,
          data_termino,
        });
        toast.success(`${res.data} alterado com sucesso`, {
          position: toast.POSITION.TOP_CENTER,
        });
        return res.data (window.location.href = "/cadastros/festas");
      } catch (error) {
        toast.error(error);
      }
    }
  };
  // Esta funcionando
  // const handleDelete = async (id_festa, nome_festa) => {
  //     if (window.confirm('Tem certeza de que deseja excluir este item?')) {
  //       await api
  //         .delete('/festas/' + id_festa)
  //         .then(({ data }) => {
  //           const newArray = festas.filter((festa) => festa.id_festa !== id_festa)
  //           setFestas(newArray)
  //           toast.success(`${nome_festa} excluído com sucesso`, {
  //             position: toast.POSITION.TOP_CENTER
  //           })})
  //         .catch(({ data }) => toast.error(data))
  //     }
  //   }

  const dataAtual = () => {
    // Obtém a data atual
    let dataAtual = new Date().toISOString().substring(0, 10);
    return `${dataAtual}`;
  };

  const openModal = () => {
    props.setIsModalFestaOpen(true);
  };

  return (
    <div>
      <ToastContainer />
      <div className="title d-flex justify-content-between ">
        <button
          className="botao botaoTitle"
          onClick={() => (window.location.href = `/abertura-caixa`)}
        >
          Voltar
        </button>
        Lista de Festas
        {/* <button className="botao botaoTitle" onClick={() => window.location.href = `/cadastros/festas/cadfesta`}>Novo</button> */}
        <CadFesta openModal={openModal} />
      </div>
      <Table className="tabela align-center">
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Descrição</th>
            <th>Data de início</th>
            <th>Data de término</th>
            <th>Status</th>
            <th width="25%">Ação</th>
          </tr>
        </thead>
        <tbody>
          {festas.map((festa, i) => {
            return (
              <tr
                key={festa.id_festa}
                className={i % 2 === 0 ? "Par" : "Impar"}
              >
                {/* <td >{festa.id}</td> */}
                <td>{festa.nome_festa}</td>
                <td>{festa.data_inicio.slice(0, 10)}</td>
                <td>
                  {festa.data_termino.slice(8, 10) !== 0
                    ? festa.data_termino.slice(0, 10)
                    : "-"}
                </td>
                <td
                  className={
                    +festa.data_termino.slice(8, 10) !== 0
                      ? "fechado"
                      : "aberto"
                  }
                >
                  {+festa.data_termino.slice(8, 10) !== 0
                    ? "Encerrada"
                    : "Aberta"}
                </td>
                <td>
                  {+festa.data_termino.slice(8, 10) === 0 ? (
                    <button
                      className="botao w-100"
                      onClick={() =>
                        alteraFesta(
                          festa.id_festa,
                          festa.nome_festa,
                          festa.data_inicio,
                          dataAtual()
                        )
                      }
                    >
                      Encerrar Festa
                    </button>
                  ) : (
                    "Nenhuma ação disponível"
                  )}
                  {
                    // <button className='botao' onClick={() => handleDelete(festa.id_festa, festa.nome_festa)}>Excluir</button>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Festas;
