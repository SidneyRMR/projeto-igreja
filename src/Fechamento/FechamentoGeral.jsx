import { Table } from "react-bootstrap";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

import FuncoesCaixa from '../AberturaCaixa/FuncoesCaixa';

const FechamentoGeral = () => {

    const [caixasUsuarios, setCaixasUsuarios] = useState([]);

    const getCaixasUsuarios = async () => {
        try {
          const res = await axios.get("http://localhost:8800/vw_caixas_usuarios");
          setCaixasUsuarios(res.data.sort((a, b) => (a.id_caixas > b.id_caixas ? 1 : -1)));
        } catch (error) {
          toast.error(error);
        }
      };
      
      
      
      useEffect(() => {
        getCaixasUsuarios();
      }, [caixasUsuarios]);

     return (
         <div>
            <div className='title d-flex justify-content-between p-1'> 
            <button className="botao botaoTitle " onClick={() => window.location.href = "/abertura-caixa"}>Voltar</button>
                Fechamento Geral
                <div>{''}</div>
            </div>
             <ToastContainer/>
             <Table className="tabela">
                 <thead>
                     <tr>
                         <th>Usuário</th>
                         <th>Valor Abertura</th>
                         <th>Valor Sangria</th>
                         <th>Valor Total Venda</th>
                         <th>Data Abertura</th>
                         <th>Data Fechamento</th>
                         <th>Festa</th>
                         <th>Status</th>
                         <th width='20%'>Ações</th>
                     </tr>
                 </thead>

                 <tbody>
                     {caixasUsuarios.map((caixa, i) => (
                         <tr key={caixa.id_caixa} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                             <td>{caixa.nome_usuario}</td>
                             <td>{caixa.abertura}</td>
                             <td>{caixa.sangria}</td>
                             <td>vw c/ total venda</td>
                             <td>{caixa.data_abertura.slice(0, -14)}</td>
                             <td>{caixa.data_fechamento.slice(0, -14)}</td>
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
                                <FuncoesCaixa nomeBtn='Fechar Caixa' valor='fecharCaixa' id={caixa.id_caixa} caixa={caixa}/>
                            </td>
                         </tr>
                         ))}
                 </tbody>
             </Table>
         </div>
     )
 }
 

export default FechamentoGeral