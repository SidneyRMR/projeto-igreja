import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

export default function FuncoesVendas(props) {

  const novaFesta = async (nome_festa) => {
    const festaEncontrado = festas.find((festa) => festa.nome_festa.toLowerCase() === nome_festa.toLowerCase());
    console.log(festaEncontrado);
    console.log(nome_festa);
    if (festaEncontrado) {
      toast.error("Já tem um item com este nome!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (!nome_festa) {
      toast.error("Digite um nome para a festa.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const data_inicio = dataAtual();
    const data_termino = 0;
    try {
      const res = await api.post("/festas", {
        nome_festa,
        data_inicio,
        data_termino,
      });
      toast.success(`${res.data} salvo com sucesso.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return res.data (window.location.href = "/igreja/cadastros/festas");
    } catch (error) {
      toast.error(error);
    }
  };
  const dataAtual = () => {
    // Obtém a data atual
    let dataAtual = new Date().toISOString().substring(0, 10);
    return `${dataAtual}`;
  };

  // Este trecho busca os Festas no BD e seta os valores na const Festas
  const [festas, setFestas] = useState([]);
  console.log(festas);
  const getFestas = async () => {
    try {
      const res = await api.get("/festas");
      setFestas(res.data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getFestas();
  }, [setFestas]);
  // fim do trecho

  return (
    <>
      <ToastContainer />
      <button
        type="button"
        className="botao w-100 "
        onClick={() => novaFesta(props.nomeFesta)}
      >
        {props.nomeBtn}
      </button>
    </>
  );
}
