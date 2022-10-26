

const CadUsuario = () => {
    
    return (
        <div className="borda">
            <br />
            <h1 className="">Cadastro de Usuario</h1>
            <input className="nomeUsuario" type="text" placeholder="Nome Completo" /><br />
            <input className="loginUsuario" type="text" placeholder="Usuário" /><br />  
            <div className="isAdministrador" > É administrador?
                <select className="">
                    <option value="ehAdminis">Sim</option>
                    <option value="ehAdminis">Não</option>
                </select>
            </div>      
            <a href="/cadastros/Usuarios">Cadastrar</a>
            {/* <button onClick={e => abrirCaixa}>Entrar</button> */}
        </div>
    )
}

export default CadUsuario