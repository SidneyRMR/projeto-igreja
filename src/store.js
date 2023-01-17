// store.js
import { configureStore  } from 'redux';

// Criação do estado inicial
const initialState = {
  caixa: {}
};

// Criação do reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CARREGA':
      return {
        count: state.count + 1
      };
    default:
      return state;
  }
}

// Criação da store
const store = configureStore(reducer);

export default store;

