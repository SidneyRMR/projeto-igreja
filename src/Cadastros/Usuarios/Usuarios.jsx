import { api } from "../../services/api";
import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const getUsuarios = async () => {
        try {
            const res = await api.get("/usuarios")
            setUsuarios(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)))
        } catch (error) {
            console.error(error)
        }
    }

    function alterar(usuario) {
        window.location.href = `/igreja/cadastros/usuarios/cadusuario/?id=${usuario.id_usuario}&nome=${usuario.nome_usuario}&login=${usuario.login}&idfesta=${usuario.id_festa}&tipo=${usuario.tipo}`
    }

    const handleDelete = async (id, nome) => {
        console.log(id,nome)
        if (window.confirm('Tem certeza de que deseja excluir este usuário?')) {
            await api.delete('/usuarios/' + id)
            .then(({ data }) => {
                const newArray = usuarios.filter((usuario) => usuario.id !== id)
              setUsuarios(newArray)
              toast.success(`${nome} excluído com sucesso`, {
                  position: toast.POSITION.TOP_CENTER
                })})
                .catch(({ data }) => console.error(data))
            }
        }
        
        useEffect(() => {
            getUsuarios()
        }, [setUsuarios])

        const [festas, setFestas] = useState([]);
        // console.log(festas);
        const getFestas = async () => {
          try {
            const res = await api.get("/festas");
            setFestas(res.data.filter(festa => +festa.data_termino.slice(8, 10) === 0)) 
          } catch (error) {
            toast.error(error);
          }
        };
        useEffect(() => {
          getFestas();
        }, [setFestas]);
        // fim do trecho

        return (
            <div  >
                <ToastContainer/>
                <div className='title d-flex justify-content-between align-center ' >
                    <button className='botao botaoTitle' onClick={() => window.location.href = "/igreja/abertura-caixa"}>Voltar</button>
                    Lista de Usuários
                    <button className="botao botaoTitle" onClick={() => window.location.href = "/igreja/cadastros/usuarios/cadusuario"}>Novo</button>
                </div>
                <Table className='tabela'>
                    <thead>
                        <tr >
                            {/* <th>Id</th> */}
                            <th>Nome</th>
                            <th>Login</th>
                            <th>Tipo</th>
                            <th>Festa</th>
                            <th width='25%'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, i) => {
                            return (
                                <tr key={usuario.id_usuario}
                                    className={i % 2 === 0 ? 'Par' : 'Impar'}>
                                    {/* <td >{usuario.id}</td> */}
                                    <td >{usuario.nome_usuario}</td>
                                    <td>{usuario.login}</td>
                                    <td>{usuario.tipo}</td>
                                    <td>{
                                    // console.log(festas.find(festa => festa.id_festa === usuario.id_festa).id_festa)
                                    festas ? (festas.find(festa => +festa.id_festa === +usuario.id_festa)?.nome_festa) : 'Carregando...'

                                    }</td>
                                    <td>
                                        <button className='botao' onClick={() => alterar(usuario)}>Alterar</button>
                                        <button className='botao' onClick={() => handleDelete(usuario.id_usuario, usuario.nome_usuario)}>Excluir</button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>


            </div>
        )
    }

    export default Usuarios