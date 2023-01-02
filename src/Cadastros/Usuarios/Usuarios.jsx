import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const getUsuarios = async () => {
        try {
            const res = await axios.get("http://localhost:8800/usuarios")
            setUsuarios(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)))
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getUsuarios()
    }, [setUsuarios])

    function alterar(usuario) {
        window.location.href = `/cadastros/usuarios/cadusuario/?id=${usuario.id}&nome=${usuario.nome}&login=${usuario.login}&tipo=${usuario.tipo}`
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
            .catch(({ data }) => toast.error(data))
        }
      }

        return (
            <div  >
                <ToastContainer/>
                <table className='tabela'>
                    <thead>
                        <tr>
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
                                <tr key={usuario.id}
                                    className={i % 2 === 0 ? 'Par' : 'Impar'}>
                                    {/* <td >{usuario.id}</td> */}
                                    <td >{usuario.nome}</td>
                                    <td>{usuario.login}</td>
                                    <td>{usuario.tipo}</td>
                                    <td>
                                        <button onClick={() => alterar(usuario)}>Alterar</button>
                                        <button onClick={() => handleDelete(usuario.id, usuario.nome)}>Excluir</button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                <div>
                    <button id="cadastrar" onClick={() => window.location.href = "/cadastros/usuarios/cadusuario"}>Cadastrar</button>
                    <button id="voltar" onClick={() => window.location.href = "/abertura-caixa"}>Voltar</button>

                </div>

            </div>
        )
    }

    export default Usuarios