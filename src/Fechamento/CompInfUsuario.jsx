import { useEffect, useState } from "react"

export default function CompInfUsuario(props) {
    const [valor, setValor] = useState(0)
    const [nome, setNome] = useState('')
    const [styleProps, setStyleProps] = useState({})

    useEffect(() =>{
        setValor(props.valor)
        setNome(props.nome)
        setStyleProps(props.styleProps)
    },[props])

    return(
                <div className="bg-orange d-flex justify-content-between">
                    <span className="al-left">{nome}</span>
                    <span className="al-right" style={styleProps}>{valor}</span>
                </div>
    )
}