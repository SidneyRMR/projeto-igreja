import Form from 'react-bootstrap/Form';

const CadUsuario = () => {

    return (
        <div className="borda">
            <br />
            <h1 className='title'>Cadastro de Usuario</h1> <br />
            <input className="nomeUsuario" type="text" placeholder="Nome Completo" /><br />
            <input className="loginUsuario" type="text" placeholder="Usuário" /><br />
            <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Administrador"
                />
            </Form>
            <a id="cadastrar" href="/cadastros/Usuarios">Cadastrar</a>
            {/* <button onClick={e => abrirCaixa}>Entrar</button> */}
        </div>
    )
}

export default CadUsuario