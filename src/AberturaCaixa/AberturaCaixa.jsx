import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import BotaoSairPrograma from '../Botoes/BotaoSairPrograma';
import BotaoAdm from '../Botoes/BotaoAdm';
import FuncoesCaixa from './FuncoesCaixa';

//falta passar os valores de entrada e nome do caixa para as proximas telas
const AberturaCaixa = () => {

  const usuario = JSON.parse(sessionStorage.getItem('usuario'));

  const [inputAbertura, setInputAbertura] = useState(0)

  const handleInputAberturaChange = (event) => {
    setInputAbertura(event.target.value);
  }

  // este trecho so mostrará o botão adm caso o usuario tiver for administativo
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    usuario.tipo === 'Administrativo' ? setIsAdmin(true) : setIsAdmin(false);
  }, [usuario.tipo]);


  return (
    <Container fluid='true'>
      
      <Row>
        <Col>
          <div className="title">Abertura de Caixa</div>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col>
          <div>Nome do usuário:</div>

          <label className='caixaNome' style={{fontSize: '15px'}}  >{usuario.nome_usuario}</label>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <div>Valor em caixa:</div>
          <input className='inputAbertura' type="number" placeholder='Digite o valor'
            onChange={handleInputAberturaChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
        <FuncoesCaixa inputAbertura={inputAbertura} valor='abrirCaixa' nomeBtn='Abrir Caixa' />
        <BotaoSairPrograma classNameProps='botao' nomeBtn='Sair'/>
        </Col>
      </Row>
      <Row>
        <Col>
        {isAdmin && (
          <BotaoAdm/>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default AberturaCaixa
