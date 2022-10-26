import usuarios from '../../data/usuarios';

const Usuarios = () => {

    function getUsuarios() {
        return usuarios.map((usuario, i) => {
            return (
                <tr key={usuario.id}
                    className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    <td >{usuario.nome}</td>
                    <td>{usuario.login}</td>
                    {/* <td>{usuario.senha}</td> */}
                    <td>{usuario.adm}</td>
                    <td><button >Alterar</button></td>
                </tr>
                  )
                })
            }


        return (
            <div className='tabela'>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Login</th>
                        {/* <th>Senha</th> */}
                        <th>Administrador</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {getUsuarios()}
                </tbody>
            </table>
            <a className="cadastrar" href="/cadastros/cadusuario">Cadastrar</a>
            <a className="voltar" href="/abertura-caixa">Voltar</a>

            </div>
        )
    }

    export default Usuarios