import { useState } from "react";
import { useEffect } from "react";
import { api } from "../services/api";

export default function FuncoesCaixa(props) {
  const { inputAbertura } = props;
  const [nomeBtn, setNomeBtn] = useState("");

  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  useEffect(() => {
  const verificaCaixa = async () => {
    try {
      const res = await api.get("/caixas");
      const caixasAbertosDesteUsuario = res.data.filter(
        caixa =>
          caixa.status_caixa === "Aberto" &&
          caixa.id_usuario === usuario.id_usuario
      );
      // console.log(caixasAbertosDesteUsuario.length)
      if (caixasAbertosDesteUsuario.length > 0) {
        // existe um caixa aberto para este usuário
        setNomeBtn("Abrir caixa");
      } else {
        // não existe caixa aberto para este usuário
        setNomeBtn("Novo caixa");
      }
    } catch (error) {
      console.log(error)
  }}
    verificaCaixa();
  },[setNomeBtn,usuario.id_usuario])

  const abrirCaixa = async () => {
    // Verifica se o valor de abertura foi digitado
    if (isNaN(inputAbertura) || inputAbertura <= 0) {
      alert("Digite um valor para abrir o caixa.");
    } else {
      console.log("Caixa aberto.");
      novoCaixa();
    }
  };

  const novoCaixa = async () => {
    // Define os valores padrão para os parâmetros que faltam
    const id_usuario = usuario.id_usuario;
    const id_festa = 1; // ajustar
    const abertura = +inputAbertura;
    const status_caixa = "Aberto";
    const data_abertura = await dataAtual()
    const hora_abertura = await horaAtual()
    const data_fechamento = '0000-00-00'
    // console.log(data_fechamento,data_abertura,hora_abertura,id_festa,id_usuario,status_caixa,abertura);
    // Cria o novo caixa
    try {
      await api.post("/caixas", {
        id_usuario,
        id_festa,
        abertura,
        status_caixa,
        data_abertura,
        hora_abertura,
        data_fechamento,
      });
      // console.log(data_fechamento,data_abertura,hora_abertura,id_festa,id_usuario,status_caixa,abertura);
      acessarVendas();
    } catch (error) {
      console.log(error);
    }
  };

  const fecharCaixa = async (id_caixa, objCaixa) => {
    if (objCaixa.status_caixa === "Fechado") {
      alert("O Caixa já está fechado.");
    } else if (objCaixa.status_caixa === "Aberto") {
      alert(
        "O usuário do caixa precisa fazer o lançamento dos valores de fechamento."
      );
    } else {
      if (window.confirm("Tem certeza que deseja fechar o caixa?")) {
        // alterações
        // iguais
        const id_usuario = objCaixa.id_usuario;
        const id_festa = objCaixa.id_festa;
        const abertura = objCaixa.abertura;
        const status_caixa = "Fechado";
        const data_abertura = objCaixa.data_abertura;
        const hora_abertura = objCaixa.hora_abertura;
        const data_fechamento = await dataAtual();
        try {
          const res = await api.put(`/caixas/${id_caixa}`, {
            id_caixa,
            id_usuario,
            id_festa,
            abertura,
            status_caixa,
            data_abertura,
            hora_abertura,
            data_fechamento,
          });
          props.atualizar()
          console.log(`Caixa ${id_caixa} atualizado para ${status_caixa}.`);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const fecharParcial = async (id_caixa, objCaixa) => {
    if (objCaixa.status_caixa === "Fechado") {
      alert("O Caixa já está fechado.");
    } else {
      if (window.confirm("Tem certeza que deseja fechar o caixa?")) {
        // alterações
        const status_caixa = "Fechamento parcial";     
        const data_fechamento = '0000-00-00'
        // iguais
        const abertura = objCaixa.abertura;
        const data_abertura = objCaixa.data_abertura;
        const hora_abertura = objCaixa.hora_abertura;
        const id_festa = objCaixa.id_festa;
        const id_usuario = objCaixa.id_usuario;
        try {
          const res = await api.put(`/caixas/${id_caixa}`, {
            id_caixa,
            id_usuario,
            id_festa,
            abertura,
            status_caixa,
            data_abertura,
            hora_abertura,
            data_fechamento,
          });
          console.log(`Caixa ${id_caixa} atualizado para ${status_caixa}.`);
          sessionStorage.removeItem("caixa");
          alert("Caixa fechado com sucesso.");
          window.location.href = "/gerenciamento";
          return res.data;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // Funções auxiliares
  // const caixaMaisRecente = async (val) => {
  //     const res = await api.get('/caixas');
  //     const caixasAbertosDesteUsuario = res.data.filter(caixa => caixa.status_caixa === 'Aberto' && caixa.id_usuario === usuario.id_usuario);
  //     const caixasAbertosClassificados = caixasAbertosDesteUsuario.sort((a, b) => b.id_caixa - a.id_caixa)
  //     return caixasAbertosClassificados[val];
  // }

  const dataAtual = () => {
    // Obtém a data atual
    let dataAtual = new Date().toISOString().substring(0, 10);
    return `${dataAtual.toString()}`;
  };
  const horaAtual = () => {
    // Obtém a hora atual
    let horaAtual = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    if (horaAtual.charAt(0) === "0") {
      horaAtual = horaAtual.replace("0", "00");
    }
    return `${horaAtual.toString()}`;
  };

  const acessarVendas = () => {
    window.location.href = "/vendas";
  };

  return (
    // Componente FuncoesCaixa
    <>
      {props.valor === "abrirCaixa" && nomeBtn === "Abrir caixa" && (
        <button className="botao" onClick={() => acessarVendas()}>
          {nomeBtn}
        </button>
      )}
      {props.valor === "abrirCaixa" && nomeBtn === "Novo caixa" && (
        <button className="botao" onClick={() => abrirCaixa()}>
          {nomeBtn}
        </button>
      )}
      {props.valor === "fecharCaixa" && (
        <button
          className="botao"
          onClick={() => fecharCaixa(props.id, props.caixa)}
        >
          {props.nomeBtn}
        </button>
      )}
      {props.valor === "fecharParcialCaixa" && (
        <button
          className={props.classNameProps}
          onClick={() => fecharParcial(props.id, props.caixa)}
        >
          {props.nomeBtn}
        </button>
      )}
    </>
  );
}
