import { Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

//falta passar os valores de entrada e nome do caixa para as proximas telas
const AberturaCaixa = () => {


    // Recupera o valor do usuario da tela de login
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    const inputRef = React.createRef();
    function TestValores(valEntrada) {
        if (valEntrada > 0) {
            // Se o valor for numérico, acessa a pagina de vendas e salva valor no storange
            novoCaixa(valEntrada)
        } else {
            // Se o valor for inválido, exibe uma mensagem de erro
            alert('Digite o valor de abertura de caixa!');
            inputRef.current.focus();
        }
    }

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

    const [caixas, setCaixas] = useState({})
    const novoCaixa = async (valorAbertura, valorSangria = 0, dataHoraAbertura, dataHoraFechamento, status = 'Aberto', id_festa= 1, id_usuario) => {
        const res = await axios.get('http://localhost:8800/caixas');
        const caixasAbertos = res.data.filter(caixa => caixa.status === 'Aberto' && caixa.id_usuario === usuario.id);
      
        if (caixasAbertos.length > 0) {
          const acessarCaixaAberto = window.confirm(`Tem ${caixasAbertos.length} caixa${caixasAbertos.length > 1 ? 's' : ''} aberto${caixasAbertos.length > 1 ? 's' : ''}. Acessar caixa aberto ou abrir novo caixa?`);
          if (!acessarCaixaAberto) {
            // Code to redirect the user to the open caixa object
          } else {
            const id_usuario = usuario.id
            const agora = new Date();
            dataHoraAbertura = agora.toISOString().slice(0, -5);
      
            if (!valorAbertura) {
              toast.error('Valor da abertura não disponível', {
                position: toast.POSITION.TOP_CENTER,
              });
              return;
            }
            try {
              const res = await axios.post('http://localhost:8800/caixas', {
                valorAbertura, valorSangria, dataHoraAbertura, dataHoraFechamento, status, id_festa, id_usuario
              });
              toast.success(`${res.data} salvo com sucesso`, {
                position: toast.POSITION.TOP_CENTER,
              });
              return (
                res.data,
                window.location.href = `/vendas`
              );
            } catch (error) {
              toast.error(error);
            }
          }
        } else {
          // If there are no open caixa objects, create a new one
          const agora = new Date();
          dataHoraAbertura = agora.toISOString().slice(0, -5);
      
          if (!valorAbertura) {
            toast.error('Digite um valor para abertura.', {
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }
          try {
            const res = await axios.post('http://localhost:8800/caixas', {
              valorAbertura, valorSangria, dataHoraAbertura, dataHoraFechamento, status, id_festa, id_usuario
            });
            return (
              res.data,
              window.location.href = `/vendas`
            );
          } catch (error) {
            toast.error(error);
          }
        }
      }
      
    useEffect(() => {
        novoCaixa()
    }, [setCaixas])
    
    return (
        <Container fluid='true'>
            <ToastContainer />
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
                    <input ref={inputRef} className='caixaValorEntrada' type="number" placeholder='Digite o valor'
                        onChange={handleCaixaValorEntradaChange} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <button onClick={() => TestValores(+caixaValorEntrada)}>Abrir caixa</button>
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
