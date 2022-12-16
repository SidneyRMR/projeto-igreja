import {Dropdown, DropdownButton} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


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

    return (
        <div className="bordaAbertura">

            <h1 className="title">Abertura de Caixa</h1>
            <Container>
                <Row>
                    <Col>
                        <span>Valor em caixa:</span>
                        <input className='caixaValorEntrada' type="text" placeholder='Digite o valor' 
                            onChange={handleCaixaValorEntradaChange}/>
                    </Col>
                    <Col>
                        <span>Nome do responsável:</span>
                        <input className='caixaNome' type="text" placeholder='Digite o nome' 
                            onChange={handleCaixaNomeChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => TestValores(caixaValorEntrada, caixaNome)}>Abrir caixa</Button>
                        {'  '}
                        <Button onClick={() => window.location.href = '/'}>Sair</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DropdownButton id="buttonAbertura" title="Administrativo" >
                            <Dropdown.Item href="/cadastros/produtos">Produtos</Dropdown.Item>
                            <Dropdown.Item href="/cadastros/usuarios">Usuários</Dropdown.Item>
                            <Dropdown.Item href="/fechamento-geral">Fech Geral</Dropdown.Item>
                        </DropdownButton >
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default AberturaCaixa
