import { api } from "../../services/api";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function FuncoesVendas(props) {
 const novaFesta = async (nome_festa) => {
            if (!nome_festa) {
                toast.error('Digite um nome para a festa.', {
                    position: toast.POSITION.TOP_CENTER,
                })
                return
            }
            const data_inicio = dataAtual()
            const data_termino = 0
            try {
                const res = await api.post('/festas', {
                    nome_festa,
                    data_inicio,
                    data_termino,
                })
                toast.success(`${res.data} salvo com sucesso.`, {
                    position: toast.POSITION.TOP_CENTER,
                })
                return (res.data, (window.location.href = '/cadastros/festas'))
            } catch (error) {
                toast.error(error)
            }
        }
const dataAtual = () => {
            // Obtém a data atual
            let dataAtual = new Date().toISOString().substring(0, 10);
            return `${dataAtual}`
        }

    
    return (
        <>
        <ToastContainer/>
            <button type='button' className='botao w-100 '
                onClick={() => novaFesta(props.nomeFesta)}>{props.nomeBtn}
            </button>
        </>
    )
}