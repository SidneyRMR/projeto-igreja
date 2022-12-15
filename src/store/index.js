import { createStore } from 'redux';
import { Provider } from 'react-redux';

function caixaReducer(state = {}, action) {
    switch (action.type) {
      case 'SET_CAIXA_VALOR_ENTRADA':
        return { ...state, caixaValorEntrada: action.caixaValorEntrada };
      case 'SET_CAIXA_NOME':
        return { ...state, caixaNome: action.caixaNome };
      default:
        return state;
    }
  }
  