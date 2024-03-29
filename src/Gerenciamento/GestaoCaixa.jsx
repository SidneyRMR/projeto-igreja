import FuncoesCaixa from "../AberturaCaixa/FuncoesCaixa";
import InfoUsuario from "./InfoUsuario";
import TabelaProdutosVendidos from "./TabelaProdutosVendidos";

const GestaoCaixa = () => {
    const caixa = JSON.parse(sessionStorage.getItem('caixa'));
    return (
        <div>
            <div className='title d-flex justify-content-between'> 
                <button className="botao botaoTitle" onClick={() => window.location.href = "/vendas"}>Voltar</button>
                Informações sobre Vendas

                {/* este botao deverá levar até a tela de fechamento do caixa, criar novo componente ou modal fecharCaixa */}
                <FuncoesCaixa classNameProps="botao botaoTitle" valor='fecharParcialCaixa' nomeBtn='Fechar caixa' id={caixa.id_caixa} caixa={caixa}/>
            </div>
            
            <InfoUsuario  />

            <TabelaProdutosVendidos />

        </div>
    )
}

export default GestaoCaixa