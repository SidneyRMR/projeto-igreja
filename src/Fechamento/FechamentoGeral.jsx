import { Table } from "react-bootstrap"
import { api } from "../services/api"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'

import FuncoesCaixa from '../AberturaCaixa/FuncoesCaixa'
import ModalDetalheCaixa from "./ModalDetalheCaixa"

const FechamentoGeral = (props) => {

    const [caixasUsuarios, setCaixasUsuarios] = useState([])

    const getCaixasUsuarios = async () => {
        try {
          const res = await api.get("/vw_caixas_usuarios");
          setCaixasUsuarios(res.data.sort((a, b) => (a.id_caixa < b.id_caixa ? 1 : -1)))
        } catch (error) {
          toast.error(error)
        }
      }
      useEffect(() => {
        getCaixasUsuarios()
      }, [caixasUsuarios])

      const openModal = () => {
        props.setIsModalOpen(true)
    };


     return (
         <div>
            <div className='title d-flex justify-content-between'> 
            <button className="botao botaoTitle " onClick={() => window.location.href = "/abertura-caixa"}>Voltar</button>
                Fechamento Geral
                <div>{''}</div>
            </div>
             <ToastContainer/>
             <Table className="tabela">
                 <thead>
                     <tr>
                         {/* <th>Id caixa</th> */}
                         <th>Usuário</th>
                         <th>Festa</th>
                         <th>Data Abertura</th>
                         <th>Data Fechamento</th>
                         <th width='12%'>Status</th>
                         <th width='25%'>Ações</th>
                     </tr>
                 </thead>

                 <tbody>
                     {caixasUsuarios.map((caixa, i) => (
                         <tr key={caixa.id_caixa} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                             <td>{caixa.nome_usuario}</td>
                             <td>{caixa.id_festa}</td>
                             <td>{caixa.data_abertura.slice(0, -14)}</td>
                             <td>{caixa.data_fechamento.slice(0, -14)}</td>
                             <td>
                                <div className={caixa.status_caixa === 'Fechado' ? 'fechado' : caixa.status_caixa === 'Aberto' ? 'aberto' : 'parcial' }>
                                    {caixa.status_caixa}
                                </div>
                            </td>
                             <td>
                                <ModalDetalheCaixa openModal={openModal} caixa={caixa}/>
                                {caixa.status_caixa === 'Aberto' &&
                                    <FuncoesCaixa nomeBtn='Fechar Caixa' valor='fecharCaixa' id={caixa.id_caixa} caixa={caixa}/>
                                }
                                {caixa.status_caixa === 'Fechamento parcial' &&
                                    <FuncoesCaixa nomeBtn='Fechar Caixa' valor='fecharCaixa' id={caixa.id_caixa} caixa={caixa}/>
                                }
                                {!caixa.status_caixa === 'Fechado' &&
                                    <FuncoesCaixa nomeBtn='Fechar Caixa' valor='fecharCaixa' id={caixa.id_caixa} caixa={caixa}/>
                                }
                            </td>
                         </tr>
                         ))}
                 </tbody>
             </Table>
         </div>
     )
 }
 

export default FechamentoGeral