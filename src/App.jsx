import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useState } from 'react';
import React, { Suspense, lazy } from 'react';

// import AberturaCaixa from './AberturaCaixa/AberturaCaixa'
import Festas from './Cadastros/Festas/Festas'
import CadastroFesta from './Cadastros/Festas/CadFesta'
import Produtos from './Cadastros/Produtos/Produtos'
import CadastroProduto from './Cadastros/Produtos/CadProduto'
import Usuarios from './Cadastros/Usuarios/Usuarios'
import CadastroUsuario from './Cadastros/Usuarios/CadUsuario'
import GestaoCaixa from './Gerenciamento/GestaoCaixa'
import DetalheCaixa from './Gerenciamento/DetalheCaixa'
import Gerenciamento from './Gerenciamento/Gerenciamento'
// import Login from './Login/Login'
import Vendas from './Vendas/Vender'
import Estoque from './Cadastros/Festas/Estoque'

const AberturaCaixa = lazy(() => import('./AberturaCaixa/AberturaCaixa'))
const Login = lazy(() => import('./Login/Login'))

const App = () => {
  
  // const [usuario, setUsuario] = useState({});
  // const [usuarioLogado, setUsuarioLogado] = useState(false)



  // function imprime() {
  //   console.log(usuario.nome_usuario)
  //   console.log(usuarioLogado)
  // }

  //   const verificarUsuarioLogado = () => {
  //   // console.log(usuarioLogado)
  //   // vou deixar como se usuario estiver false não retornar p /, pois ainda nao consegui fazer setar como true usando Login como acesso
  //   if (usuarioLogado) { 
  //     return true
  //   } else {
  //     return false
  //   }
  // }


  return (
    <div className='App'>
    <BrowserRouter>
      <Suspense fallback={<div className='title'>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/igreja/vendas" element={/* verificarUsuarioLogado() || */ <Vendas />} />
          <Route path="/igreja/gerenciamento" element={/* verificarUsuarioLogado() || */ <Gerenciamento />} />
          <Route path="/igreja/gestao-caixa" element={/* verificarUsuarioLogado() || */ <GestaoCaixa />} />
          <Route path="/igreja/detalhe-caixa" element={/* verificarUsuarioLogado() || */ <DetalheCaixa />} />
          <Route path="/igreja/cadastros/usuarios" element={/* verificarUsuarioLogado() || */ <Usuarios />} />
          <Route path="/igreja/cadastros/usuarios/cadusuario" element={/* verificarUsuarioLogado() || */ <CadastroUsuario />} />
          <Route path="/igreja/cadastros/produtos" element={/* verificarUsuarioLogado() || */ <Produtos />} />
          <Route path="/igreja/cadastros/produtos/cadproduto" element={/* verificarUsuarioLogado() || */ <CadastroProduto />}/>
          <Route path="/igreja/cadastros/festas" element={/* verificarUsuarioLogado() || */ <Festas />} />
          <Route path="/igreja/cadastros/festas/estoque" element={/* verificarUsuarioLogado() || */ <Estoque />} />
          <Route path="/igreja/cadastros/festas/cadfesta" element={/* verificarUsuarioLogado() || */ <CadastroFesta />}/>
          <Route path="/igreja/abertura-caixa" element={/* verificarUsuarioLogado() || */ 
              <AberturaCaixa /* usuario={usuario} *//>}/>
          <Route path="igreja/*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App