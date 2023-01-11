import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ModalSangria(props) {

    const openModal = () => {
        setIsModalSangriaOpen(true);
      };
    const [isModalSangriaOpen, setIsModalSangriaOpen] = useState(false);

    const [valorNovaSangria, setValorNovaSangria] = useState();

    function handleSangriaValor(event) {
        setValorNovaSangria(event.target.value);
    }
    return (
        <div>
        <button className="botao" onClick={openModal}>Sangria</button>

        <Modal show={isModalSangriaOpen} onHide={() => { setIsModalSangriaOpen(false) }}>
            <Modal.Header closeButton className="title">
                <Modal.Title className="title">Sangria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form >
                    <div>
                        <div className="form-group">
                            <div className="form-group">
                                <label>Valor da sangria</label><br />
                                <input type="number" onChange={handleSangriaValor} value={valorNovaSangria} className="valSangria form-control" />
                            </div>
                            <br />
                            <div className="form-group ">
                                <label>Motivo da sangria</label><br />
                                <textarea type="text" className="descSangria form-control" />
                            </div>
                            <br />
                            <button className="botao w-100 " onClick={() => {
                                // salvaSangria(valorNovaSangria)
                            }}>
                                <div style={{ fontSize: '25px' }}>
                                    Efetura Sangria
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    </div>
    )
}