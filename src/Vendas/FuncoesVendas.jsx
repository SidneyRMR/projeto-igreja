import { api } from "../services/api";

export default function FuncoesVendas(props) {
  const caixa = JSON.parse(sessionStorage.getItem("caixa"));

  const verificaValoresParaNovaVenda = async () => {
    // console.log(+props.propsDebito, +props.propsCredito, +props.propsDinheiro, +props.propsPix)
    // console.log('Resumo dos produtos', props.resumoPedido)
    const totalPago =
      +props.propsDebito +
      +props.propsCredito +
      +props.propsDinheiro +
      +props.propsPix;
    // console.log('Preço dos produtos:', props.precoTotalDosProdutos)
    // console.log('Total pago pelo cliente ', totalPago)

    const totaldoTroco = totalPago - props.precoTotalDosProdutos
    console.log(totaldoTroco)
    const temTroco = props.precoTotalDosProdutos < totalPago
    if (temTroco) {
      novaVenda(props.resumoPedido, temTroco, totalPago, totaldoTroco)

      // mandar pedido para impressora
      props.resumoPedido.map((produto) => {
        return console.log('Ficha: ',produto.nome)
    })

      //caso valor pago for menor
    } else if (props.precoTotalDosProdutos > totalPago) {
      //inverti os sinal para mostrar o valor positivo
      alert(`Esta faltando pagar R$ ${(-totalPago + props.precoTotalDosProdutos)
        .toFixed(2)
        .replace(".", ",")}.
Por favor, conclua o pagamento antes de continuar.')
            `);
    } else if (+totalPago === +props.precoTotalDosProdutos) {
      novaVenda(props.resumoPedido, temTroco, totalPago, totaldoTroco);
      
      // mandar pedido para impressora
      props.resumoPedido.map((produto) => {
        return console.log(produto.nome)
      })

    }
  };

  //função para buscar o id_venda criado e retornar para criar a lista de produtos
  // const [ultimaVenda, setUltimaVenda] = useState(0)
  const getIdVenda = async () => {
    try {
      const res = await api.get("/vendas");
      return res.data
        .filter((venda) => venda.id_caixa === caixa.id_caixa)
        .sort((a, b) => (a.id_venda < b.id_venda ? 1 : -1))[0].id_venda;
    } catch (error) {
      console.log(error);
    }
  };

  //ao clicar em pagamento, eu crio uma noa venda, e apos criada a nova venda eu chamo, uma função que salva os produtos no BD
  const novaVenda = async (listaProdutos, temTrocoo, totalPagoo, totaldoTrocoo) => {
    // Define os valores padrão para os parâmetros que faltam
    const id_caixa = caixa.id_caixa;
    const hora_venda = await horaAtual();
    const debito = +props.propsDebito;
    const credito = +props.propsCredito
    /// verific
    const dinheiro = totaldoTrocoo >= 0 ? +props.propsDinheiro - totaldoTrocoo : -props.propsDinheiro
    // console.log(dinheiro)
    const pix = +props.propsPix;
    // console.log('ID:',id_caixa,'| hora',hora_venda,'| debito',debito,'| credito',credito,'| dinheiro',dinheiro,'| pix:',pix)
    // Cria o nova venda no BD
    if(temTrocoo && !debito && !credito && !pix) {
      props.fechaModal();
        alert(`Pedido feito com sucesso!
        Devolva o troco de R$ ${totalPagoo - props.precoTotalDosProdutos}`)
      } else if(!temTrocoo) {
        alert(`Pedido feito com sucesso!`)
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



      
    } catch (error) {
      console.log(error);
    }
  };

  //salva produtos no BD
  const salvaProdutosBD = async (produtos) => {
    produtos.map(async (produto) => {
      const id_produto = produto.id_produto;
      const nome = produto.nome;
      const medida = produto.medida;
      const preco = produto.preco;
      const qtde_venda_produto = produto.qnde;
      const id_venda = await getIdVenda();

      // console.log('id_prod:',id_produto,'| medida:',medida,'| nome:',nome,'| id_venda',id_venda,'| qtde:',qtde_venda_produto,'| preco:',preco)
      try {
        await api.post("/vendasprodutos", {
          id_produto,
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

  return (
    <>
      <button
        type="button"
        className="botao w-100"
        onClick={() => verificaValoresParaNovaVenda()}
      >
        {props.nomeBtn}
      </button>
    </>
  );
}
