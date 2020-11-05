import { loadVacunas } from "../helpers/loadVacunas";
import { types } from "../types/types";

export const cargarVacunas = () => {
  return async ( dispatch ) => {
    const vacunas = await loadVacunas();
    dispatch( setVacunas( vacunas ) );
  }
}

export const setVacunas = ( vacunas ) => ({
  type: types.vacunasLoad,
  payload: vacunas
});