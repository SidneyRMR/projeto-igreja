export default function FuncoesVendas(props) {
    
   const novaVenda = async () => {
        // try {

        //     const id_caixa = 
        //     await axios.post('http://localhost:8800/compras', {
        //         id_caixa: 
        // });
        // //   Loop pelos produtos da lista de compras
        //   for (const produto of produtos) {
        //     // Adiciona uma linha à tabela "tb_compras" para cada produto
        //     await axios.post('http://localhost:8800/tb_compraprodutos', {
        //         id_produto: produto.id,
        //         quantidade_produto: produto.quantidade,
        //         id_compra: 1,
        //     });
        // }

        //   console.log(`Lista de compras salva com sucesso`);
        // } catch (error) {
        //   console.log(error);
        // }
    }

    
//     return (
        <>
            {props.valor === "novaVenda" &&
                <button className='botao' 
                    onClick={() => novaVenda()}>{props.nomeBtn}
                </button>
            }
        </>
//     )
}