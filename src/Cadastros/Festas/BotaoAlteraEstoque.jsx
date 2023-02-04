import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

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
      return res.data((window.location.href = `/cadastros/festas/estoque/?id=${props.id_festa}&nome=${props.nomeFesta}`));
    } catch (error) {
      toast.error(error);
    }
  };
  const alteraEstoque = async () => {
    try {
      const res = await api.put(`/estoque/${props.id_estoque}`, {
        id_estoque: props.id_estoque,
        id_festa: props.id_festa,
        id_produto: props.id_produto,
        qtde_vendida: props.qtdeVendida ? props.qtdeVendida: 0,
        qtde_estoque: props.alteraEstoque,
      });
      toast.success(`${res.data} salvo com sucesso.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return res.data((window.location.href = `/cadastros/festas/estoque/?id=${props.id_festa}&nome=${props.nomeFesta}`));
    } catch (error) {
      toast.error(error);
    }
  };

  const [estoqueFesta, setEstoqueFesta] = useState([]);
  const getEstoqueFesta = async () => {
    try {
      const res = await api.get("/estoque");
      setEstoqueFesta(res.data)
      
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getEstoqueFesta();
  }, [setEstoqueFesta]);
  // Chame a função `getEstoqueFesta` com o id da festa apropriada

  // conferido, valores estao chegando aqui
  console.log('idestoque',props.id_estoque)
  console.log('idfesta',props.id_festa)
  console.log('id_produto',props.id_produto)
  console.log('qtdeVendida',props.qtdeVendida)
  console.log('alteraEstoque',props.alteraEstoque)
  console.log('nomefesta',props.nomeFesta)

  const festaEncontrada = estoqueFesta.find(festa => festa.id_produto === +props.id_produto && festa.id_festa === +props.id_festa);
  console.log(festaEncontrada ? festaEncontrada: 'festa não encontrada')
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
          onClick={() => {
            const festaEncontrada = estoqueFesta.find(festa => festa.id_produto === +props.id_produto && festa.id_festa === +props.id_festa);
            console.log(festaEncontrada ? festaEncontrada: 'festa não encontrada')
            if (festaEncontrada) {
              alteraEstoque();
            } else {
              novoEstoque();
            }
          }}
          
      >
        {props.nomeBtn}
      </button>
    </>
  );
}
