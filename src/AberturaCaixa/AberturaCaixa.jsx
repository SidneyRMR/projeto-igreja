import diocese from "../img/diocese.png"

export default function (props) {

    return (
        <div className="borda">
            {/* <img src={diocese} alt="" sizes="500x300" /> */}
            {/* <br /> */}
            {/* <h1 className="title">Paróquia Santa Cruz</h1> */}
            <h1 className="title">Abertura de Caixa</h1>
            <div className="abertura" >Selecione um Caixa Disponível:
                <select className="">
                    <option value="cx1">Caixa 1</option>
                    <option value="cx2">Caixa 2</option>
                    <option value="cx3">Caixa 3</option>
                </select>
            </div>
            <div className="abertura" >Valor em caixa: <input type="text" /></div>
            <a className="aberturaBotao" href="/cadastros">Cadastrar</a>
            <a className="aberturaBotao" href="/vendas">Abrir caixa</a>
            <a className="aberturaBotao" href="/">Sair</a>
        </div>
    )
}