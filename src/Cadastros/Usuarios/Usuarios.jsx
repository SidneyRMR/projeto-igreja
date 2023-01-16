import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const getUsuarios = async () => {
        try {
            const res = await axios.get("http://localhost:8800/usuarios")
            setUsuarios(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)))
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getUsuarios()
    }, [setUsuarios])

    function alterar(usuario) {
        window.location.href = `/cadastros/usuarios/cadusuario/?id=${usuario.id_usuario}&nome=${usuario.nome_usuario}&login=${usuario.login}&tipo=${usuario.tipo}`
    }

    const handleDelete = async (id, nome) => {
        console.log(id,nome)
        if (window.confirm('Tem certeza de que deseja excluir este usuário?')) {
          await axios
            .delete('http://localhost:8800/usuarios/' + id)
            .then(({ data }) => {
                const newArray = usuarios.filter((usuario) => usuario.id !== id)
              setUsuarios(newArray)
              toast.success(`${nome} excluído com sucesso`, {
                position: toast.POSITION.TOP_CENTER
            })})
            .catch(({ data }) => console.error(data))
        }
      }

        return (
            <div  >
                <ToastContainer/>
                <div className='title d-flex justify-content-between align-center ' >
                    <button className='botao botaoTitle' onClick={() => window.location.href = "/abertura-caixa"}>Voltar</button>
                    Lista de Usuários
                    <button className="botao botaoTitle" onClick={() => window.location.href = "/cadastros/usuarios/cadusuario"}>Novo</button>
                </div>
                <Table className='tabela'>
                    <thead>
                        <tr >
                            {/* <th>Id</th> */}
                            <th>Nome</th>
                            <th>Login</th>
                            <th>Tipo</th>
                            <th width='20%'>Ações</th>
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