import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import { useEffect } from 'react';

//falta passar os valores de entrada e nome do caixa para as proximas telas
const AberturaCaixa = () => {
    function TestValores(valEntrada, nome) {
        // Verifica se o usuário e senha digitados estão presentes na lista de usuários
        const valorEncontrado = (valEntrada >= 0  &&  nome);

        if (valorEncontrado) {
            // Se o usuário e senha forem válidos, redireciona para a página de abertura de caixa
            window.location.href = `/vendas/?nome=${nome}`;
 
        } else {
            // Se o usuário e senha forem inválidos, exibe uma mensagem de erro
            alert('Preencha os campos acima para entrar!');
        }
    }

    // Este trecho de codigo serve para verificar se os inputs possuem valores válidos
    const [caixaValorEntrada, setCaixaValorEntrada] = useState()
    const [caixaNome, setCaixaNome] = useState()

    const handleCaixaValorEntradaChange = (event) => {
        setCaixaValorEntrada(event.target.value);
    }
    const handleCaixaNomeChange = (event) => {
        setCaixaNome(event.target.value);
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
        <div className="bordaAbertura">
            <h1 className="title">Abertura de Caixa</h1>
            <Container>
                <Row>
                    <Col>
                        <div>Nome do responsável:</div>
                        <input className='caixaNome' type="text" placeholder='Digite o nome' 
                            onChange={handleCaixaNomeChange}/>
                    </Col>
                    <Col>
                        <div>Valor em caixa:</div>
                        <input className='caixaValorEntrada' type="text" placeholder='Digite o valor' 
                            onChange={handleCaixaValorEntradaChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={() => TestValores(caixaValorEntrada, caixaNome)}>Abrir caixa</button>
                    </Col>
                    <Col>
                        <button onClick={() => window.location.href = '/'}>Sair</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div >
                            {/* Exibe o botão de menu */}
                            <button onClick={() => setIsOpen(!isOpen)}>Administrativo</button>
                            {/* Exibe o menu se o estado isOpen for verdadeiro */}
                            {isOpen && (
                                <div >
                                    <button onClick={() => window.location.href="/cadastros/produtos"}>Produtos</button>
                                    <button onClick={() => window.location.href="/cadastros/usuarios"}>Usuários</button>
                                    <button onClick={() => window.location.href="/fechamento-geral"}>Fech Geral</button>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default AberturaCaixa
