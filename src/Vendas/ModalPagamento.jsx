import { useEffect, useRef, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import FuncoesVendas from "./FuncoesVendas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalPagamento(props) {
  const openModal = () => {
    props.precoTotalDosProdutos === 0
      ? toast.success(`Adicione um produto primeiro.`, {
          position: toast.POSITION.TOP_CENTER,
        })
      : setIsModalPgtoOpen(true);
    setPgDebito(0);
    setPgCredito(0);
    setPgDinheiro(0);
    setPgPix(0);
  };

  const fechaModal = () => {
    setIsModalPgtoOpen(false);
    setPgDebito(0);
    setPgCredito(0);
    setPgDinheiro(0);
    setPgPix(0);
    props.limpaListaProdutos();
  };

  const [isModalPgtoOpen, setIsModalPgtoOpen] = useState(false);
  const [pgDebito, setPgDebito] = useState(0);
  const [pgCredito, setPgCredito] = useState(0);
  const [pgDinheiro, setPgDinheiro] = useState(0);
  const [pgPix, setPgPix] = useState(0);
  const [precoTotalAPagar, setPrecoTotalAPagar] = useState(0);

  const inputRefDebito = useRef(null);
  const inputRefCredito = useRef(null);
  const inputRefDinheiro = useRef(null);
  const inputRefPix = useRef(null);

  // atualizar valores de pagamentos em cada input
  function handleInputDebito(event) {
    setPgDebito(0);
    setPgDebito(event.target.value);
  }
  function handleInputCredito(event) {
    setPgCredito(0);
    setPgCredito(event.target.value);
  }
  function handleInputDinheiro(event) {
    setPgDinheiro(0);
    setPgDinheiro(event.target.value);
  }
  function handleInputPix(event) {
    setPgPix(0);
    setPgPix(event.target.value);
  }

  useEffect(() => {
    setPrecoTotalAPagar(+pgDebito + +pgCredito + +pgDinheiro + +pgPix);
  }, [pgDebito, pgCredito, pgDinheiro, pgPix, precoTotalAPagar]);

  // mostrar inputs
  const [showDebitoInput, setShowDebitoInput] = useState(false);
  const [showCreditoInput, setShowCreditoInput] = useState(false);
  const [showDinheiroInput, setShowDinheiroInput] = useState(false);
  const [showPixInput, setShowPixInput] = useState(false);

  function handleShowDebito(event) {
    setShowDebitoInput(event.target.checked);
    setPgDebito(0);
  }
  function handleShowCredito(event) {
    setShowCreditoInput(event.target.checked);
    setPgCredito(0);
  }
  function handleShowDinheiro(event) {
    setShowDinheiroInput(event.target.checked);
    setPgDinheiro(0);
  }
  function handleShowPix(event) {
    setShowPixInput(event.target.checked);
    setPgPix(0);
  }

    useEffect(() => {
        if (showDebitoInput) {
            inputRefDebito.current.focus();
        }
    }, [showDebitoInput]);

    useEffect(() => {
        if (showCreditoInput) {
            inputRefCredito.current.focus();
        }
    }, [showCreditoInput]);

    useEffect(() => {
        if (showDinheiroInput) {
            inputRefDinheiro.current.focus();
        }
    }, [showDinheiroInput]);

    useEffect(() => {
        if (showPixInput) {
            inputRefPix.current.focus();
        }
    }, [showPixInput]); 

  return (
    <div>
      <ToastContainer />
      <button className="botao w-100" onClick={openModal}>
        Pagamento
      </button>

      <Modal show={isModalPgtoOpen} onHide={() => setIsModalPgtoOpen(false)}>
        <Modal.Header closeButton className="title">
          <Modal.Title className="title">Formas de pagamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-check">
              <input
                className={`form-check-input`}
                type="checkbox"
                onChange={handleShowDebito}
                value="Debito"
              />
              <label>Debito</label>
              {showDebitoInput && (
                <span className={`form-group`}>
                  <input
                    type="number"
                    className="form-control"
                    ref={inputRefDebito}
                    onChange={handleInputDebito}
                  />
                </span>
              )}
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleShowCredito}
                value="Credito"
              />
              <label>Credito</label>
              {showCreditoInput && (
                <span className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    onChange={handleInputCredito}
                    ref={inputRefCredito}
                  />
                </span>
              )}
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleShowDinheiro}
                value="Dinheiro"
              />
              <label>Dinheiro</label>
              {showDinheiroInput && (
                <span className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    onChange={handleInputDinheiro}
                    ref={inputRefDinheiro}
                  />
                </span>
              )}
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleShowPix}
                value="Pix"
              />
              <label>Pix</label>
              {showPixInput && (
                <span className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    onChange={handleInputPix}
                    ref={inputRefPix}
                  />
                </span>
              )}
            </div>

            <Container
              className="title text-center"
              style={{ fontSize: "20px", fontWeight: "400" }}
            >
              <Row>
                <Col>Total à pagar</Col>
                <Col>
                  R${" "}
                  {typeof props.precoTotalDosProdutos === "number"
                    ? props.precoTotalDosProdutos.toFixed(2).replace(".", ",")
                    : ""}
                </Col>
              </Row>
              <Row>
                <Col>Troco</Col>
                <Col>
                  <div>
                    R${" "}
                    {(precoTotalAPagar
                      ? precoTotalAPagar - props.precoTotalDosProdutos < 0
                        ? 0
                        : precoTotalAPagar - props.precoTotalDosProdutos
                      : 0
                    )
                      .toFixed(2)
                      .replace(".", ",")}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>Falta</Col>
                <Col>
                  {}
                  <div>
                    R${" "}
                    {(precoTotalAPagar
                      ? precoTotalAPagar - props.precoTotalDosProdutos > 0
                        ? 0
                        : precoTotalAPagar - props.precoTotalDosProdutos
                      : 0
                    )
                      .toFixed(2)
                      .replace(".", ",")}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FuncoesVendas
                    nomeBtn="Confirmar Pagamento"
                    resumoPedido={props.resumoPedido}
                    precoTotalDosProdutos={props.precoTotalDosProdutos}
                    propsTotalAPagar={precoTotalAPagar}
                    propsDebito={pgDebito}
                    propsCredito={pgCredito}
                    propsDinheiro={pgDinheiro}
                    propsPix={pgPix}
                    fechaModal={fechaModal}
                  />
                </Col>
              </Row>
            </Container>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
