import { api } from "../services/api";

export default function FuncoesSangria(props) {

    const saldoCaixa=props.saldoCaixa
    console.log(saldoCaixa)

    const verificarSangria = () => {
        if ((+props.valorSangria) && (props.descricao) && (saldoCaixa > props.valorSangria)) {
            // console.log(props.caixa.id_caixa)
            console.log(saldoCaixa)
            // console.log(props.descricao)
            efetuarSangria()
            alert(`Sangria no valor de R$ ${props.valorSangria} efetuado com sucesso.`)
            props.fechaModalSangria()

        } else if (!props.descricao) {
            alert('Digite o motivo da sangria.')
        } else if (!props.valorSangria) {
            alert('Digite o valor da sangria.')
        } else if ((saldoCaixa < 0) || (saldoCaixa < props.valorSangria)) {
            alert('Desculpe, não é possível efetuar sangrias se o seu caixa estiver vazio ou o valor da sangria for maior do que o saldo em dinheiro.')
        } else {
            alert('Algo deu errado! Por favor entre novamente no programa.')
            window.location.href='/abertura-caixa'
        }
    }

    const efetuarSangria = async () => {
        const id_caixa = props.caixa.id_caixa
        const valorSangria = +props.valorSangria
        const descricao = props.descricao

        // Cria o nova venda no BD
        try {
            await api.post('/sangria', {
                id_caixa,
                valorSangria,
                descricao
            });
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <button type='button' style={{ fontSize: '25px' }} className='botao w-100'
            onClick={() => verificarSangria()}>{props.nomeBtn}
        </button>
    )
}