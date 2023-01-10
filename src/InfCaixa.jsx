
import { Col, Container, Row } from "react-bootstrap"

import React /* { useState, useEffect  */ from 'react';
// import axios from 'axios';
import Clock from './Clock'; // Importar o componente Clock

// Recupera o valor do usuario da tela de login
const usuario = JSON.parse(sessionStorage.getItem('usuario'));
const caixa = JSON.parse(sessionStorage.getItem('caixa'));

function InfCaixa() {

    // Este trecho busca os caixas no BD e seta os valores na const caixas
    
    // const [caixa, setCaixa] = useState({})
    // const getCaixa = async () => {
    //     console.log(caixa, caixaNovo, caixaComId)
    //     const caixaComId = caixaNovo.id_caixa
    //     try {
    //         const res = await axios.get('http://localhost:8800/caixas');
    //         const caixaAberto = res.data.filter(caixa => caixaComId === caixa.id_caixa)
    //         // const caixasAbertosClassificados = caixasAbertosDesteUsuario.sort((a, b) => b.id_caixa - a.id_caixa)
    //     // Retorna o primeiro caixa da lista (o caixa com o ID mais alto)
    //     return caixaAberto[0]     
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    // useEffect(() => {
    //     getCaixa()
    // }, [setCaixa])
    // fim do trecho 

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