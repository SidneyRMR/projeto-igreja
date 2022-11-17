

const Pagamento = () => {

    return (
        <div className='tabela' id='tabelasCentralizadas'>
            <h1 className="titlePgto">Opções de Pagamento</h1>
            <table >
                <thead>
                    <tr>
                        <th>Crédito</th>
                        <th>Débito</th>
                        <th>Dinheiro</th>
                        <th>Pix</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr align='center'>
                        <td><input type="text" className="cred" /></td>
                        <td><input type="text" className="deb" /></td>
                        <td><input type="text" className="din" /></td>
                        <td><input type="text" className="pix" /></td>
                    </tr>
                    <tr id="pagamento">
                        <td align={2}>Total Pago</td>
                        <td align={2}>{'R$ 50,00'}</td>
                   
                        <td align={2}>Troco</td>
                        <td align={2}>{'R$ 5,00'}</td>
                    </tr>
                </tbody>
            </table>
            <a id="confirmar" href="/vendas">Confirmar</a>
            <a id="voltar" href="/vendas">Voltar</a>
        </div>
    )
}


export default Pagamento