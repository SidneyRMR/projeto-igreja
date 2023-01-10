
import axios from 'axios';

export default function FuncoesCaixa(props) {

    // let id_caixa = '';
    let id_usuario = ''
    let id_festa = '';
    let abertura = '';
    let sangria = '';
    let data_abertura = '';
    let data_fechamento = '';
    let status_caixa = ''
    
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    console.log(usuario)
    const { inputAbertura } = props

    const abrirCaixa = async () => {
        // Verifica se o valor de abertura foi digitado
        if (isNaN(inputAbertura) || inputAbertura <= 0) {
            window.confirm('Digite um valor para abrir o caixa.');
        } else {
            const res = await axios.get('http://localhost:8800/caixas');
            const caixasAbertosDesteUsuario = res.data.filter(caixa => caixa.status_caixa === 'Aberto' && caixa.id_usuario === usuario.id_usuario);

            if (caixasAbertosDesteUsuario.length === 0) {
                novoCaixa()
                console.log('caixasAbertosDesteUsuario', caixasAbertosDesteUsuario)
                // acessarVendas()
            } else
                if (caixasAbertosDesteUsuario.length > 0) {

                    const acessarCaixaAberto = window.confirm(
                        `Você possui um caixa aberto! 
    Clique em OK para acessá-lo, ou Cancelar para abrir um novo.`
                    );
                    if (acessarCaixaAberto) {

                        const caixa = caixaMaisRecente(caixasAbertosDesteUsuario)
                        sessionStorage.setItem('caixa', JSON.stringify(caixa));
                        console.log('acessarCaixaAberto', caixa)
                        // acessarVendas()
                    } else {
                        novoCaixa()
                        console.log('Novo caixa')
                        // acessarVendas()
                    }
                };
        }
    }



    const novoCaixa = async () => {
        let dataAtual = dataHoraAtual()
        console.log(dataAtual)
        // Define os valores padrão para os parâmetros que faltam
        id_usuario = usuario.id_usuario
        id_festa = 1 // ajustar
        abertura = inputAbertura
        sangria = 0
        status_caixa = 'Aberto'
        data_abertura = dataAtual
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
                data_fechamento
            });
            // const res = await axios.get('http://localhost:8800/caixas');
            // const caixasAbertosDesteUsuario = res.data.filter(caixa => caixa.status_caixa === 'Aberto' && caixa.id_usuario === usuario.id_usuario);
            // console.log(caixasAbertosDesteUsuario)

            // const caixa = caixaMaisRecente(caixasAbertosDesteUsuario)

            // const caixaParaFechar = caixasAbertosDesteUsuario[1]

            // sessionStorage.setItem('caixa', JSON.stringify(caixa));
            // console.log('caixa  novo', caixa.id_caixa)
            // console.log('caixa anterior', caixaParaFechar.id_caixa)
            // fecharCaixa(caixaParaFechar.id_caixa, caixaParaFechar)
        } catch (error) {
            console.log(error);
        }
    }

    //funcionando
    const fecharCaixa = async (id_caixa, caixaParaFechar) => {
        if (!id_caixa) {
            console.error('Não tem este caixa no registro.');
            return;
        }
        console.error('função fecha caixa.');
        // alterações 
        status_caixa = 'Fechado'
        data_fechamento = dataHoraAtual()
        // iguais
        abertura = caixaParaFechar.abertura
        sangria = caixaParaFechar.sangria
        data_abertura = caixaParaFechar.data_abertura
        id_festa = caixaParaFechar.id_festa
        id_usuario = caixaParaFechar.id_usuario
        try {
            const res = await axios.put(`http://localhost:8800/caixas/${id_caixa}`, {
                id_caixa,
                id_usuario,
                id_festa,
                abertura,
                sangria,
                status_caixa,
                data_abertura,
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
    const caixaMaisRecente = (caixasAbertos) => {
        const caixasAbertosClassificados = caixasAbertos.sort((a, b) => b.id_caixa - a.id_caixa)
        return caixasAbertosClassificados[0];
    }

    const dataHoraAtual = () => {
        // Obtém a data e hora atuais
        const dataAtual = new Date().toISOString().substring(0, 10);
        // let horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        // if (horaAtual.charAt(0) === '0') {
        //   horaAtual = horaAtual.replace('0', '00');
        // }
        return `${dataAtual} 
        `;
        // ${horaAtual}
    }

    const acessarVendas = async () => {
        window.location.href = '/vendas'
    }

    return (
        <>
            <button className='botao' onClick={() => abrirCaixa()}>Abrir caixa</button>
        </>
    )
}