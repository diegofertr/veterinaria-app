import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from '../reducers/authReducer'
import { fichaReducer } from '../reducers/fichaReducer';
import { uiReducer } from '../reducers/uiReducer';
import { usuarioReducer } from '../reducers/usuarioReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  ficha: fichaReducer,
  usuario: usuarioReducer
})

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware( thunk )
  )
)