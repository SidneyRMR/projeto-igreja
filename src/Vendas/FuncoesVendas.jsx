export default function FuncoesVendas(props) {
    


   const novaVenda = async () => {
    console.log(props.propsDebito, props.propsCredito, props.propsDinheiro, props.propsPix)
    // alert('Teste', props.propsDebito)

    }

    
    return (
        <>
            <div>
                <div type='button' className='botao w-100' 
                    onClick={() => novaVenda()}>{props.nomeBtn}
                </div>

            </div>
            
        </>
    )
}