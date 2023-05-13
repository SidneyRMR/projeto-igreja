export default function BotaoSair(props) {
    return (
        
        <button style={props.btnStyle} className={props.classNameProps} onClick={() => {
            window.location.href = '/igreja/'
            sessionStorage.removeItem('usuario');
            sessionStorage.removeItem('caixa');
          }}>{props.nomeBtn}</button>
        
    )
}