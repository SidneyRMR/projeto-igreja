import React, { useRef, useState } from "react"
import { Col, Row, Modal } from "react-bootstrap"
import BotaoCadastro from './BotaoCadastro'

const CadFesta = (props) => {

    const nomeFestaInput = useRef(null);
    const [isModalFestaOpen, setIsModalFestaOpen] = useState()

    const [nomeFesta, setNomeFesta] = useState('')
    // const [dataInicio, setDataInicio] = useState()
    // const [dataTermino, setDataTermino] = useState('')

    // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
    const handleNomeFestaChange = (event) => {
        setNomeFesta(event.target.value);
    };



    const openModal = () => {
        setIsModalFestaOpen(true)
        setNomeFesta('')
      }
      
    return (
        <div >
            <button className="botao botaoTitle" onClick={openModal} >Nova festa</button>

            <Modal show={isModalFestaOpen} onHide={() => { setIsModalFestaOpen(false) }} onEntered={() => nomeFestaInput.current.focus()}>
                <Modal.Header closeButton className="title">
                    <Modal.Title className="title">Sangria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <div>Digite o nome da festa:</div>

                            <input className="nomeFesta w-100" type="text"
                                placeholder="Nome da festa"
                                onChange={handleNomeFestaChange}
                                value={nomeFesta}
                                ref={nomeFestaInput}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <BotaoCadastro nomeBtn='Cadastrar' nomeFesta={nomeFesta}></BotaoCadastro>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CadFesta