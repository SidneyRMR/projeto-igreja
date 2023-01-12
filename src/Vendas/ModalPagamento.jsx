import { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
// import FuncoesVendas from "./FuncoesVendas";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ModalPagamento(props) {

    const openModal = () => {
        props.precoTotal === 0 ? 
        toast.success(`Adicione um produto primeiro.`, 
            {position: toast.POSITION.TOP_CENTER }) :
        setIsModalPgtoOpen(true);
      };

    const [isModalPgtoOpen, setIsModalPgtoOpen] = useState(false);

    const [showPixInput, setShowPixInput] = useState(false);
    const [showDinheiroInput, setShowDinheiroInput] = useState(false);
    const [showCreditoInput, setShowCreditoInput] = useState(false);
    const [showDebitoInput, setShowDebitoInput] = useState(false);

    function handlePaymentPix(event) {
        setShowPixInput(event.target.value === 'Pix');
    }
    function handlePaymentDinheiro(event) {
        setShowDinheiroInput(event.target.value === 'Dinheiro');
    }
    function handlePaymentCredito(event) {
        setShowCreditoInput(event.target.value === 'Crédito');
    }
    function handlePaymentDebito(event) {
        setShowDebitoInput(event.target.value === 'Débito');
    }
    return (
        <div>
   
            <ToastContainer/>
            <button className="botao w-100" 
                onClick={openModal
                }>Pagamento</button>
            
            <Modal show={isModalPgtoOpen} onHide={() => setIsModalPgtoOpen(false)}>
            <Modal.Header closeButton className="title">
                <Modal.Title className="title">Formas de pagamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form >
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="payment" value="Pix"
                            onChange={handlePaymentPix} />
                        <label className="form-check-label" >
                            Pix
                        </label>
                        {showPixInput && (
                            <div className="form-group">
                                <label htmlFor="pixAmount">Valor em Pix</label>
                                <input type="number" className="form-control" />
                            </div>
                        )}
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="payment" value="Dinheiro"
                            onChange={handlePaymentDinheiro} />
                        <label className="form-check-label" >
                            Dinheiro
                        </label>
                        {showDinheiroInput && (
                            <div className="form-group">
                                <label htmlFor="pixAmount">Valor em Dinheiro</label>
                                <input type="number" className="form-control" />
                            </div>
                        )}
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="payment" value="Crédito"
                            onChange={handlePaymentCredito} />
                        <label className="form-check-label" >
                            Crédito
                        </label>
                        {showCreditoInput && (
                            <div className="form-group">
                                <label htmlFor="pixAmount">Valor em Crédito</label>
                                <input type="number" className="form-control" />
                            </div>
                        )}
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="payment" value="Débito"
                            onChange={handlePaymentDebito} />
                        <label className="form-check-label">
                            Débito
                        </label>
                        {showDebitoInput && (
                            <div className="form-group">
                                <label htmlFor="pixAmount">Valor em Débito</label>
                                <input type="number" className="form-control" />
                            </div>
                        )}
                    </div>

                    <Container className='title text-center' style={{ fontSize: '20px', fontWeight: '400' }}>
                        <Row >
                            <Col>
                                Total à pagar
                            </Col>
                            <Col>
                                R$ {typeof props.precoTotal === 'number'
                                    ? (props.precoTotal.toFixed(2).replace('.', ',')) : ''}
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                Troco
                            </Col>
                            <Col>
                                R$ 0,00
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {/* <button className="w-100" onClick={() =>
                                    novaCompra()
                                    <div style={{ fontSize: '25px' }}>
                                        Confirmar Pagamento
                                    </div>
                                        }>
                                    </button> */}

                                {/* <FuncoesVendas valor='novaCompra' nomeBtn='Confirmar Pagamento'/> */}
                            </Col>
                        </Row>
                    </Container>
                </form>
            </Modal.Body>
        </Modal>
    </div>
    )
}