import usuarios from '../../data/usuarios';

const Usuarios = () => {

    function getUsuarios() {
        return usuarios.map((usuario, i) => {
            return (
                <tr key={usuario.id}
                    className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    <td >{usuario.nome}</td>
                    <td>{usuario.login}</td>
                    <td>{usuario.senha}</td>
                    <button onClick={() => window.location.href=`/cadastros/usuarios/cadusuario/?id=${usuario.id}`}>Alterar</button>
                </tr>
                  )
                })
            }


        return (
            <div  >
            <table className='tabela'>
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
            </table>
            <div>
            <button id="cadastrar" onClick={() => window.location.href="/cadastros/usuarios/cadusuario"}>Cadastrar</button>
            <button id="voltar" onClick={() => window.location.href="/abertura-caixa"}>Voltar</button>

            </div>

            </div>
        )
    }

    export default Usuarios