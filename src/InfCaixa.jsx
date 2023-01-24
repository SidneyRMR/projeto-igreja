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
            // console.log('teste de renderização: infCaixa' )
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
    },[setDinheiro,caixa.id_caixa])
    
    useEffect(() => {
        setSaldoCaixa(dinheiro + props.caixa.abertura - props.sangria);
        props.onSaldoCaixa(dinheiro + props.caixa.abertura - props.sangria);
      },[dinheiro, props, setSaldoCaixa]);

    return (
        <span>
            {props.infoVendas &&
                <Container fluid='true'>
                <Row style={{
                    fontSize: '15px',
                    fontWeight: '100', position: 'fixed',
                    left: '0px', bottom: '0px', backgroundColor: '#F0F4FF',
                    color: '#3D4886', padding: '2px', zIndex: 1, borderRadius: '5px'
                }}>
                    <Col className="w-100 ">
                        Dinheiro em espécie: {isNaN(saldoCaixa) ? 'Carregando' : saldoCaixa}
                    </Col>
                </Row>
            </Container>
            }
            {/* <span>{info}</span> */}
        </span>
    )
}
export default InfCaixa