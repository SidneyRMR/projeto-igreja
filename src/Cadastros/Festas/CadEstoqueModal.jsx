import React, { useRef, useState } from "react";
import { Col, Row, Modal } from "react-bootstrap";
import BotaoAlteraEstoque from "./BotaoAlteraEstoque";

const CadEstoqueModal = (props) => {
  const alteraEstoqueInput = useRef(null);
  const [isModalFestaOpen, setIsModalFestaOpen] = useState();

  const [alteraEstoque, setAlteraEstoque] = useState("");

  // Manipulador de evento para atualizar o estado da descrição quando o usuário alterar o valor do input
  const handlealteraEstoqueChange = (event) => {
    setAlteraEstoque(event.target.value);
  };

  const openModal = () => {
    setIsModalFestaOpen(true);
    setAlteraEstoque("");
  };
  console.log("id_festa:", props.id_festa);
  console.log("id_produto:", props.id_produto);
  console.log("estoqueFestaAtual:", props.estoqueFestaAtual);
  console.log("alteraEstoqueInput:", alteraEstoque);
  return (
    <div>
      <button className="botao botaoTitle" onClick={openModal}>
        Alterar Estoque
      </button>

      <Modal
        show={isModalFestaOpen}
        onHide={() => {
          setIsModalFestaOpen(false);
        }}
        onEntered={() => alteraEstoqueInput.current.focus()}
      >
        <Modal.Header closeButton className="title">
          <Modal.Title className="title">Cadastro de estoque</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <div>
                Digite o quantidade de{" "}
                <span className="aberto">{props.nome}</span> em estoque:
              </div>

              <input
                className="alteraEstoque w-100 form-control"
                type="number"
                placeholder="Quantidade em estoque"
                onChange={handlealteraEstoqueChange}
                value={alteraEstoque}
                ref={alteraEstoqueInput}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <BotaoAlteraEstoque
                id_festa={props.id_festa}
                id_produto={props.id_produto}
                estoqueFestaAtual={props.estoqueFestaAtual}
                alteraEstoque={alteraEstoque}
                nomeBtn="Alterar estoque"
              ></BotaoAlteraEstoque>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CadEstoqueModal;
