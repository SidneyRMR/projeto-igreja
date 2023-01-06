import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import AberturaCaixa from './AberturaCaixa/AberturaCaixa'
import Produtos from './Cadastros/Produtos/Produtos'
import CadastroProduto from './Cadastros/Produtos/CadProduto'
import Usuarios from './Cadastros/Usuarios/Usuarios'
import CadastroUsuario from './Cadastros/Usuarios/CadUsuario'
import FechamentoCaixa from './Fechamento/FechamentoCaixa'
import DetalheCaixa from './Fechamento/DetalheCaixa'
import FechamentoGeral from './Fechamento/FechamentoGeral'
import Login from './Login/Login'
import Vendas from './Vendas/Vender'
import { useState } from 'react';


const App = () => {

  const [usuarioLogado, setUsuarioLogado] = useState(false)

  const efetuarLogin = () => {
    setUsuarioLogado(true)
  }
  const verificarUsuarioLogado = () => {
    if (!usuarioLogado) { 
      return <Navigate to="/" />
    }
  }


  return (
    <div className='App'>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login efetuarLogin={efetuarLogin}/> } />
        <Route path="/vendas" element={verificarUsuarioLogado() || <Vendas />} />
        <Route path="/fechamento-geral" element={verificarUsuarioLogado() || <FechamentoGeral />} />
        <Route path="/fechamento-caixa" element={verificarUsuarioLogado() || <FechamentoCaixa />} />
        <Route path="/detalhe-caixa" element={verificarUsuarioLogado() || <DetalheCaixa />} />
        <Route path="/cadastros/usuarios" element={verificarUsuarioLogado() || <Usuarios />} />
        <Route path="/cadastros/usuarios/cadusuario" element={verificarUsuarioLogado() || <CadastroUsuario />} />
        <Route path="/cadastros/produtos" element={verificarUsuarioLogado() || <Produtos />} />
          <Route path="/cadastros/produtos/cadproduto" element={verificarUsuarioLogado() || <CadastroProduto />}/>
          <Route path="/abertura-caixa" element={verificarUsuarioLogado() || <AberturaCaixa />}/>
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App