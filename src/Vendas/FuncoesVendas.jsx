import { useEffect } from "react";
import { useState } from "react";
import { api } from "../services/api";

export default function FuncoesVendas(props) {
  const caixa = JSON.parse(sessionStorage.getItem("caixa"));

  const pCredito = +props.propsCredito;
  const pDebito = +props.propsDebito;
  const pDinheiro = +props.propsDinheiro;
  const pPix = +props.propsPix;
  const totalPago = pCredito + pDebito + pDinheiro + pPix;
  const totaldoTroco = totalPago - props.precoTotalDosProdutos;
  const temTroco = props.precoTotalDosProdutos < totalPago;

  const verificaValoresParaNovaVenda = async () => {
    // console.log('tem troco: ',temTroco, totaldoTroco)
    // console.log('total debito: ',pDebito)
    // console.log('total credito: ',pCredito)
    // console.log('total pix: ',pPix)
    // console.log('total dinheiro: ',pDinheiro)
    // console.log('total pago: ',totalPago)

    if (pDinheiro < 0 || pDebito < 0 || pCredito < 0 || pPix < 0) {
      alert("Valores negativos não são permitido.");
    } else if (
      temTroco === true &&
      pDinheiro &&
      !pDebito &&
      !pCredito &&
      !pPix
    ) {
      // alert('venda com troco a vista: OK')
      novaVenda(props.resumoPedido, temTroco, totalPago, totaldoTroco);
    } else if ((pDebito || pCredito || pPix) && +totaldoTroco === 0) {
      // alert('venda nos cartoes ou pix sem troco: OK')
      novaVenda(props.resumoPedido, temTroco, totalPago, totaldoTroco);
    } else if (+props.precoTotalDosProdutos === +pDinheiro) {
      // caso pgto a vista seja igual ao pedido, nao tem troco e abe nova venda
      novaVenda(props.resumoPedido, temTroco, totalPago, totaldoTroco);
    } else if (+props.precoTotalDosProdutos > +pDinheiro) {
      // novaVenda(props.resumoPedido, temTroco, totalPago, totaldoTroco);
      alert("O valor do pagamento deve ser maior que o valor do pedido.");
    } else if (
      temTroco === true &&
      pDinheiro &&
      (pDebito || pCredito || pPix)
    ) {
      alert("Venda que gera troco usando cartões e dinheiro não é permitido.");
    } else if (props.precoTotalDosProdutos > totalPago) {
      //inverti os sinal para mostrar o valor positivo
      alert(`Esta faltando pagar R$ ${(-totalPago + props.precoTotalDosProdutos)
        .toFixed(2)
        .replace(".", ",")}.
Por favor, conclua o pagamento antes de continuar.
            `);
    }
  };
  
  const [idVenda, setIdVenda] = useState()


    const getIdVenda = async () => {
      try {
      const res = await api.get("/vendas");
      setIdVenda(res.data
        .filter((venda) => venda.id_caixa === caixa.id_caixa)
        .sort((a, b) => (a.id_venda < b.id_venda ? 1 : -1))[0].id_venda)
      return (res.data
        .filter((venda) => venda.id_caixa === caixa.id_caixa)
        .sort((a, b) => (a.id_venda < b.id_venda ? 1 : -1))[0].id_venda)
      } catch (error) {
        console.log(error);
      }
    }
  useEffect(() => {
    getIdVenda()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIdVenda, caixa.id_caixa])
  //função para buscar o id_venda criado e retornar para criar a lista de produtos
  // const [ultimaVenda, setUltimaVenda] = useState(0)


  //ao clicar em pagamento, eu crio uma noa venda, e apos criada a nova venda eu chamo, uma função que salva os produtos no BD
  const novaVenda = async (
    listaProdutos,
    temTrocoo,
    totalPagoo,
    totaldoTrocoo
  ) => {
    // Define os valores padrão para os parâmetros que faltam
    const id_caixa = caixa.id_caixa;
    const hora_venda = await horaAtual();
    const debito = +pDebito;
    const credito = +pCredito;
    /// verific
    const dinheiro =
      totaldoTrocoo >= 0 ? +pDinheiro - totaldoTrocoo : -pDinheiro;
    // console.log(dinheiro)
    const pix = +pPix;
    // console.log('ID:',id_caixa,'| hora',hora_venda,'| debito',debito,'| credito',credito,'| dinheiro',dinheiro,'| pix:',pix)
    // Cria o nova venda no BD
    if (temTrocoo) {
      props.fechaModal();
      alert(`Pedido feito com sucesso!
Devolva o troco de R$ ${totalPagoo - props.precoTotalDosProdutos}`);
    } else if (!temTrocoo) {
      alert(`Pedido feito com sucesso!`);
      props.fechaModal();
    }
    try {
      await api.post("/vendas", {
        id_caixa,
        hora_venda,
        debito,
        credito,
        dinheiro,
        pix,
      });
      salvaProdutosBD(listaProdutos); // pass the id_venda to the salvaProdutosBD function
      imprimirPedido();
    } catch (error) {
      console.log(error);
    }
  };

  //salva produtos no BD
  const salvaProdutosBD = async (produtos) => {
    
    produtos.map(async (produto) => {
      const id_produto = produto.id_produto;
      const id_festa = props.id_festa;
      const nome = produto.nome;
      const medida = produto.medida;
      const preco = produto.preco;
      const qtde_venda_produto = produto.qnde;
      const id_venda = await getIdVenda();
      // console.log('id_prod:',id_produto,'| medida:',medida,'| nome:',nome,'| id_venda',id_venda,'| qtde:',qtde_venda_produto,'| preco:',preco)
      try {
        await api.post("/vendasprodutos", {
          id_produto,
          id_festa,
          nome,
          medida,
          preco,
          qtde_venda_produto,
          id_venda,
        });
      } catch (error) {
        console.log(error);
      }
    });
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
    return `${horaAtual}`;
  };


const dataAtual = () => {
  // Obtém a data atual
  let dataAtual = new Date().toISOString().substring(0, 10);
  return `${dataAtual}`;
};



const imprimirPedido = () => {
  props.resumoPedido.forEach((produto) => {
    
    for (let i = 0; i < produto.qnde; i++) {
      const janelaImpressao = window.open('', '', 'left=0,top=0,width=400,height=800,toolbar=1,scrollbars=1 ,status=1')
    janelaImpressao.document.write(`
    <html>
          <div >
            <div class='padrao'>${props.nomeFesta ? props.nomeFesta.toUpperCase() : ''}</div> <span class='padrao'>Ped: ${idVenda}</span>
            <span class='padrao'>Data: ${dataAtual()}</span >   <span class='padrao'>Hora: ${horaAtual()}</span>
            <div class='nome-produto'>${produto.nome ? produto.nome.toUpperCase() : ''}</div>
            <div class='nome-produto'>${produto.preco ? produto.preco.toUpperCase() : ''}</div>
            <div class='padrao'>PARÓQUIA SANTA CRUZ</div>
          </div>
        <style>
          .padrao{
            font-size: 10px;
            padding: 7px
        }
          .nome-produto{
            font-size: 20px;
            padding: 7px
        }
        </style>
        </html>
      `)
      janelaImpressao.document.close();
      janelaImpressao.focus();
      janelaImpressao.print();
      janelaImpressao.close();
      
    }
  })
}


  return (
    <>
      <button
        type="button"
        disabled={
          pDinheiro < 0 ||
          pDebito < 0 ||
          pCredito < 0 ||
          pPix < 0 || // false
          +props.precoTotalDosProdutos > +totalPago || // false
          (temTroco === true && (pDebito || pCredito || pPix))
        }
        className={`botao w-100
        ${
          pDinheiro < 0 ||
          pDebito < 0 ||
          pCredito < 0 ||
          pPix < 0 || // false
          +props.precoTotalDosProdutos > +totalPago || // false
          (temTroco === true && (pDebito || pCredito || pPix))
            ? "desabilitaBotao"
            : ""
        }`}
        onClick={() => verificaValoresParaNovaVenda()}
      >
        {props.nomeBtn}
      </button>
    </>
  );
}
