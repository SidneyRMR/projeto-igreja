import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
export default function InfoUsuario(props) {

    const [vendasPgto, setVendasPgto] = useState([])
    const [totalDeb, setTotalDeb] = useState(0)
    const [totalCred, setTotalCred] = useState(0)
    const [totalDin, setTotalDin] = useState(0)
    const [totalPix, setTotalPix] = useState(0)
    const [totalGeral, setTotalGeral] = useState(0)
    const [totalEmCaixa, setTotalEmCaixa] = useState(0)

    function sumIdForma(vendas, forma) {
        let sum = 0;
        sum = vendas
            .filter(element => element.id_forma === forma)
            .map(element => element.valor_pgto)
            .reduce((acc, value) => acc + value, 0);
        return sum;
    }

    useEffect(() => {
        const getVendasPgto = async () => {
            try {
                const res = await axios.get("http://localhost:8800/vendapgto")
                setVendasPgto(res.data)
            } catch (error) {
                console.error(error)
            }
        };
        getVendasPgto();
    }, []);

    useEffect(() => {
        setTotalDeb(sumIdForma(vendasPgto, 1));
        setTotalCred(sumIdForma(vendasPgto, 2));
        setTotalDin(sumIdForma(vendasPgto, 3));
        setTotalPix(sumIdForma(vendasPgto, 4));

        setTotalGeral(sumIdForma(vendasPgto, 1) +
            sumIdForma(vendasPgto, 2) +
            sumIdForma(vendasPgto, 3) +
            sumIdForma(vendasPgto, 4));

        setTotalEmCaixa(sumIdForma(vendasPgto, 3) + props.caixa.abertura);
    }, [vendasPgto, props.caixa.abertura]);

    return (
        <>
            <div className="subtitulo">
                <Row>
                    <Col>
                        <div htmlFor="">Usuário: </div>
                        <input className="fechCaixa c-white" type="text" value={props.usuario.nome_usuario} />

                        <div htmlFor="">Valor Abertura: </div>
                        <input className="fechCaixa" type="text" value={props.caixa.abertura} />
                    </Col>
                    <Col>
                        <div htmlFor="">Data Abertura: </div>
                        <input className="fechCaixa" type="text" value={props.caixa.data_abertura.slice(0, -14)} />

                        <div htmlFor="">Total Sangria: </div>
                        <input className="fechCaixa" type="text" value={props.caixa.sangria} />
                    </Col>

                    <Col>

                        <div htmlFor="">Debito: </div>
                        <input className="fechCaixa" type="text" value={totalDeb} />

                        <div htmlFor="">Credito: </div>
                        <input className="fechCaixa" type="text" value={totalCred} />
                    </Col>
                    <Col>

                        <div htmlFor="">Dinheiro: </div>
                        <input className="fechCaixa" type="text" value={totalDin} />

                        <div htmlFor="">Pix: </div>
                        <input className="fechCaixa" type="text" value={totalPix} />

                    </Col>
                    <Col>
                        <div>Total de vendas: </div>
                        <input className="fechCaixa" type="text" value={totalGeral} />
                        <div>Total em caixa: </div>
                        <input className="fechCaixa" type="text" value={totalEmCaixa} />
                    </Col>
                    {/* <div htmlFor="">Festa: </div>
                <input className="fechCaixa" type="text" value={props.caixa.id_festa} /> */}

                </Row>
            </div>
        </>
    )
}