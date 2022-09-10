
export default function(props) {

    return(
        <div>
            <p>Valor em caixa: <input type="text" /></p>
            <p>Caixas Disponíveis: 
                <select>
                    <option value="cx1">Caixa 1</option>
                    <option value="cx2">Caixa 2</option>
                    <option value="cx3">Caixa 3</option>
                </select>
            </p>
            <a className="aberturaCaixa" href="/cadastros">Abrir cadastros</a>
            <a className="aberturaCaixa" href="/abertura-caixa">Abrir caixa</a>
        </div>
    )
}