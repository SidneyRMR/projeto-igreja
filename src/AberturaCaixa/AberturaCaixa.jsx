import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//falta passar os valores de entrada e nome do caixa para as proximas telas
const AberturaCaixa = () => {
  // Recupera o valor do usuario da tela de login
  // const usuario = sessionStorage.removeItem('usuario');
  // const caixa = sessionStorage.removeItem('caixa');
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));

  // const [caixas, setCaixas] = useState([])

  let valorAbertura = '';
  let valorSangria = '';
  let dataHoraAbertura = '';
  let dataHoraFechamento = '';
  // let id_caixa = '';
  let id_compra = '';
  let id_festa = '';
  let id_usuario = ''
  let status_caixa = ''

  // Este trecho de codigo serve para verificar se os inputs possuem valores válidos
  const [caixaValorEntrada, setCaixaValorEntrada] = useState()
  const handleCaixaValorEntradaChange = (event) => {
    setCaixaValorEntrada(event.target.value);
  }

  // Adiciona um evento de clique fora do menu quando o componente é montado
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      // Verifica se o clique foi fora do menu e do botão
      if (event.target.closest('.menu') || event.target.closest('button')) {
        return;
      }
      // Fecha o menu
      setIsOpen(false);
    }
    document.addEventListener('click', handleClickOutside);

    // Remove o evento de clique quando o componente é desmontado
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // este trecho so mostrará o botão adm caso o usuario tiver for administativo
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    usuario.tipo === 'Administrativo' ? setIsAdmin(true) : setIsAdmin(false);
  }, [usuario.tipo]);


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




  const fechaCaixa = async (id_caixa, caixaParaFechar) => {
    if (!id_caixa) {
      console.error('Não tem este caixa no registro.');
      return;
    }
    // alterações 
      status_caixa = 'Fechado'
      dataHoraFechamento = dataHoraAtual()
    // iguais
      valorAbertura = caixaParaFechar.valorAbertura
      valorSangria = caixaParaFechar.valorSangria
      dataHoraAbertura = caixaParaFechar.dataHoraAbertura
      id_compra = caixaParaFechar.id_compra
      id_festa = caixaParaFechar.id_festa
      id_usuario = caixaParaFechar.id_usuario
    try {
      const res = await axios.put(`http://localhost:8800/caixas/${id_caixa}`, {
        id_caixa, 
        valorAbertura, 
        valorSangria, 
        dataHoraAbertura, 
        dataHoraFechamento, 
        id_compra ,
        id_festa , 
        id_usuario,
        status_caixa,
      });
      console.log(`Caixa ${id_caixa} atualizado para ${status_caixa}.`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  const acesarVendas = async () => {
    window.location.href = '/vendas'
  }
  
  
  const abrirCaixa = async () => {
    // Verifica se o valor de abertura foi digitado
    if (isNaN(caixaValorEntrada) || caixaValorEntrada <= 0) {
      window.confirm('Digite um valor para abrir o caixa.');
      
    } else {

    // Obtém a lista de caixas abertos do usuário atual
    const res = await axios.get('http://localhost:8800/caixas');
    const caixasAbertosDesteUsuario = res.data.filter(caixa => caixa.status_caixa === 'Aberto' && caixa.id_usuario === usuario.id);
    
    if (caixasAbertosDesteUsuario.length === 0) {
      novoCaixa()
      acesarVendas()
      
      
    } else if (caixasAbertosDesteUsuario.length > 0) {

      const acessarCaixaAberto = window.confirm(
        `Você possui um caixa aberto! 
Clique em OK para acessá-lo, ou Cancelar para abrir um novo.`
      );
      if (acessarCaixaAberto) {

        const caixa = caixaMaisRecente(caixasAbertosDesteUsuario)
        sessionStorage.setItem('caixa', JSON.stringify(caixa));
        console.log('caixa aberto', caixa.id_caixa)
        acesarVendas()
      } else {
        novoCaixa()
        acesarVendas()
      }
    };
  }}

  const caixaMaisRecente = (caixasAbertos) => {
            //Esta função irá entrar no caixa aberto mais recente
        // Classifica os caixas por ID em ordem decrescente
        const caixasAbertosClassificados = caixasAbertos.sort((a, b) => b.id_caixa - a.id_caixa)
        // Retorna o primeiro caixa da lista (o caixa com o ID mais alto)
        return caixasAbertosClassificados[0];
  }

  const dataHoraAtual = () => {
        // Obtém a data e hora atuais
        const dataAtual = new Date().toISOString().substring(0, 10);
        let horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        if (horaAtual.charAt(0) === '0') {
          horaAtual = horaAtual.replace('0', '00');
        }
        return `${dataAtual} ${horaAtual}`;
  }
  
  const novoCaixa = async () => {
    let dataAtual = dataHoraAtual()
    // Define os valores padrão para os parâmetros que faltam
    valorAbertura = caixaValorEntrada
    valorSangria = 0
    dataHoraAbertura = dataAtual
    dataHoraFechamento = null
    id_compra = 1 //ajustar
    id_festa = 1 // ajustar
    id_usuario = usuario.id
    status_caixa = 'Aberto'

    // Cria o novo caixa
    try {
      await axios.post('http://localhost:8800/caixas', {
        valorAbertura,
        valorSangria,
        dataHoraAbertura,
        dataHoraFechamento,
        id_compra,
        id_festa,
        id_usuario,
        status_caixa,
      });
      const res = await axios.get('http://localhost:8800/caixas');
      const caixasAbertosDesteUsuario = res.data.filter(caixa => caixa.status_caixa === 'Aberto' && caixa.id_usuario === usuario.id);
      // console.log(caixasAbertosDesteUsuario)

      const caixa = caixaMaisRecente(caixasAbertosDesteUsuario)

      const caixaParaFechar = caixasAbertosDesteUsuario[1]
      
      sessionStorage.setItem('caixa', JSON.stringify(caixa));
      console.log('caixa novo',caixa.id_caixa)
      console.log('caixa anterior',caixaParaFechar.id_caixa)
      fechaCaixa(caixaParaFechar.id_caixa, caixaParaFechar)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Container fluid='true'>
      <Row>
        <Col>
          <div className="title">Abertura de Caixa</div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <div>Nome do responsável:</div>

          <input className='caixaNome' readOnly={usuario.nome} type="text" value={usuario.nome} />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <div>Valor em caixa:</div>
          <input className='caixaValorEntrada' type="number" placeholder='Digite o valor'
            onChange={handleCaixaValorEntradaChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <button onClick={() => abrirCaixa()}>Abrir caixa</button>
          {/* <Vendas  caixa={caixa}/> */}
          <button onClick={() => {
            window.location.href = '/'
            sessionStorage.removeItem('usuario');
          }}>Sair</button>
        </Col>
      </Row>
      <Row>
        <Col>

          {/* Exibe o botão de menu */}
          {isAdmin && (
            <button style={{ width: '200px' }} onClick={() => setIsOpen(!isOpen)}>
              Administrativo
            </button>
          )}
          {/* Exibe o menu se o estado isOpen for verdadeiro */}
          {isOpen && (
            <div >
              <div className='p-1'></div>
              <button onClick={() => window.location.href = `/cadastros/produtos`}>Produtos</button>
              <button onClick={() => window.location.href = `/cadastros/usuarios`}>Usuários</button>
              <br />
              <button onClick={() => window.location.href = `/fechamento-geral`}>Fech Geral</button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default AberturaCaixa
