import { types } from "../types/types";

const initialState = {
  idFicha: '',
  vacunas: [],
  cirugias: [],
  desparacitaciones: [],
  vitaminas: [],

  fichas: [],
}

export const fichaReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.fichaLoad:
      return {
        ...state,
        idFicha: action.payload
      }

    case types.fichasLoad:
      console.log('|> datos de fichas a setear en store :: ', action.payload)
      return {
        ...state,
        fichas: action.payload
      }

    case types.vacunasLoad:
      return {
        ...state,
        vacunas: [ ...action.payload ]
      }

    case types.cirugiasLoad:
      return {
        ...state,
        cirugias: [ ...action.payload ]
      }

    case types.desparacitacionesLoad:
      return {
        ...state,
        desparacitaciones: [ ...action.payload ]
      }

    case types.vitaminasLoad:
      return {
        ...state,
        vitaminas: [ ...action.payload ]
      }

    default:
    return state;
  }
}