
import axios from 'axios';

export default function FuncoesCaixa(props) {

    const { inputAbertura } = props

    // let id_caixa = '';
    let id_usuario = ''
    let id_festa = '';
    let abertura = '';
    let sangria = '';
    let data_abertura = '';
    let hora_abertura = '';
    let data_fechamento = '';
    let status_caixa = ''

    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    console.log(usuario)

    async function setCaixaLocal(salvaCaixa) {
        await sessionStorage.setItem('caixa', JSON.stringify(salvaCaixa))
    }

    const abrirCaixa = async () => {
        // Verifica se o valor de abertura foi digitado
        if (isNaN(inputAbertura) || inputAbertura <= 0) {
            window.confirm('Digite um valor para abrir o caixa.');
        } else {
            const res = await axios.get('http://localhost:8800/caixas');
            const caixasAbertosDesteUsuario = res.data.filter(caixa => caixa.status_caixa === 'Aberto' && caixa.id_usuario === usuario.id_usuario);

            if (caixasAbertosDesteUsuario.length === 0) {
                novoCaixa()
                acessarVendas()
            } else
                if (caixasAbertosDesteUsuario.length > 0) {

                    const acessarCaixaAberto = window.confirm(
                        `Você possui um caixa aberto! 
    Clique em OK para acessá-lo, ou Cancelar para abrir um novo.`
                    );
                    if (acessarCaixaAberto) {

                        const caixa = await caixaMaisRecente(0)
                        setCaixaLocal(caixa)
                        console.log('acessarCaixaAberto', caixa)
                        acessarVendas()
                    } else {
                        novoCaixa()
                        console.log('Novo caixa criado!')
                        acessarVendas()
                    }
                };
        }
    }

    const novoCaixa = async () => {
        // Define os valores padrão para os parâmetros que faltam
        id_usuario = usuario.id_usuario
        id_festa = 1 // ajustar
        abertura = inputAbertura
        sangria = 0
        status_caixa = 'Aberto'
        data_abertura = await dataAtual()
        hora_abertura = await horaAtual()
        data_fechamento = 0

        // Cria o novo caixa
        try {
            await axios.post('http://localhost:8800/caixas', {
                id_usuario,
                id_festa,
                abertura,
                sangria,
                status_caixa,
                data_abertura,
                hora_abertura,
                data_fechamento
            });

            const caixa = await caixaMaisRecente(0)
            setCaixaLocal(caixa)
            console.log('Novo: ', caixa)

            const caixaAfechar = await caixaMaisRecente(1)
            console.log('À fechar: ', caixaAfechar)

            fecharCaixa(caixaAfechar.id_caixa, caixaAfechar)
        } catch (error) {
            console.log(error);
        }
    }

    //funcionando
    const fecharCaixa = async (id_caixa, objCaixa) => {
        if (objCaixa.status_caixa === 'Fechado') {

            alert('O Caixa já está fechado.');
            return;
        }
        // alterações 
        status_caixa = 'Fechado'
        data_fechamento = await dataAtual()
        // iguais
        abertura = objCaixa.abertura
        sangria = objCaixa.sangria
        data_abertura = objCaixa.data_abertura
        hora_abertura = objCaixa.hora_abertura
        id_festa = objCaixa.id_festa
        id_usuario = objCaixa.id_usuario
        try {
            const res = await axios.put(`http://localhost:8800/caixas/${id_caixa}`, {
                id_caixa,
                id_usuario,
                id_festa,
                abertura,
                sangria,
                status_caixa,
                data_abertura,
                hora_abertura,
                data_fechamento,
            });
            console.log(`Caixa ${id_caixa} atualizado para ${status_caixa}.`);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    // excluir caixa caso nao tiver nenhuma compra ainda
    // const excluiCaixa = async (id_caixa) => {
    //   if (id_caixa) {
    //     await axios
    //       .delete('http://localhost:8800/caixas/' + id_caixa)
    //       .then(({ data }) => {
    //         const newArray = caixas.filter((caixa) => caixa.id_caixa !== id_caixa)
    //         setCaixas(newArray)
    //         console.log(`${nome} excluído com sucesso`)
    //       })
    //       .catch(({ data }) => console.log(data))
    //   }
    // }


    // Funções auxiliares
    const caixaMaisRecente = async (val) => {
        const res = await axios.get('http://localhost:8800/caixas');
        const caixasAbertosDesteUsuario = res.data.filter(caixa => caixa.status_caixa === 'Aberto' && caixa.id_usuario === usuario.id_usuario);
        const caixasAbertosClassificados = caixasAbertosDesteUsuario.sort((a, b) => b.id_caixa - a.id_caixa)
        return caixasAbertosClassificados[val];
    }

    const dataAtual = () => {
        // Obtém a data atual
        let dataAtual = new Date().toISOString().substring(0, 10);
        return `${dataAtual}`
    }
    const horaAtual = () => {
        // Obtém a hora atual
        let horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        if (horaAtual.charAt(0) === '0') {
            horaAtual = horaAtual.replace('0', '00');
        }
        return `${horaAtual}`
    }

    const acessarVendas = async () => {
        window.location.href = '/vendas'
    }

    return (
        // Componente FuncoesCaixa
        <>
            {props.valor === "abrirCaixa" && 
                <button className='botao' onClick={() => abrirCaixa()}>{props.nomeBtn}</button>
            }
            {props.valor === "fecharCaixa" && 
                <button className='botao' onClick={() => fecharCaixa(props.id, props.caixa)}>{props.nomeBtn}</button>
            }
        </>
    )
}