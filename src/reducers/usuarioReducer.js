import { types } from '../types/types'

const initialState = {
  usuarios: [],
}

export const usuarioReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.usuariosLoad:
      return {
        ...state,
        usuarios: [ ...action.payload ]
      }

    default:
      return state;
  }
}