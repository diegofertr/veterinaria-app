import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { cargarVacunas } from '../../../actions/ficha';

export const VacunasScreen = () => {

  const dispatch = useDispatch();
  const { vacunas } = useSelector(state => state.ficha)
  console.log('[VacunasScreen] vacunas :: ', vacunas);

  const handleRefreshVacunas = () => {
    dispatch( cargarVacunas() );
  }

  return (
    <div>
      <div className="my-2 flex sm:flex-row flex-col">
        <div className="w-full flex justify-between">
          <div className="flex space-x-4">
            <button
              className="text-sm bg-info hover:bg-opacity-75 text-white font-semibold py-2 px-4 rounded-md">
              <em className="fas fa-plus mr-2"></em>
              Nueva vacuna
            </button>
            <button
              className="focus:outline-none"
              onClick={ handleRefreshVacunas }>
              <em className="fas fa-sync-alt"></em>
            </button>
          </div>
          <div className="flex flex-row mb-1 sm:mb-0">
            <span className="text-gray-800 font-bold">Otras acciones</span>
          </div>
        </div>
      </div>
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Descripción
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha de Revacunación
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Etiqueta
              </th>
            </tr>
          </thead>
            <tbody>
              {
                vacunas.map( item => (
                  <tr key={ item.id }>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        { item.nombreVacuna }
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        { item.descripcion }
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        { item.fecha }
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        { item.fechaRevacunacion }
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">{ item.id }</span>
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
        </table>
        {/* <div
          className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
          <span className="text-xs xs:text-sm text-gray-900">
              1 a 4 de 50 Vacunas
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
              Anterior
            </button>
            <button
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
              Siguiente
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
