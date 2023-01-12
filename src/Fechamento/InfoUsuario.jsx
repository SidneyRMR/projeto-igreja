import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

export default function InfoUsuario(props) {

    const usuario = props.usuario
    const caixa = props.caixa

    const [vendas, setVendas] = useState([])

    const [totalGeral, setTotalGeral] = useState(0)
    const [totalEmCaixa, setTotalEmCaixa] = useState(0)



    const getVendas = async () => {
        try {
            const res = await axios.get("http://localhost:8800/vendas")
            setVendas(res.data.sort((a,b) => (a.id > b.id ? 1 : -1)))
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        getVendas()
    }, [setVendas])

    const [totalParaCadaTipoPagamento, setTotalParaCadaTipoPagamento] = useState([])

    function filtrarVendaPagamento(vendasArr) {
        // array somente com este caixa
        const newVendasArr = vendasArr.filter((venda) => venda.id_caixa === caixa.id_caixa)
        console.log(newVendasArr)
        
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
        setTotalParaCadaTipoPagamento(filtrarVendaPagamento(vendas));
        setTotalGeral(  filtrarVendaPagamento(vendas).debito + 
                        filtrarVendaPagamento(vendas).credito + 
                        filtrarVendaPagamento(vendas).dinheiro + 
                        filtrarVendaPagamento(vendas).pix);

       if(props.caixa){
   setTotalEmCaixa(props.caixa.abertura + filtrarVendaPagamento(vendas).dinheiro - props.caixa.sangria);
}
    }, [vendas])
    
    

    return (
        <>
            <div className="subtitulo">
                <Row>
                    
                    
                    <Col>
                        <div htmlFor="">Usuário</div>
                        <input readOnly className="fechCaixa c-white" type="text" value={usuario.nome_usuario} />

                        <div htmlFor="">Valor Abertura</div>
                        <input readOnly className="fechCaixa" type="text" value={caixa.abertura} />
                    </Col>
                    <Col>
                        <div htmlFor="">Data Abertura</div>
                        <input readOnly className="fechCaixa" type="text" value={caixa.data_abertura.slice(0, -14)} />

                        <div htmlFor="">Total Sangria</div>
                        <input readOnly className="fechCaixa" type="text" value={caixa.sangria} />
                    </Col>

                    <Col>

                        <div htmlFor="">Debito</div>
                        <input readOnly className="fechCaixa" type="text" value={totalParaCadaTipoPagamento.debito} />

                        <div htmlFor="">Credito</div>
                        <input readOnly className="fechCaixa" type="text" value={totalParaCadaTipoPagamento.credito} />
                    </Col>
                    <Col>

                        <div htmlFor="">Dinheiro</div>
                        <input readOnly className="fechCaixa" type="text" value={totalParaCadaTipoPagamento.dinheiro} />

                        <div htmlFor="">Pix</div>
                        <input readOnly className="fechCaixa" type="text" value={totalParaCadaTipoPagamento.pix} />

                    </Col>
                        
                    </Row>
                    <hr />
                    <Row>
                    <Col>
                        <div>Total de vendas</div>
                        <input readOnly className="fechCaixa totais" type="text" value={totalGeral} />
                    </Col>
                    <Col>
                        <div>Total em caixa</div>
                        <input readOnly className="fechCaixa totais" type="text" value={totalEmCaixa} />
                    </Col>
                    {/* <div htmlFor="">Festa</div>
                <input className="fechCaixa" type="text" value={caixa.id_festa} /> */}

                </Row>
            </div>
        </>
    )
}