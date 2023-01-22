import ModalSangria from "../Vendas/ModalSangria";
import BotaoSair from "./BotaoSair";

import { Dropdown, DropdownButton } from 'react-bootstrap';
import FuncoesCaixa from "../AberturaCaixa/FuncoesCaixa";

export default function BotaoMenu(props) {


    const openModal = () => {
        props.setIsModalSangriaOpen(true);
      };

    return (
        <div className="ls-custom-select w-200">

            <DropdownButton title='Menu' variant="warning" size="lg"
              id="botaoMenu">
                <Dropdown.Item >
                    <ModalSangria openModal={openModal} saldoCaixa={props.saldoCaixa}/>
                </Dropdown.Item>
                <Dropdown.Item  href="/gestao-caixa"  >
                    <div className="botao">
                        Informações
                    </div>
                </Dropdown.Item>
                <Dropdown.Item >
                    {/* Temporario, preciso fazer uma novatela pro usuario lancar os valores reais em mãos */}
                    <FuncoesCaixa valor='fecharParcialCaixa' classNameProps='botao' nomeBtn='Fechar' id={props.caixa.id_caixa} caixa={props.caixa}/>
                </Dropdown.Item>
                <Dropdown.Item >
                    <BotaoSair classNameProps='botao' nomeBtn='Sair'/>
                </Dropdown.Item>
            </DropdownButton>
        </div>

    )
}