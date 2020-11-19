import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addVacuna, cargarVacunas, deleteVacuna, editVacuna } from '../../../actions/ficha';
import { useForm } from '../../../hooks/useForm';
import Swal from 'sweetalert2'

export const VacunasScreen = () => {

  const dispatch = useDispatch();
  const { ficha: { vacunas, idFicha }, auth: { rol } } = useSelector( state => state )
  // console.log('[VacunasScreen] vacunas');
  console.log('user rol', rol)
  const [modalVacuna, setModalVacuna] = useState(false)
  const [vacunaId, setVacunaId] = useState('')

  const [ formValues, handleInputChange, handleSetAllData, reset ] = useForm( {
    nombreVacuna: '',
    descripcion: '',
    fecha: '',
    fechaRevacunacion: ''
  } )

  const { nombreVacuna, descripcion, fecha, fechaRevacunacion } = formValues

  const handleRefreshVacunas = () => {
    dispatch( cargarVacunas( idFicha ) );
  }

  const handleOpenModal = () => {
    setModalVacuna(true)
  }

  const handleCloseModal = () => {
    setVacunaId('')
    reset();
    setModalVacuna(false)
  }

  const handleAddVacuna = () => {
    if (vacunaId === '') {
      dispatch( addVacuna(
        idFicha,
        nombreVacuna,
        descripcion,
        fecha,
        fechaRevacunacion
      ) )
    } else {
      dispatch( editVacuna(
        vacunaId,
        nombreVacuna,
        descripcion,
        fecha,
        fechaRevacunacion
      ) )
    }

    dispatch( cargarVacunas( idFicha ) )

    setVacunaId('')
    reset()
    setModalVacuna(false)
  }

  const handleEdit = ( item ) => {
    setVacunaId( item.id )
    handleSetAllData( item )
    setModalVacuna( true );
  }

  const handleDelete = ( id ) => {
    console.log('eliminando');
    Swal.fire({
      title: 'Estás segura/o de eliminar esta vacuna?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar',
      // confirmButtonColor: 'bg-primary'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch( deleteVacuna( id ) )
        Swal.fire('Vacuna eliminada correctamente!', '', 'success')
      }
    })
    dispatch( cargarVacunas( idFicha ) )
  }

  return (
    <div>
      <div className="my-2 flex sm:flex-row flex-col">
        <div className="w-full flex justify-between">
          <div className="flex space-x-4">
            { rol === 'VETERINARIO' && (
              <button
                onClick={ handleOpenModal }
                className="text-sm bg-info hover:bg-opacity-75 text-white font-semibold py-2 px-4 rounded-md">
                <em className="fas fa-plus mr-2"></em>
                Nueva vacuna
              </button>
            )}
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
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de Revacunación
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Etiqueta
                    </th>
                    { rol === 'VETERINARIO' && (
                      <th className="px-6 py-3 bg-gray-50"></th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    vacunas.map( item => (
                      <tr key={ item.id }>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="flex items-center">
                            {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="" />
                            </div> */}
                            <div className="ml-4">
                              <div className="text-sm leading-5 font-medium text-gray-900">
                              { item.nombreVacuna }
                              </div>
                              {/* <div className="text-sm leading-5 text-gray-500">
                                información extra
                              </div> */}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm leading-5 text-gray-900 break-words">{ item.descripcion }</div>
                          {/* <div className="text-sm leading-5 text-gray-500">información extra</div> */}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">{ item.fecha }</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">{ item.fechaRevacunacion }</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            { item.id }
                          </span>
                        </td>
                        { rol === 'VETERINARIO' && (
                          <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                            <div className='grid gap-2'>
                              <button onClick={ handleEdit.bind(this, item) } className="focus:outline-none text-warning">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='w-6'>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button onClick={ handleDelete.bind(this, item.id) } className="focus:outline-none text-error">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='w-6'>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      { modalVacuna && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <form onSubmit={ handleAddVacuna }>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg> */}
                    <em className="fas fa-syringe"></em>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      {
                        vacunaId === '' ? 'Agregar vacuna' : 'Editar vacuna'
                      }
                    </h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Nombre de la vacuna"
                        name="nombreVacuna"
                        autoComplete="off"
                        value={ nombreVacuna }
                        onChange={ handleInputChange }
                        className="mt-2 form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                      />
                      <input
                        type="text"
                        placeholder="Descripción"
                        name="descripcion"
                        autoComplete="off"
                        value={ descripcion }
                        onChange={ handleInputChange }
                        className="mt-2 form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                      />
                      <input
                        type="text"
                        placeholder="Fecha de vacuna"
                        name="fecha"
                        autoComplete="off"
                        value={ fecha }
                        onChange={ handleInputChange }
                        className="mt-2 form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                      />
                      <input
                        type="text"
                        placeholder="Fecha de revacunacion"
                        name="fechaRevacunacion"
                        autoComplete="off"
                        value={ fechaRevacunacion }
                        onChange={ handleInputChange }
                        className="mt-2 form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:ml-3 sm:w-auto sm:text-sm">
                  {
                    vacunaId === '' ? 'Guardar vacuna' : 'Actualizar vacuna'
                  }
                </button>
                <button type="button" onClick={ handleCloseModal } className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
