import { useState, useEffect } from "react";
import ModalSangria from "../Vendas/ModalSangria";
import BotaoSair from "./BotaoSair";

export default function BotaoMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    // Adiciona um evento de clique fora do menu quando o componente é montado
    useEffect(() => {
        function handleClickOutside(event) {
            // Verifica se o clique foi fora do menu e do botão
            if (event.target.closest('.menu') || event.target.closest('button')) {
                return
            }// Fecha o menu
            setIsOpen(false)
        }
        document.addEventListener('click', handleClickOutside);
        // Remove o evento de clique quando o componente é desmontado
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])

    const openModal = () => {
        props.setIsModalSangriaOpen(true);
      };

    return (
        <div>

            {/* MENU SUSPENSO */}
            <div style={{ position: 'absolute', padding: '10px', width: '200px' }}>
            {!isOpen && (
                <button className='botao menu' onClick={() => setIsOpen(!isOpen)}>Menu</button>)}
                {isOpen && (
                    <div 
                    style={{ position: 'absolute', padding: '10px', width: '200px' }}>
                        <button className='botao menu' onClick={() => setIsOpen(!isOpen)}>Menu</button>

                        <ModalSangria openModal={openModal}/>

                        <div>
                            <button className='botao' onClick={() => {window.location.href = "/fechamento-caixa"
                                }}>Fechamento Caixa
                            </button>

                        </div>

                        <BotaoSair classNameProps='botao' nomeBtn='Sair'/>

                    </div>
                )}
            </div>
        </div>
    )
}