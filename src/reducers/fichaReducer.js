import { types } from "../types/types";

const initialState = {
  vacunas: [],
  cirugias: [],
  desparacitaciones: [],
  vitaminas: [],
}

export const fichaReducer = ( state = initialState, action ) => {
  switch (action.type) {
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