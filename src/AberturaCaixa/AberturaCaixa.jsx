import { Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { useEffect } from 'react';
// import usuarios from '../data/usuarios';

//falta passar os valores de entrada e nome do caixa para as proximas telas
const AberturaCaixa = () => {

    // Recupera o valor do usuario da tela de login
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    const inputRef = React.createRef();
    function TestValores(valEntrada) {
        if (valEntrada > 0) {
            // Se o valor for numérico, acessa a pagina de vendas e salva valor no storange
            sessionStorage.setItem('valEntrada', JSON.stringify(valEntrada));
            window.location.href = `/vendas`;
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

                    <input className='caixaNome' readOnly={usuario.nome_usuario} type="text" value={usuario.nome_usuario} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div>Valor em caixa:</div>
                    <input ref={inputRef} className='caixaValorEntrada' type="text" placeholder='Digite o valor'
                        onChange={handleCaixaValorEntradaChange} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <button onClick={() => TestValores(+caixaValorEntrada)}>Abrir caixa</button>

                    <button onClick={() => {
                        window.location.href = '/'
                        sessionStorage.removeItem('usuario');
                    }}>Sair</button>
                </Col>
            </Row>
            <Row>
                <Col>

                    {/* Exibe o botão de menu */}
                    <button style={{ width: '200px' }} onClick={() => setIsOpen(!isOpen)}>Administrativo</button>
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
