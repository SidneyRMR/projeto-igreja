import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BotaoAlteraEstoque(props) {
  // console.log(props.alteraEstoque)

  // const verificaParaAlterar = () => {
  //   if (props.id_festa !== )
  // }
  const novoEstoque = async () => {
    try {
      const res = await api.post("/estoque", {
        id_festa: props.id_festa,
        id_produto: props.id_produto,
        qtde_vendida: 0,
        qtde_estoque:props.alteraEstoque,
      });
      toast.success(`${res.data} salvo com sucesso.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return res.data((window.location.href = `/cadastros/festas/estoque/?id=${props.id_festa}`));
    } catch (error) {
      toast.error(error);
    }
  };
  const alteraEstoque = async () => {
    try {
      const res = await api.post("/estoque", {
        id_estoque: props.id_estoque,
        id_festa: props.id_festa,
        id_produto: props.id_produto,
        qtde_vendida: props.estoqueFestaAtual,
        qtde_estoque:props.alteraEstoque,
      });
      toast.success(`${res.data} salvo com sucesso.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return res.data((window.location.href = `/cadastros/festas/estoque/?id=${props.id_festa}`));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <button
        type="button"
        disabled={
          props.alteraEstoque <= 0
        }
          
        className={`botao w-100
        ${  props.alteraEstoque <= 0
          ? 'desabilitaBotao' 
          : ''}`}
        onClick={() => (!props.estoqueFestaAtual ? novoEstoque() : alteraEstoque())}
      >
        {props.nomeBtn}
      </button>
    </>
  );
}
