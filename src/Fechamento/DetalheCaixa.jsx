import aDetalhes from '../data/caixas-detalhe';


const DetalheCaixa = () => {

    function getDetalhes() {
        return aDetalhes.map((oDetalhe, i) => {
            let valorVendaTotalProduto = oDetalhe.qde * oDetalhe.valUnitario
            
            return (
                <tr key={i}
                    className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    <td>{oDetalhe.descricao}</td>
                    <td>{oDetalhe.qde}</td>
                    <td>{oDetalhe.tipo}</td>
                    <td>{oDetalhe.valUnitario.toFixed(2).replace('.',',')}</td>
                    <td>{valorVendaTotalProduto.toFixed(2).replace('.',',')}</td>
                </tr>
            )
        })
    }

    return (
        <div className='tabela'>
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Quantidade</th>
                        <th>Tipo</th>
                        <th>Valor R$</th>
                        <th>Total R$</th>
                    </tr>
                </thead>
                <tbody>
                    {getDetalhes()}
                </tbody>
            </table>
            <a href="/fechamento-geral">Voltar</a>
        </div>
    )
}

export default DetalheCaixa