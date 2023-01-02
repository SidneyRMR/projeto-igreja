import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])

    const getUsuarios = async () => {
        try{
            const res = await axios.get("http://localhost:8800/usuarios")
            setUsuarios(res.data.sort((a,b) => (a.id > b.id ? 1 : -1)))
        } catch (error) {
            toast.error(error)
        }
    }


    useEffect(() => {
        getUsuarios()
    }, [setUsuarios])

    const handleDelete = async (id) => {
        await axios
            .delete('http://localhost:8800/usuarios/' + id)
            .then(({ data }) => {
                const newArray = usuarios.filter((usuario) => usuario.id_usuario !== id)

                setUsuarios(newArray)
                toast.success(data)
            })
            .catch(({ data }) => toast.error(data))
    }


    function mostrarUsuarios() {
        return usuarios.map((usuario, i) => {
            return (
                <tr key={usuario.id_usuario}
                    className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    <td >{usuario.id_usuario}</td>
                    <td >{usuario.nome_usuario}</td>
                    <td>{usuario.login}</td>
                    <td>{usuario.senha}</td>
                    <td>
                        <button onClick={() => window.location.href=`/cadastros/usuarios/cadusuario/?id=${usuario.id_usuario}`}>Alterar</button>
                        <button onClick={() => handleDelete(usuario.id_usuario)}>Excluir</button>
                    </td>
                </tr>
                  )
                })
            }


        return (
            <div  >
            <table className='tabela'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Login</th>
                        <th>Senha</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {mostrarUsuarios()}
                </tbody>
            </table>
            <div>
            <button id="cadastrar" onClick={() => window.location.href="/cadastros/usuarios/cadusuario"}>Cadastrar</button>
            <button id="voltar" onClick={() => window.location.href="/abertura-caixa"}>Voltar</button>

            </div>

            </div>
        )
    }

    export default Usuarios