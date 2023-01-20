import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Col, Row } from "react-bootstrap";
import CompInfUsuario from "./CompInfUsuario";


export default function InfoUsuario(props) {

    const usuario = (JSON.parse(sessionStorage.getItem('usuario')))
    const caixa =  (JSON.parse(sessionStorage.getItem('caixa'))) || props.caixa
    // const [vendas, setVendas] = useState([])
    const [debito, setDebito] = useState(0)
    const [credito, setCredito] = useState(0)
    const [dinheiro, setDinheiro] = useState(0)
    const [pix, setPix] = useState(0)
    const [totalGeral, setTotalGeral] = useState(0)
    const [totalEmCaixa, setTotalEmCaixa] = useState(0)
    
    // get sangria total
    const [sangria, setSangria] = useState(0);
    // const [totalParaCadaTipoPagamento, setTotalParaCadaTipoPagamento] = useState([])

    const getVendas = async () => {
        try {
            const res = await api.get("/vendas")
            await res.data
            // fazer com que ao carregar data ja armazene o resultado da função em vendas
            // setTotalParaCadaTipoPagamento(filtrarVendaPagamento(res.data))
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
    
    // console.log('obj total de cada tipo pgto: ',totalParaCadaTipoPagamento)
    // console.log('valor total geral: ',totalGeral)

    function  filtrarVendaPagamento(vendasArr) {
        // array somente com este caixa
        const newVendasArr = vendasArr.filter((venda) => venda.id_caixa === caixa.id_caixa)
        // console.log(newVendasArr) // array dos caixas filtrados
        const resultado =  newVendasArr.reduce((acc, venda) => {
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

        setTotalEmCaixa(caixa.abertura + dinheiro - sangria)
    }, [ caixa, debito, credito, dinheiro, pix,sangria])



    const getSangria = async () => {
        try{
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
        <>
            <div className="subtitulo">
                <Row>
                    <Col>
                        <CompInfUsuario nomeProps='Usuário:' styleProps={{fontSize:'19px'}} valorProps={usuario.nome_usuario.split(' ').slice(0, 1).join(" ")}/>
                    </Col>
                    <Col>
                        <CompInfUsuario nomeProps='Data Abertura:' styleProps={{fontSize:'19px'}} valorProps={(caixa.data_abertura.slice(0 ,-14))}/>
                    </Col>
                    <Col>
                        <CompInfUsuario nomeProps='Valor Abertura:' styleProps={{fontSize:'19px'}} valorProps={(caixa.abertura).toFixed(2).replace('.',',')}/>
                    </Col>
                    <Col>
                        <CompInfUsuario nomeProps='Total Sangria:' styleProps={{fontSize:'19px'}} valorProps={(!sangria ? 'Carregando' : sangria.toFixed(2).replace('.',','))/* .toFixed(2).replace('.',',') */}/>
                    </Col>
                </Row>
                <hr  className="p-0 m-2"/>
                <Row>
                    <Col>
                        <CompInfUsuario nomeProps='Debito:' styleProps={{fontSize:'19px'}} valorProps={(debito).toFixed(2).replace('.',',')}/>

                    </Col>
                    <Col>
                        <CompInfUsuario nomeProps='Credito:' styleProps={{fontSize:'19px'}} valorProps={(credito).toFixed(2).replace('.',',')}/>
                    </Col>
                    <Col>
                        <CompInfUsuario nomeProps='Dinheiro:' styleProps={{fontSize:'19px'}} valorProps={(dinheiro).toFixed(2).replace('.',',')}/>
                    </Col>
                    <Col>

                        <CompInfUsuario nomeProps='Pix:' styleProps={{fontSize:'19px'}} valorProps={(pix).toFixed(2).replace('.',',')}/>
                    </Col>
                        
                    </Row>
                        <hr className="p-0 m-2"/>
                    <Row>
                    <Col>
                        <CompInfUsuario nomeProps='Festa:' styleProps={{fontSize:'22px'}} valorProps={('Mudar para nome (VW)',caixa.id_festa)}/>
                    </Col>
                    <Col>
                        <CompInfUsuario nomeProps='Total de vendas:' styleProps={{fontSize:'22px'}} valorProps={(totalGeral.toFixed(2).replace('.',','))}/>
                    </Col>
                    <Col>
                        <CompInfUsuario nomeProps='Total em caixa:' styleProps={{fontSize:'22px'}} valorProps={(totalEmCaixa.toFixed(2).replace('.',','))}/>
                    </Col>

                </Row>
            </div>
        </>
    )
}