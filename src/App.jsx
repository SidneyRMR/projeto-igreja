import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react'

import './App.css';
import AberturaCaixa from './AberturaCaixa/AberturaCaixa'
import Cadastros from './Cadastros/Cadastros'
import CadastroProdutos from './Cadastros/Produtos/Produtos'
import CadastroUsuarios from './Cadastros/Usuarios/Usuarios'
import FechamentoCaixa from './Fechamento/FechamentoCaixa'
import FechamentoGeral from './Fechamento/FechamentoGeral'
import Login from './Login/Login'
import Pagamento from './Pagamento/Pagamento'
import Sangria from './Sangria/Sangria'
import Vendas from './Vendas/Vender'

export default () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/vendas" element={<Vendas />}/>
          <Route path="/sangria" element={<Sangria />}/>
          <Route path="/vendas/pagamento" element={<Pagamento />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/fechamento-geral" element={<FechamentoGeral />}/>
          <Route path="/fechamento-caixa" element={<FechamentoCaixa />}/>
          <Route path="/cadastros" element={<Cadastros />}/>
          <Route path="/cadastros/usuarios" element={<CadastroUsuarios />}/>
          <Route path="/cadastros/produtos" element={<CadastroProdutos />}/>
          <Route path="/abertura-caixa" element={<AberturaCaixa />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
