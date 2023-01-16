import axios from "axios"

export default function FuncoesSangria(props) {



    const verificarSangria = () => {
        if ((+props.valorSangria) && (props.descricao)) {
            console.log(props.caixa.id_caixa)
            console.log(props.valorSangria)
            console.log(props.descricao)
            efetuarSangria()
            alert(`Sangria no valor de R$ ${props.valorSangria} efetuado com sucesso.`)
            // Código a ser executado se props.valorSangria é um número válido
        } else {
            alert('Digite um valor válido.')
        }
    }

    const efetuarSangria = async () => {
        const id_caixa = props.caixa.id_caixa
        const valorSangria = +props.valorSangria
        const descricao = props.descricao

        // Cria o nova venda no BD
        try {
            await axios.post('http://localhost:8800/sangria', {
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