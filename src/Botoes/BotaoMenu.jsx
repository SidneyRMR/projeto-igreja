import ModalSangria from "../Vendas/ModalSangria";
import BotaoSair from "./BotaoSair";

import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function BotaoMenu(props) {


    const openModal = () => {
        props.setIsModalSangriaOpen(true);
      };

    return (
        <div className="ls-custom-select w-200">

            <DropdownButton title='Menu' variant="warning" size="lg"
              id="botaoMenu">
                <Dropdown.Item >
                    <ModalSangria openModal={openModal} />
                </Dropdown.Item>
                <Dropdown.Item  href="/fechamento-caixa"  >
                    <div className="botao">
                        Informações
                    </div>
                </Dropdown.Item>
                <Dropdown.Item >
                    <BotaoSair classNameProps='botao' nomeBtn='Fechar Cx'/>
                </Dropdown.Item>
            </DropdownButton>
        </div>

    )
}