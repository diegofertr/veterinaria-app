import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addVacuna, cargarVacunas } from '../../../actions/ficha';
import { useForm } from '../../../hooks/useForm';

export const VacunasScreen = () => {

  const dispatch = useDispatch();
  const { vacunas } = useSelector(state => state.ficha)
  console.log('[VacunasScreen] vacunas :: ', vacunas);
  const [modalVacuna, setModalVacuna] = useState(false)

  const [ formValues, handleInputChange] = useForm({
    nombreVacuna: '',
    descripcion: '',
    fecha: '',
    fechaRevacunacion: ''
  })

  const { nombreVacuna, descripcion, fecha, fechaRevacunacion } = formValues

  const handleRefreshVacunas = () => {
    dispatch( cargarVacunas() );
  }

  const handleOpenModal = () => {
    setModalVacuna(true)
  }

  const handleCloseModal = () => {
    setModalVacuna(false)
  }

  const handleAddVacuna = () => {
    dispatch( addVacuna(
      nombreVacuna,
      descripcion,
      fecha,
      fechaRevacunacion
    ) )

    dispatch( cargarVacunas() )

    setModalVacuna(false)
  }

  return (
    <div>
      <div className="my-2 flex sm:flex-row flex-col">
        <div className="w-full flex justify-between">
          <div className="flex space-x-4">
            <button
              onClick={ handleOpenModal }
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
      {
        modalVacuna && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      <em className="fas fa-syringe mr-2"></em>
                      Agregar vacuna
                    </h3>
                    <form onSubmit={ handleAddVacuna }>
                      <div className="mt-2 flex flex-col">
                        <input
                          type="text"
                          placeholder="Nombre de la vacuna"
                          name="nombreVacuna"
                          autoComplete="off"
                          value={ nombreVacuna }
                          onChange={ handleInputChange }
                          className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                        />
                        <input
                          type="text"
                          placeholder="Descripción"
                          name="descripcion"
                          autoComplete="off"
                          value={ descripcion }
                          onChange={ handleInputChange }
                          className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                        />
                        <input
                          type="text"
                          placeholder="Fecha de vacuna"
                          name="fecha"
                          autoComplete="off"
                          value={ fecha }
                          onChange={ handleInputChange }
                          className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                        />
                        <input
                          type="text"
                          placeholder="Fecha de revacunacion"
                          name="fechaRevacunacion"
                          autoComplete="off"
                          value={ fechaRevacunacion }
                          onChange={ handleInputChange }
                          className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                        />
                      </div>
                      <div className="py-5 flex justify-end items-end">
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                          <button type="button" onClick={ handleCloseModal } className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Cancelar
                          </button>
                        </span>
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                          <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-secondary text-base leading-6 font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:border-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Guardar vacuna
                          </button>
                        </span>
                      </div>
                      {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                          <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-secondary text-base leading-6 font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:border-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Guardar vacuna
                          </button>
                        </span>
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                          <button type="button" onClick={ handleCloseModal } className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Cancelar
                          </button>
                        </span>
                      </div> */}
                    </form>
                  </div>
                </div>


              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
