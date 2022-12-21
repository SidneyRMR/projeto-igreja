

const Pagamento = () => {

    return (
        <div >
            <div className="title">Opções de Pagamento</div>
            <table className="tabela">
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
                    <tr>
                        <td align={2}>Total Pago</td>
                        <td align={2}>{'R$ 50,00'}</td>
                   
                        <td align={2}>Troco</td>
                        <td align={2}>{'R$ 5,00'}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => window.location.href="/vendas"}>Confirmar</button>
            <button onClick={() => window.location.href="/vendas"}>Voltar</button>
        </div>
    )
}


export default Pagamento