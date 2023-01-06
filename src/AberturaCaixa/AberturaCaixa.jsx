import { Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

//falta passar os valores de entrada e nome do caixa para as proximas telas
const AberturaCaixa = () => {
  // Recupera o valor do usuario da tela de login
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));

  let valorAbertura = '';
  let valorSangria = '';
  let dataHoraAbertura = '';
  let dataHoraFechamento = '';
  let id_compra = '';
  let id_festa = '';
  const [id_usuario,setId_usuario] = useState('');
  const [status_caixa, setStatus_caixa] = useState('');

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





  // const [caixas, setCaixas] = useState({})
  const abrirCaixa = async () => {
    // Verifica se o valor de abertura foi digitado
    if (!caixaValorEntrada) {
      window.confirm('Digite um valor para abrir o caixa.');
      
    } else {

    // Obtém a lista de caixas abertos do usuário atual
    const res = await axios.get('http://localhost:8800/caixas');
    const caixasAbertosDesteUsuario = res.data.filter(caixa => caixa.status_caixa === 'Aberto' && caixa.id_usuario === usuario.id);
    console.log(caixasAbertosDesteUsuario)

    if (caixasAbertosDesteUsuario.length === 0) {
      novoCaixa()
    } else

    // Verifica se o usuário já possui um caixa aberto
    if (caixasAbertosDesteUsuario.length > 0) {
      const acessarCaixaAberto = window.confirm(
        `Você possui um caixa aberto! 
    Clique em OK para acessa-lo, ou Cancelar para abrir um novo.`
      );
      if (acessarCaixaAberto) {

        //Esta função irá entrar no caixa aberto mais recente !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // Classifica os caixas por ID em ordem decrescente
        const caixasAbertosClassificados = caixasAbertosDesteUsuario.sort((a, b) => b.id_caixa - a.id_caixa)
        // Retorna o primeiro caixa da lista (o caixa com o ID mais alto)
        const caixaMaisRecente = caixasAbertosClassificados[0];
        console.log(caixaMaisRecente)
        window.location.href = '/vendas';
      } else {

        novoCaixa()

      }
    };
  }}
  const novoCaixa = async () => {
    // Obtém a data e hora atuais
    const dataAtual = new Date().toISOString().substring(0, 10);
    let horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (horaAtual.charAt(0) === '0') {
      horaAtual = horaAtual.replace('0', '00');
    }
    const dataHoraAtual = `${dataAtual} ${horaAtual}`;

    // Define os valores padrão para os parâmetros que faltam
    valorAbertura = caixaValorEntrada
    valorSangria = 0
    dataHoraAbertura = dataHoraAtual
    dataHoraFechamento = null
    id_compra = null
    id_festa = 1
    setId_usuario(usuario.id)
    setStatus_caixa('Aberto')
    console.log(status_caixa)

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
      window.location.href = '/vendas';
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
              <button onClick={() => window.location.href = `/cadastros/produtos`}>Produtos</button>
              <button onClick={() => window.location.href = `/cadastros/usuarios`}>Usuários</button>
              <button onClick={() => window.location.href = `/fechamento-geral`}>Fech Geral</button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default AberturaCaixa
