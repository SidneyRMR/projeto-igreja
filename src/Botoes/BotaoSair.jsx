export default function BotaoSair(props) {
    return (
        
        <button style={props.btbStyle} className={props.classNameProps} onClick={() => {
            window.location.href = '/igreja/abertura-caixa'
            // sessionStorage.removeItem('usuario');
            sessionStorage.removeItem('caixa');
          }}>{props.nomeBtn}</button>
        
    )
}