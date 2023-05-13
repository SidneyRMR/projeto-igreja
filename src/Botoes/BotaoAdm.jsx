import { useState, useEffect } from "react";

export default function BotaoMenu() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      // Verifica se o clique foi fora do menu e do botão
      if (event.target.closest(".menu") || event.target.closest("button")) {
        return;
      }
      // Fecha o menu
      setIsOpen(false);
    }
    document.addEventListener("click", handleClickOutside);

    // Remove o evento de clique quando o componente é desmontado
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Exibe o botão de menu */}

      <button
        className="botao"
        style={{ width: "200px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Administrativo
      </button>

      {/* Exibe o menu se o estado isOpen for verdadeiro */}
      {isOpen && (
        <div>
          <div className="p-1"></div>
          <button
            className="botao"
            onClick={() => (window.location.href = `/igreja/cadastros/produtos`)}
          >
            Produtos
          </button>
          <button
            className="botao"
            onClick={() => (window.location.href = `/igreja/cadastros/usuarios`)}
          >
            Usuários
          </button>
          <br />
          <button
            className="botao"
            onClick={() => (window.location.href = `/igreja/cadastros/festas`)}
          >
            Festas
          </button>
          <button
            className="botao"
            onClick={() => (window.location.href = `/igreja/gerenciamento`)}
          >
            Caixas
          </button>
          {/* <button
            className="botao"
            onClick={() => (window.location.href = `/estoque`)}
          >
            Estoque
          </button> */}
        </div>
      )}
    </div>
  );
}
