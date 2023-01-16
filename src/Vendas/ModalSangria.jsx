import { useState } from "react";
import { Modal } from "react-bootstrap";
import FuncoesSangria from "./FuncoesSangria";

export default function ModalSangria(props) {

    const caixa = JSON.parse(sessionStorage.getItem('caixa'));
    
    const [isModalSangriaOpen, setIsModalSangriaOpen] = useState(false)
    const [valorSangria, setValorSangria] = useState(0)
    const [descricao, setDescricao] = useState('')
    
    const openModal = () => {
        setIsModalSangriaOpen(true);
        setValorSangria('')
        setDescricao('')
      }
    function handleSangriaValor(event) {
        setValorSangria(event.target.value);
    }
    function handleDescricao(event) {
        setDescricao(event.target.value);
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
                                <input type="number" onChange={handleSangriaValor} value={+valorSangria} className="valSangria form-control" />
                            </div>
                            <br />
                            <div className="form-group ">
                                <label>Motivo da sangria</label><br />
                                <textarea type="text" onChange={handleDescricao} value={descricao} className="descSangria form-control" />
                            </div>
                            <br />
                                <FuncoesSangria caixa={caixa} valorSangria={+valorSangria} descricao={descricao} nomeBtn='Efetuar Sangria'/>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    </div>
    )
}