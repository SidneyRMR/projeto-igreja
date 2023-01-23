import { Col, Container, Row } from "react-bootstrap"

import React, { useEffect, useState } /* { useState, useEffect  */ from 'react';
// import { api } from "./services/api"
import { api } from "./services/api";


function InfCaixa(props) {
    let caixa = props.caixa
    
    const [saldoCaixa, setSaldoCaixa] = useState(0)
    const [dinheiro, setDinheiro] = useState(0)
    useEffect(() => {
        const getVendasDinheiro = async () => {
            try {
                const res = await api.get("/vendas")
                await res.data
                const filtrarVendaPagamento = (vendasArr) => {
                    const newVendasArr = vendasArr.filter((venda) => venda.id_caixa === caixa.id_caixa)
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
    })
    
    useEffect(() => {
        setSaldoCaixa(dinheiro + props.caixa.abertura - props.sangria);
        // props.onSaldoCaixa(saldoCaixa);
      },[dinheiro, props, saldoCaixa]);



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
                        Saldo em dinheiro: {isNaN(saldoCaixa) ? 'Carregando' : saldoCaixa}
                    </Col>
                </Row>
            </Container>
            }
            {/* <span>{info}</span> */}
        </span>
    )
}
export default InfCaixa