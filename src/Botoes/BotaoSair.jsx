export default function BotaoSair(props) {
    return (
        
        <button style={props.btbStyle} className='botao' onClick={() => {
            window.location.href = '/'
            sessionStorage.removeItem('usuario');
            sessionStorage.removeItem('caixa');
          }}>Sair</button>
        
    )
}