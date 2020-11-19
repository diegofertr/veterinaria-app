import { types } from '../types/types'

const initialState = {
  mascotas: [],
}

export const mascotaReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.mascotasLoad:
      return {
        ...state,
        mascotas: [ ...action.payload ]
      }

    default:
      return state;
  }
}