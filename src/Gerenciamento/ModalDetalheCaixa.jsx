import { useState, useEffect } from "react"
import { Modal, Col, Row } from "react-bootstrap"
import { api } from "../services/api";

import CompInfUsuario from "./CompInfUsuario"

export default function ModalDetalheCaixa(props) {

    const caixa = props.caixa
    const openModal = () => {
        setIsModalOpen(true)
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [debito, setDebito] = useState(0)
    const [credito, setCredito] = useState(0)
    const [dinheiro, setDinheiro] = useState(0)
    const [pix, setPix] = useState(0)
    const [totalGeral, setTotalGeral] = useState(0)

    const [sangria, setSangria] = useState(0)

    const getVendas = async () => {
        try {
            const res = await api.get("/vendas")
            await res.data
            setDebito(filtrarVendaPagamento(res.data).debito)
            setCredito(filtrarVendaPagamento(res.data).credito)
            setDinheiro(filtrarVendaPagamento(res.data).dinheiro)
            setPix(filtrarVendaPagamento(res.data).pix)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getVendas()
    })

    function filtrarVendaPagamento(vendasArr) {
        // array somente com este caixa
        const newVendasArr = vendasArr.filter((venda) => venda.id_caixa === caixa.id_caixa)
        // console.log(newVendasArr) // array dos caixas filtrados
        const resultado = newVendasArr.reduce((acc, venda) => {
            acc.debito += venda.debito;
            acc.credito += venda.credito;
            acc.dinheiro += venda.dinheiro;
            acc.pix += venda.pix;
            return acc;
        }, { debito: 0, credito: 0, dinheiro: 0, pix: 0 });
        return resultado
    }
    useEffect(() => {
        setTotalGeral(debito + credito + dinheiro + pix)
    }, [caixa, debito, credito, dinheiro, pix, sangria, totalGeral])

    const getSangria = async () => {
        try {
            const res = await api.get("/sangria")
            setSangria(res.data.filter(item => item.id_caixa === caixa.id_caixa)
                .reduce((total, item) => total + item.valorSangria, 0))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSangria()
    })


    return (
        <span>
            <button className="botao" onClick={openModal}>Detalhes  </button>

            <Modal show={isModalOpen} onHide={() => { setIsModalOpen(false) }}>
                <Modal.Header closeButton className="title">
                    <Modal.Title className="title">Detalhes do caixa</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Col><div className="p-1">Entradas e saídas</div></Col>
                    <hr className="p-0 m-0"/>
                    <Row>
                        <Col>
                            <CompInfUsuario nomeProps='Valor de abertura:' styleProps={{ fontSize: '15px' }} valorProps={(caixa.abertura).toFixed(2).replace('.', ',')} />
                        </Col>
                        <Col>
                            <CompInfUsuario nomeProps='Total de sangria:' styleProps={{ fontSize: '15px' }} valorProps={(!sangria ? 0 : sangria.toFixed(2).replace('.', ','))/* .toFixed(2).replace('.',',') */} />
                        </Col>
                    </Row>
                    <Col><div className="p-1">Totais dos tipos de pagamento</div></Col>
                    <hr className="p-0 m-0"/>
                    <Row>
                        <Col>
                            <CompInfUsuario nomeProps='Debito:' styleProps={{ fontSize: '15px' }} valorProps={(debito).toFixed(2).replace('.', ',')} />

                        </Col>
                        <Col>
                            <CompInfUsuario nomeProps='Credito:' styleProps={{ fontSize: '15px' }} valorProps={(credito).toFixed(2).replace('.', ',')} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CompInfUsuario nomeProps='Dinheiro:' styleProps={{ fontSize: '15px' }} valorProps={(dinheiro).toFixed(2).replace('.', ',')} />
                        </Col>
                        <Col>

                            <CompInfUsuario nomeProps='Pix:' styleProps={{ fontSize: '15px' }} valorProps={(pix).toFixed(2).replace('.', ',')} />
                        </Col>
                    </Row>
                    <Col><div className="p-1">Total geral</div></Col>
                    <hr className="p-0 m-0"/>
                    <Row>
                        <Col>
                            <CompInfUsuario nomeProps='Total de vendas:' styleProps={{ fontSize: '19px' }} valorProps={(totalGeral.toFixed(2).replace('.', ','))} />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </span>
    )
}