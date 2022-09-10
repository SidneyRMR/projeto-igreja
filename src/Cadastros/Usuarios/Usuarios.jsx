
import Table from 'react-bootstrap/Table';
import usuarios from '../../data/usuarios';


export default function(props) {

    function getUsuarios() {
        return usuarios.map((usuario, i) => {
            return (
                <tr key={usuario.id}
                    className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    <td >{usuario.nome}</td>
                    <td>{usuario.login}</td>
                    <td>{usuario.senha}</td>
                    <td></td>
                    <td><button >Alterar</button></td>
                </tr>
                  )
                })
            }


        return (
            <div className='borda'>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Login</th>
                        <th>Senha</th>
                        <th>Administrador</th>
                    </tr>
                </thead>
                <tbody>
                    {getUsuarios()}
                </tbody>
            </Table>

            </div>
        )
    }