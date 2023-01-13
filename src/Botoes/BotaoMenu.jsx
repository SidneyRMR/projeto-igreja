import ModalSangria from "../Vendas/ModalSangria";
import BotaoSair from "./BotaoSair";

import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function BotaoMenu(props) {


    const openModal = () => {
        props.setIsModalSangriaOpen(true);
      };

    return (
            <DropdownButton title='Menu' variant="warning" size="lg">
                <Dropdown.Item >
                    <ModalSangria openModal={openModal}/>
                </Dropdown.Item>
                <Dropdown.Item  href="/fechamento-caixa"  >
                    <div className="botao">
                        Fechamento Caixa
                    </div>
                </Dropdown.Item>
                <Dropdown.Item >
                    <BotaoSair classNameProps='botao' nomeBtn='Sair'/>
                </Dropdown.Item>
            </DropdownButton>

    )
}