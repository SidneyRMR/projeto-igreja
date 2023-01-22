import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ModalPedidoConcluido(props) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
      }


  
    return (
        <div>
        <button className="botao" onClick={openModal}>Fechar</button>

        <Modal show={isModalOpen} onHide={() => { setIsModalOpen(false) }}>
            <Modal.Header closeButton className="title">
                <Modal.Title className="title"></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form >
                    <div>
                        <div className="form-group">
                            {props.msg}
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    </div>
    )
}