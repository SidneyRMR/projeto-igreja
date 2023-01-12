import BotaoSair from "../Botoes/BotaoSair";
import InfoUsuario from "./InfoUsuario";
import TabelaProdutosVendidos from "./TabelaProdutosVendidos";

const FechamentoCaixa = () => {
    // Recupera o valor do usuario da tela de login
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const caixa = JSON.parse(sessionStorage.getItem('caixa'));

    return (
        <div>
            <div className='title d-flex justify-content-between p-1'> 
                <button className="botao botaoTitle" onClick={() => window.location.href = "/vendas"}>Voltar</button>
                Fechamento de Caixa      
                <BotaoSair nomeBtn='Fechar Caixa' classNameProps="botao botaoTitle"/>
            </div>
            
            <InfoUsuario usuario={usuario} caixa={caixa}/>

            <TabelaProdutosVendidos caixa={caixa}/>

        </div>
    )
}

export default FechamentoCaixa