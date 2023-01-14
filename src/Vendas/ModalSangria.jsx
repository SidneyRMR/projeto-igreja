import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ModalSangria(props) {

    const openModal = () => {
        setIsModalSangriaOpen(true);
      }

    const [isModalSangriaOpen, setIsModalSangriaOpen] = useState(false);

    const [valorNovaSangria, setValorNovaSangria] = useState(0);

    function handleSangriaValor(event) {
        setValorNovaSangria(event.target.value);
    }

        // const [descricaoSangria, setDescricaoSangria] = useState(caixa.descSangria);

    // function handleSangriaDescrição(event) {
    //     setShowDebitoInput(event.target.value);
    // }

    // const salvaSangria = async () => {
    //     console.log(valorNovaSangria)
    //     if ((valorNovaSangria > 0) && (valorNovaSangria < caixa.abertura)) {
    //         // alterações 
            
    //         // sangria = valorNovaSangria
    //         // iguais
    //         abertura = caixa.abertura
    //         data_fechamento = caixa.data_fechamento
    //         status_caixa = caixa.status_caixa
    //         data_abertura = caixa.data_abertura
    //         id_compra = caixa.id_compra
    //         id_festa = caixa.id_festa
    //         id_usuario = caixa.id_usuario
    //         try {
    //             const res = await axios.put(`http://localhost:8800/caixas/${id_caixa}`, {
    //                 id_caixa,
    //                 abertura,
    //                 sangria,
    //                 data_abertura,
    //                 data_fechamento,
    //                 id_compra,
    //                 id_festa,
    //                 id_usuario,
    //                 status_caixa,
    //             });
    //             console.log(`Caixa ${id_caixa} atualizado para  ${status_caixa} as ${data_fechamento}.'`);
    //             sessionStorage.setItem('caixa', JSON.stringify(caixa));
    //             return res.data;
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     } else {
    //         window.confirm('O valor deve ser menor do que o de saldo em dinheiro deste caixa.')
    //     }
    // }
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