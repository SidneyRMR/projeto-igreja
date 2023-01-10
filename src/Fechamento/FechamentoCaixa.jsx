import { Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';

const FechamentoCaixa = () => {
    // Recupera o valor do usuario da tela de login
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const caixa = JSON.parse(sessionStorage.getItem('caixa'));

    const [vendasPgto, setVendasPgto] = useState([])
    const getVendasPgto = async () => {
        try {
            const res = await axios.get("http://localhost:8800/vendasPgto")
            setVendasPgto(res.data.sort((a, b) => (a.id_vendas_pgto > b.id_vendas_pgto ? 1 : -1)))
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getVendasPgto()
    }, [setVendasPgto])
    // fim do trecho 

    // Este trecho busca os caixas no BD e seta os valores na const caixas

    // fim do trecho 

    // Preciso criar 2 objetos, um com as informações do caixa vigente 
    // e outro com a listagem de todas as vendas efetuadas deste caixa

    /* 
    talvez eu tenha que criar views com estes dados!
        Caixa Vigente: 
        - Usuario
        - Valor Abertura
        - Total Sangria
        - Saldo Total
        - Data Abertura
        - Festa

        Valor total das venda abaixo
        - Pgto Credito
        - Pgto Debito
        - Pgto Dinheiro
        - Pgto Pix

        Listagem de vendas
        - ID da compra
        - produto
        - quantidade
    
    */

    return (
        <div>
            <div className='title d-flex justify-content-between p-1'> 
                <button className="botaoTitle" onClick={() => window.location.href = "/abertura-caixa"}>Voltar</button>
                
                Fechamento de Caixa      

                <button 
                className="botaoTitle"
                onClick={() => {
                    window.location.href = "/"
                    sessionStorage.removeItem('usuario');
                }}>Fechar Cx</button>
            </div>
            <div className="subtitulo">
                <Row className="subtitulo titulo">
                    <Col >Informações do Caixa</Col>
                </Row>
                <Row>
                    <Col>Nome do Usuário: {usuario.nome}</Col>
                    <Col>Valor Abertura: {caixa.abertura}</Col>
                    <Col>Total Sangria: {caixa.sangria}</Col>
                </Row>
                <Row>
                    <Col>Data Abertura: {caixa.data_abertura}</Col>
                    <Col>Festa: {caixa.id_festa}</Col>
                </Row>
            </div>




            {/* aqui eu preciso filtrar pelo usuario.id e mostras as informações somente deste caixa   */}
            <Table className="tabela" striped bordered hover>
                <thead>
                    <tr>
                        <th>ID Compra</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                {vendasPgto.map((vendaPgto, i) => (
                         <tr key={vendaPgto.id_venda_pgto} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                            <td>{vendaPgto.id_venda}</td>
                            <td>{vendaPgto.id_forma}</td>
                            <td>{vendaPgto.valor_pgto}</td>
                        </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default FechamentoCaixa