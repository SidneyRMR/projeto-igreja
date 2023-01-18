import axios from 'axios'

export default function FuncoesCaixa(props) {

    const { inputAbertura } = props

    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    // console.log(usuario)

    async function salvaCaixaLocal(salvaCaixa) {
        // await sessionStorage.setItem('caixa', JSON.stringify(salvaCaixa))
    }

    const abrirCaixa = async () => {
        // Verifica se o valor de abertura foi digitado
        if (isNaN(inputAbertura) || inputAbertura <= 0) {
            alert('Digite um valor para abrir o caixa.');
        } else {
            const res = await axios.get('http://localhost:8800/caixas');
            const caixasAbertosDesteUsuario = res.data.filter(caixa => caixa.status_caixa === 'Aberto' && caixa.id_usuario === usuario.id_usuario);

            if (caixasAbertosDesteUsuario.length === 0) {
                //passei este parametro pois preciso verificar dentro da função se terá q fechar o caixa anterior
                novoCaixa(caixasAbertosDesteUsuario.length)
                await acessarVendas()
            } else
                if (caixasAbertosDesteUsuario.length > 0) {

                    const acessarCaixaAberto = window.confirm(
                        `Você possui um caixa aberto! 
    Clique em OK para acessá-lo, ou Cancelar para abrir um novo.`);
                    if (acessarCaixaAberto) {

                        const caixa = await caixaMaisRecente(0)
                        salvaCaixaLocal(caixa)
                        console.log('acessarCaixaAberto', caixa)
                        acessarVendas()
                    } else {
                        novoCaixa(caixasAbertosDesteUsuario.length)
                        console.log('Novo caixa criado!')
                        await acessarVendas()
                    }
                };
        }
    }

    const novoCaixa = async (temCaixaAberto) => {
        // Define os valores padrão para os parâmetros que faltam
        const id_usuario = usuario.id_usuario
        const id_festa = 1 // ajustar
        const abertura = +inputAbertura
        const status_caixa = 'Aberto'
        const data_abertura = await dataAtual()
        const hora_abertura = await horaAtual()
        const data_fechamento = 0

        // Cria o novo caixa
        try {
            await axios.post('http://localhost:8800/caixas', {
                id_usuario,
                id_festa,
                abertura,
                status_caixa,
                data_abertura,
                hora_abertura,
                data_fechamento
            }).then(() => {
                const caixa = caixaMaisRecente(0).then(() => {
                    salvaCaixaLocal(caixa)
                    console.log('Novo: ', caixa)
                    
                    console.log('Qntos caixas abertos: ', temCaixaAberto)
                    // colocar um if para o caso de novo caixa sem caixa antigo
                    if (temCaixaAberto > 0) {
                        const caixaAfechar = caixaMaisRecente(1).then(() => {
                            
                            fecharCaixa(caixaAfechar.id_caixa, caixaAfechar)
                            console.log('À fechar: ', caixaAfechar)
                        })
                        
                    }
                })

            })

        } catch (error) {
            console.log(error);
        }
    }

    const fecharCaixa = async (id_caixa, objCaixa) => {
        if (objCaixa.status_caixa === 'Fechado') {
            alert('O Caixa já está fechado.');
        } else if (objCaixa.status_caixa === 'Aberto') {
            alert('O usuário do caixa precisa fazer o lançamento dos valores de fechamento.')
        } else {
            // alterações 
            const status_caixa = 'Fechado'
            const data_fechamento = await dataAtual()
            // iguais
            const abertura = objCaixa.abertura
            const data_abertura = objCaixa.data_abertura
            const hora_abertura = objCaixa.hora_abertura
            const id_festa = objCaixa.id_festa
            const id_usuario = objCaixa.id_usuario
            try {
                const res = await axios.put(`http://localhost:8800/caixas/${id_caixa}`, {
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
                return res.data;
            } catch (error) {
                console.error(error);
            }
        }
    }

    const fecharParcial = async (id_caixa, objCaixa) => {
        if (objCaixa.status_caixa === 'Fechado') {
            alert('O Caixa já está fechado.');

        } else {
            // alterações 
            const status_caixa = 'Fechamento parcial'
            const data_fechamento = await dataAtual()
            // iguais
            const abertura = objCaixa.abertura
            const data_abertura = objCaixa.data_abertura
            const hora_abertura = objCaixa.hora_abertura
            const id_festa = objCaixa.id_festa
            const id_usuario = objCaixa.id_usuario
            try {
                const res = await axios.put(`http://localhost:8800/caixas/${id_caixa}`, {
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
                sessionStorage.removeItem('caixa');
                alert('Caixa fechado com sucesso.')
                window.location.href = '/abertura-caixa'
                return res.data;
            } catch (error) {
                console.error(error);
            }
        }
    }

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

    const acessarVendas = () => {
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
            {props.valor === "fecharParcialCaixa" &&
            <button className={props.classNameProps} onClick={() => fecharParcial(props.id, props.caixa)}>{props.nomeBtn}</button>
        }
        
        </>
    )
}