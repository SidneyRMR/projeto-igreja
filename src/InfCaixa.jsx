import { Col, Container, Row } from "react-bootstrap"

import React /* { useState, useEffect  */ from 'react';
// import axios from 'axios';
import Clock from './Clock'; // Importar o componente Clock

// Recupera o valor do usuario da tela de login

const usuario = JSON.parse(sessionStorage.getItem('usuario'));
const caixa = JSON.parse(sessionStorage.getItem('caixa'));

function InfCaixa() {

    return(
    <Container fluid='true'>
        <Row style={{
            fontSize: '15px',
            fontWeight: '200', position: 'fixed',
            left: '0px', bottom: '0px', backgroundColor: '#aa541b',
            color: 'white', padding: '1px', zIndex: 1
        }}>
            <Col className="w-100 ">
                Nome do caixa: {usuario.nome_usuario}
                {' | '}
                Saldo do caixa: {caixa.abertura}
                {' | '}
                Sangria: {caixa.sangria}
                {' | '}
                Data abertura: {caixa.data_abertura}
                {' | '}
                Status: {caixa.status_caixa}
                {' | '}
                Hora: {Clock()}
            </Col>
        </Row>
    </Container>
    )
}
export default InfCaixa