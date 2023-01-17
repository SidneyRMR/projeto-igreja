import BotaoSair from "../Botoes/BotaoSair";
import InfoUsuario from "./InfoUsuario";
import TabelaProdutosVendidos from "./TabelaProdutosVendidos";

const FechamentoCaixa = (props) => {

    return (
        <div>
            <div className='title d-flex justify-content-between'> 
                <button className="botao botaoTitle" onClick={() => window.location.href = "/vendas"}>Voltar</button>
                Informações sobre vendas do caixa     

                {/* este botao deverá levar até a tela de fechamento do caixa, criar novo componente ou modal fecharCaixa */}
                <BotaoSair nomeBtn='Fechar Caixa' classNameProps="botao botaoTitle"/>
            </div>
            
            <InfoUsuario  />

            <TabelaProdutosVendidos />

        </div>
    )
}

export default FechamentoCaixa