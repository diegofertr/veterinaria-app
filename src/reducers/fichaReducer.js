import { types } from "../types/types";

const initialState = {
  vacunas: [],
  cirugias: []
}

export const fichaReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.vacunasLoad:
      return {
        ...state,
        vacunas: [ ...action.payload ]
      }

    default:
      return state;
  }
}