import { useState,useEffect } from "react";
import BotaoSair from "./BotaoSair";

export default function BotaoMenu() {
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



    return (
        <div>

            {/* MENU SUSPENSO */}
            <div style={{ position: 'absolute', top: '1px', left: '5px', zIndex: 1, padding: '9px' }}>
                {/* Exibe o botão de menu */}
                <button className='botao' onClick={() => setIsOpen(!isOpen)}>Menu</button>
                {/* Exibe o menu se o estado isOpen for verdadeiro */}
                {isOpen && (
                    <div style={{ position: 'absolute', top: '1px', left: '5px', padding: '9px' }}>
                        <button className='botao' onClick={() => setIsOpen(!isOpen)}>Menu</button>
                        <button className='botao' style={{ position: 'absolute', top: '46px', left: '5px', width: '150px', padding: '9px' }} onClick={() => {
                            setIsOpen(true)
                        }}>Sangria</button>
                        <button className='botao' style={{ position: 'absolute', top: '86px', left: '5px', width: '150px', padding: '9px' }} onClick={() => {
                            window.location.href = "/fechamento-caixa"
                        }}>Fechamento Caixa</button>
                        <BotaoSair btbStyle={{ position: 'absolute', top: '126px', left: '5px', width: '150px', padding: '9px' }} />

                    </div>
                )}
            </div>
        </div>
    )
}