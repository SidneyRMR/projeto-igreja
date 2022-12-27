import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"


const Pagamento = () => {
    const atualizarValor = () => {
        setTotal(Number(pix) + Number(din) + Number(cred) + Number(deb))
    }
    const [total, setTotal] = useState(0)
    const [cred, setCred] = useState(0)
    const [deb, setDeb] = useState(0)
    const [din, setDin] = useState(0)
    const [pix, setPix] = useState(0)

    // function somaTotal(cr, de, di, pi) {
    //     setTotal(cr + de + di + pi)
    // }

    return (
        <div>
            <Container fluid='true'>
                <Row>
                    <Col>
                        <div className="title">Opções de Pagamento</div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <div>Crédito</div>
                        <input type="text" className="cred" onChange={e => {
                            setCred(e.target.value)
                            atualizarValor(Number(pix) + Number(din) + Number(cred) + Number(deb))
                        }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>Débito</div>
                        <input type="text" className="deb" onChange={e => {
                            setDeb(e.target.value)
                            atualizarValor(Number(pix) + Number(din) + Number(cred) + Number(deb))
                        }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>Dinheiro</div>
                        <input type="text" className="din" onChange={e => {
                            setDin(e.target.value)
                            atualizarValor(Number(pix) + Number(din) + Number(cred) + Number(deb))
                        }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>Pix</div>
                        <input type="text" className="pix" onChange={e => {
                            setPix(e.target.value)
                            atualizarValor(Number(pix) + Number(din) + Number(cred) + Number(deb))
                        }} />
                    </Col>
                </Row>
                <br />
            </Container>
            <Container >
                <Row>
                    <Col>
                        <button style={{ width: '200px' }} onClick={atualizarValor}>Somar Pagamentos</button>
                    </Col>
                </Row>
                <Row className="bg-orange">
                    <Col >Total Pago</Col>
                    <Col >R$ {total.toFixed(2).replace('.', ',')}</Col>
                </Row>
                <Row className="bg-orange">
                    
                    <Col >Troco</Col>
                    <Col >{'R$ 5,00'}</Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={() => window.location.href = "/vendas"}>Pagar</button>
                        <button onClick={() => window.location.href = "/vendas"}>Voltar</button>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}


export default Pagamento