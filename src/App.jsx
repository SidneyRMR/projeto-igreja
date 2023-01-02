import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react'
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
// import Pagamento from './Pagamento/Pagamento'
import Sangria from './Sangria/Sangria'
import Vendas from './Vendas/Vender'


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/vendas" element={<Vendas />}/>
          <Route path="/sangria" element={<Sangria />}/>
          {/* <Route path="/vendas/pagamento" element={<Pagamento />}/> */}
          <Route path="/fechamento-geral" element={<FechamentoGeral />}/>
          <Route path="/fechamento-caixa" element={<FechamentoCaixa />}/>
          <Route path="/detalhe-caixa" element={<DetalheCaixa />}/>
          <Route path="/cadastros/usuarios" element={<Usuarios />}/>
          <Route path="/cadastros/usuarios/cadusuario" element={<CadastroUsuario />}/>
          <Route path="/cadastros/produtos" element={<Produtos />}/>
          <Route path="/cadastros/produtos/cadproduto" element={<CadastroProduto />}/>
          <Route path="/abertura-caixa" element={<AberturaCaixa />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App