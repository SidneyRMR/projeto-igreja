import axios from "axios"

export default function FuncoesVendas(props) {

    const caixa = (JSON.parse(sessionStorage.getItem('caixa')))

    const verificaValoresParaNovaVenda = async () => {
        console.log(+props.propsDebito, +props.propsCredito, +props.propsDinheiro, +props.propsPix)
        console.log('Resumo dos produtos', props.resumoPedido)
        const totalPago = (+props.propsDebito + +props.propsCredito + +props.propsDinheiro + +props.propsPix)
        // console.log('Preço dos produtos:', props.precoTotalDosProdutos)
        // console.log('Total pago pelo cliente ', totalPago)

        if (props.precoTotalDosProdutos < totalPago) {
            novaVenda()
            alert(`Pedido feito com sucesso!
Devolva o troco de R$ ${totalPago - props.precoTotalDosProdutos}
            `)
            //Fechar modal
            props.fechaModal()
            // chamar q salva produtos no vendas_produtos
            // mandar pedido para impressora

        //caso valor pago for menor
        } else if (props.precoTotalDosProdutos > totalPago) {
            //inverti os sinal para mostrar o valor positivo
            alert(`Esta faltando pagar R$ ${(-totalPago + props.precoTotalDosProdutos).toFixed(2).replace('.', ',')}.
Por favor, conclua o pagamento antes de continuar.')
            `) 
            
        } else if (totalPago === props.precoTotalDosProdutos) {
            novaVenda()
            alert('Pedido feito com sucesso!')
            // chamar função q salva produtos no vendas_produtos
            // mandar pedido para impressora
            
            //Fechar modal
            props.fechaModal()
        }
    }

    const novaVenda = async () => {
        // Define os valores padrão para os parâmetros que faltam
        const id_caixa = caixa.id_caixa
        const hora_venda = await horaAtual()
        const debito = +props.propsDebito
        const credito = +props.propsCredito
        const dinheiro = +props.propsDinheiro
        const pix = +props.propsPix

        console.log('ID:',id_caixa,'| hora',hora_venda,'| debito',debito,'| credito',credito,'| dinheiro',dinheiro,'| pix:',pix)

        // Cria o nova venda no BD
        try {
            await axios.post('http://localhost:8800/vendas', {
                id_caixa,
                hora_venda,
                debito,
                credito,
                dinheiro,
                pix
            });
        } catch (error) {
            console.log(error);
        }
    }

    const horaAtual = () => {
        // Obtém a hora atual
        let horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        if (horaAtual.charAt(0) === '0') {
            horaAtual = horaAtual.replace('0', '00');
        }
        return `${horaAtual}`
    }

    return (
        <>
                <button type='button' className='botao w-100'
                    onClick={() => verificaValoresParaNovaVenda()}>{props.nomeBtn}
                </button>
        </>
    )
}