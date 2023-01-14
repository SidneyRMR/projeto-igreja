
export default function CompInfUsuario(props) {

    return(
        <>
            {props !== null ?
                <div className="bg-orange d-flex justify-content-between">
                     <span className="al-left">{props.nomeProps}</span>
                     <span className="al-right" style={props.styleProps}>{props.valorProps}</span>
                </div>
            : 'Algo deu errado!'}
        </>
    )
}