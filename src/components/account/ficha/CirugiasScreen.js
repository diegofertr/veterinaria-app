import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addCirugia, cargarCirugias, deleteCirugia, editCirugia } from '../../../actions/ficha';
import { useForm } from '../../../hooks/useForm';
import Swal from 'sweetalert2'

export const CirugiasScreen = () => {

  const dispatch = useDispatch();
  const { cirugias } = useSelector(state => state.ficha)
  const [modalCirugia, setModalCirugia] = useState(false)
  const [cirugiaId, setCirugiaId] = useState('')

  const [ formValues, handleInputChange, handleSetAllData, reset ] = useForm( {
    tipo: '',
    fecha: '',
    observacion: ''
  } )

  const { tipo, fecha, observacion } = formValues

  const handleRefreshCirugias = () => {
    dispatch( cargarCirugias() );
  }

  const handleOpenModal = () => {
    setModalCirugia(true)
  }

  const handleCloseModal = () => {
    setCirugiaId('')
    reset();
    setModalCirugia(false)
  }

  const handleAddCirugia = () => {
    if (cirugiaId === '') {
      dispatch( addCirugia(
        tipo,
        fecha,
        observacion
      ) )
    } else {
      dispatch( editCirugia(
        cirugiaId,
        tipo,
        fecha,
        observacion
      ) )
    }

    dispatch( cargarCirugias() )

    setModalCirugia(false)
  }

  const handleEdit = ( item ) => {
    setCirugiaId( item.id )
    handleSetAllData( item )
    setModalCirugia( true );
  }

  const handleDelete = ( id ) => {
    console.log('eliminando');
    Swal.fire({
      title: 'Estás segura/o de eliminar esta cirugia?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar',
      // confirmButtonColor: 'bg-primary'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch( deleteCirugia( id ) )
        Swal.fire('Cirugia eliminada correctamente!', '', 'success')
        dispatch( cargarCirugias() )
      }
    })
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
              Nueva cirugia
            </button>
            <button
              className="focus:outline-none"
              onClick={ handleRefreshCirugias }>
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
                      Tipo
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Observacion
                    </th>
                    <th className="px-6 py-3 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    cirugias.map( item => (
                      <tr key={ item.id }>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="flex items-center">
                            {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="" />
                            </div> */}
                            <div className="ml-4">
                              <div className="text-sm leading-5 font-medium text-gray-900">
                              { item.tipo }
                              </div>
                              {/* <div className="text-sm leading-5 text-gray-500">
                                información extra
                              </div> */}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">{ item.fecha }</div>
                          {/* <div className="text-sm leading-5 text-gray-500">información extra</div> */}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">{ item.observacion }</div>
                        </td>


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
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {
        modalCirugia && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      {/* <em className="fas fa-syringe mr-2"></em> */}
                      {
                        cirugiaId === '' ? 'Agregar cirugia' : 'Editar cirugia'
                      }
                    </h3>
                    <form onSubmit={ handleAddCirugia }>
                      <div className="mt-2 flex flex-col">
                        <input
                          type="text"
                          placeholder="Tipo de cirugia"
                          name="tipo"
                          autoComplete="off"
                          value={ tipo }
                          onChange={ handleInputChange }
                          className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                        />
                        <input
                          type="text"
                          placeholder="Fecha de cirugia"
                          name="fecha"
                          autoComplete="off"
                          value={ fecha }
                          onChange={ handleInputChange }
                          className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                        />
                        <input
                          type="text"
                          placeholder="Observacion"
                          name="observacion"
                          autoComplete="off"
                          value={ observacion }
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
                          <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-primary text-base leading-6 font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:border-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            {
                              cirugiaId === '' ? 'Guardar cirugia' : 'Actualizar cirugia'
                            }
                          </button>
                        </span>
                      </div>
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
