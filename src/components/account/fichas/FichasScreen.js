import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { cargarFichas, setFicha } from '../../../actions/ficha'

export const FichasScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { auth: { uid }, ficha: { fichas } } = useSelector(state => state)

  useEffect(() => {
    dispatch( cargarFichas( uid ) )
  }, [ dispatch, uid ])

  const handleRefreshFichas = () => {
    dispatch( cargarFichas( uid ) )
  }

  const handleToFicha = ( ficha ) => {
    dispatch( setFicha( ficha.id ) )
    history.push(`/cuenta/ficha/${ ficha.mascota.id }`);
  }

  return (
    <div>
      <div className='mb-8'>
        <h1 className="text-center text-3xl font-bold">Fichas médicas</h1>
      </div>
      <div>
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="w-full flex justify-between">
            <div className="flex space-x-4">
              <button
                className="text-sm bg-info hover:bg-opacity-75 text-white font-semibold py-2 px-4 rounded-md">
                <em className="fas fa-plus mr-2"></em>
                Nueva ficha médica
              </button>
              <button
                className="focus:outline-none"
                onClick={ handleRefreshFichas }>
                <em className="fas fa-sync-alt"></em>
              </button>
            </div>
            {/* <div className="flex flex-row mb-1 sm:mb-0">
              <span className="text-gray-800 font-bold">Otras acciones</span>
            </div> */}
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
                        ID Ficha Medica
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Nombre Mascota
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Edad Mascota
                      </th>
                      <th className="px-6 py-3 bg-gray-50"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      fichas.map( item => (
                        <tr key={ item.id }>
                          <td className="px-6 py-4 whitespace-no-wrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm leading-5 font-medium text-gray-900">
                                  { item.id }
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm leading-5 text-gray-900 break-words">
                              { item.mascota ? item.mascota.nombre : '-' }
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm leading-5 text-gray-900 break-words">
                              { item.mascota ? item.mascota.edad : '-' }
                              {/* { item.idVeterinario } */}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                            <div className='grid gap-2'>
                              {/* <button
                                onClick={ handleToFicha.bind(this, item ) }
                                className="text-sm bg-secondary hover:bg-opacity-75 text-white font-semibold py-2 rounded-md">
                                <em className="fas fa-pencil-alt mr-2"></em>
                                Editar ficha médica
                              </button> */}
                              <button onClick={ handleToFicha.bind(this, item ) } className="inline-flex items-center justify-center py-2 focus:outline-none text-info bg-gray-200 hover:shadow rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='mr-2 w-4 h-auto'>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Ver ficha medica
                              </button>
                              {/* <button className="focus:outline-none text-warning">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='w-6'>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button className="focus:outline-none text-error">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='w-6'>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button> */}
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
      </div>
    </div>
  )
}
