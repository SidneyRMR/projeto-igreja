// import diocese from "../img/diocese.png"
import Dropdown from 'react-bootstrap/Dropdown';

const AberturaCaixa = () => {
    return (
        <div className="borda">
            {/* <img src={diocese} alt="" sizes="500x300" /> */}
            {/* <br /> */}
            {/* <h1 className="title">Paróquia Santa Cruz</h1> */}
            <h1 className="title">Abertura de Caixa</h1>
            <div className="abertura" >Selecione um caixa disponível:
                <select className="">
                    <option value="cx1">Caixa 1</option>
                    <option value="cx2">Caixa 2</option>
                    <option value="cx3">Caixa 3</option>
                </select>
            </div>
            <div className="aberturaBotao" >Valor em caixa: <input type="text" />
                <div>
                    <Dropdown>
                        <Dropdown.Toggle className="cadastros" variant="success" size="md">Administração
                        </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/cadastros/produtos">Produtos</Dropdown.Item>
                                <Dropdown.Item href="/cadastros/usuarios">Usuários</Dropdown.Item>
                                <Dropdown.Item href="/fechamento-geral">Fechamento Geral</Dropdown.Item>
                            </Dropdown.Menu>
                        
                        <a className="aberturaBotao" href="/vendas">Abrir caixa</a>
                        <a className="aberturaBotao" href="/">Sair</a>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default AberturaCaixa