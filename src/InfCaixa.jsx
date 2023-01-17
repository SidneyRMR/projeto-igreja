import { Col, Container, Row } from "react-bootstrap"

import React /* { useState, useEffect  */ from 'react';
// import axios from 'axios';
import Clock from './Clock'; // Importar o componente Clock


function InfCaixa(props) {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const caixa = props.caixa
    const sangria = +props.sangria


    const saldoCaixa = caixa.abertura - sangria



    return (
        <span>
            {props.infoVendas &&
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
                        Saldo do caixa em dinheiro: {isNaN(props.caixa.abertura) ? 'Carregando' : props.caixa.abertura}
                        {' | '}
                        Sangria: {isNaN(sangria) ? 'Carregando' : sangria}
                        {' | '}
                        {/* Data abertura: {props.caixa.data_abertura.slice(0, -14)} */}
                        {/* {' | '} */}
                        Status: {props.caixa.status_caixa}
                        {' | '}
                        Hora: {Clock()}
                    </Col>
                </Row>
            </Container>
            }
            {/* <span>{info}</span> */}
        </span>
    )
}
export default InfCaixa