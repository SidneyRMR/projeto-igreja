import { Table } from "react-bootstrap";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

import FuncoesCaixa from '../AberturaCaixa/FuncoesCaixa';

const FechamentoGeral = () => {

     // Recupera o valor do usuario da tela de login
    //  const usuario = JSON.parse(sessionStorage.getItem('usuario'));

     // Este trecho busca os caixas no BD e seta os valores na const caixas
     const [caixas, setCaixas] = useState([])
     const getCaixas = async () => {
         try {
             const res = await axios.get("http://localhost:8800/caixas")
             setCaixas(res.data.sort((a, b) => (a.id_caixas > b.id_caixas ? 1 : -1)))
         } catch (error) {
             toast.error(error)
         }
     }
     useEffect(() => {
         getCaixas()
     }, [setCaixas, caixas ])
     // fim do trecho 
     return (
         <div>
            <div className='title d-flex justify-content-between p-1'> 
            <button className="botao botaoTitle " onClick={() => window.location.href = "/abertura-caixa"}>Voltar</button>
                
                Fechamento Geral
                <div>{'          '}</div>
            </div>
             <ToastContainer/>
             <Table className="tabela">
                 <thead>
                     <tr>
                         <th>Usuário</th>
                         <th>Abertura</th>
                         <th>Sangria</th>
                         <th>Data Abertura</th>
                         <th>Hora Abertura</th>
                         <th>Data Fechamento</th>
                         {/* <th>Data Fechamento</th> */}
                         {/* <th>Hora da Compra?</th> */}
                         {/* <th>Debito</th>
                         <th>Credito</th>
                         <th>Dinheiro</th>
                         <th>Pix</th>
                         <th>Total de venda</th> */}
                         <th>Festa</th>
                         <th>Status</th>
                         <th>Ações</th>
                     </tr>
                 </thead>
                 <tbody>
                     {caixas.map((caixa, i) => (
                         <tr key={caixa.id_caixa} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                             <td>{caixa.id_usuario}</td>
                             <td>{caixa.abertura}</td>
                             <td>{caixa.sangria}</td>
                             <td>{caixa.data_abertura.slice(0, -14)}</td>
                             <td>{caixa.hora_abertura}</td>
                             <td>{caixa.data_fechamento.slice(0, -14)}</td>
                             {/* Preciso imporar este valores do tb_compras acessando pelo id_compra */} 

                            {/* O ideal seria vazer uma view desta tabela vw_fechamento_caixa!!! */}
                             {/* <td>{tb_compras.pgDebito}</td>
                             <td>{compras.pgCredito}</td>
                             <td>{compras.pgDinheiro}</td>
                             <td>{compras.pgPix}</td> */}
                             {/* <td>{caixa.pgDebito+caixa.pgCredito+caixa.pgDinheiro+caixa.pgPix}</td> */}
                             <td>{caixa.id_festa}</td>
                             <td>
                                <div className={caixa.status_caixa === 'Fechado' ? 'caixaFechado' : 'caixaAberto'}>
                                    {caixa.status_caixa}

                                </div>
                            </td>
                             
                             {/* Passar param para que acesse o caixa selecionado */}
                             <td>
                                 <button className="botao" onClick={() => window.location.href=`/detalhe-caixa/?id=${caixa.id_caixa}`}>
                                    Detalhes
                                </button>
                                {/*
                                <button onClick={() => FuncoesCaixa.fecharCaixa(caixa.id_caixa, caixa)}>
                                    Fechar
                                </button> */}
                                {/* Chamada componente */}
                                <FuncoesCaixa nomeBtn='Fechar Caixa' valor='fecharCaixa' id={caixa.id_caixa} caixa={caixa}></FuncoesCaixa>
                                {/* <FuncoesCaixa nomeBtn='Abrir Caixa' valor='abrirCaixa' ></FuncoesCaixa> */}
                            </td>
                         </tr>
                         ))}
 
                 </tbody>
             </Table>

         </div>
     )
 }
 

export default FechamentoGeral