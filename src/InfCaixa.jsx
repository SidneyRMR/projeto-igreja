import { Col, Container, Row } from "react-bootstrap"

import React, { useEffect, useState } /* { useState, useEffect  */ from 'react';
// import { api } from "./services/api";
import Clock from './Clock'; // Importar o componente Clock
import { api } from "./services/api";


function InfCaixa(props) {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    let caixa = props.caixa
    // props.caixa ? caixa = props.caixa : caixa = null
    // console.log(caixa)
    const sangria = +props.sangria
    
    const [saldoCaixa, setSaldoCaixa] = useState(0)
    const [dinheiro, setDinheiro] = useState(0)
    useEffect(() => {
        const getVendasDinheiro = async () => {
            try {
                const res = await api.get("/vendas")
                await res.data
                const filtrarVendaPagamento = (vendasArr) => {
                    // array somente com este caixa
                    const newVendasArr = vendasArr.filter((venda) => venda.id_caixa === caixa.id_caixa)
                    // console.log(newVendasArr) // array dos caixas filtrados
                    const resultado =  newVendasArr.reduce((acc, venda) => {
                        acc.dinheiro += venda.dinheiro;
                        return acc;
                    }, { dinheiro: 0 });
                    return resultado
                }
                setDinheiro(filtrarVendaPagamento(res.data).dinheiro)
            } catch (error) {
                console.error(error)
            }
        }
        getVendasDinheiro()
    },[caixa.id_caixa, dinheiro])
    
    useEffect(() => {
        setSaldoCaixa(dinheiro + props.caixa.abertura - props.sangria);
        props.onSaldoCaixa(saldoCaixa);
      }, [props, dinheiro, saldoCaixa, sangria]);



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
                        Nome do caixa: {usuario.nome_usuario.split(' ').slice(0, 1).join(" ")}
                        {' | '}
                        Saldo em dinheiro: {isNaN(saldoCaixa) ? 'Carregando' : saldoCaixa}
                        {' | '}
                        Sangria: {isNaN(sangria) ? 'Carregando' : sangria}
                        {' | '}
                        {/* Data abertura: {props.caixa.data_abertura.slice(0, -14)} */}
                        {/* {' | '} */}
                        {/* Status: {props.caixa.status_caixa}
                        {' | '} */}
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