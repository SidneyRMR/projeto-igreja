import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import CompInfUsuario from "./CompInfUsuario";

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
    }, [vendas, props.caixa])
    
    

    return (
        <>{usuario && caixa && totalParaCadaTipoPagamento (

            <div className="subtitulo">
                <Row>
                    
                    
                    <Col>
                        <CompInfUsuario nome='Usuário:' styleProps={{fontSize:'22px'}} valor={usuario.nome_usuario}/>
                        
                        <CompInfUsuario nome='Valor Abertura:' styleProps={{fontSize:'22px'}} valor={(caixa.abertura).toFixed(2).replace('.',',')}/>

                    </Col>
                    <Col>
                        <CompInfUsuario nome='Data Abertura:' styleProps={{fontSize:'22px'}} valor={(caixa.data_abertura.slice(0, -14))}/>

                        <CompInfUsuario nome='Total Sangria:' styleProps={{fontSize:'22px'}} valor={(caixa.sangria).toFixed(2).replace('.',',')}/>
                    </Col>

                    <Col>
                        <CompInfUsuario nome='Debito:' styleProps={{fontSize:'22px'}} valor={(totalParaCadaTipoPagamento.debito).toFixed(2).replace('.',',')}/>

                        <CompInfUsuario nome='Credito:' styleProps={{fontSize:'22px'}} valor={(totalParaCadaTipoPagamento.credito).toFixed(2).replace('.',',')}/>
                    </Col>
                    <Col>
                        <CompInfUsuario nome='Dinheiro:' styleProps={{fontSize:'22px'}} valor={(totalParaCadaTipoPagamento.dinheiro).toFixed(2).replace('.',',')}/>

                        <CompInfUsuario nome='Pix:' styleProps={{fontSize:'22px'}} valor={(totalParaCadaTipoPagamento.pix).toFixed(2).replace('.',',')}/>

                    </Col>
                        
                    </Row>
                    <hr />
                    <Row>
                    <Col>
                        <div className="bg-orange al-left ">Total de vendas:
                        <span className="al-right totais" style={{fontSize:'25px'}}>{totalGeral.toFixed(2).replace('.',',')}</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="bg-orange al-left">Total em caixa:
                        <span className="al-right totais" style={{fontSize:'25px'}}>{totalEmCaixa.toFixed(2).replace('.',',')}</span>
                        </div>
                    </Col>
                    {/* <div className="bg-orange al-left">Festa</div>
                <input className="al-right" type="text" value={caixa.id_festa} /> */}

                </Row>
            </div>
                )}
        </>
    )
}