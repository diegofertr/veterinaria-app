import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addFicha, setFicha } from '../../../actions/ficha';
import { addMascota, cargarMascotas, deleteMascota, editMascota } from '../../../actions/mascota';
// import { pets } from '../../../data/pets'
import { useForm } from '../../../hooks/useForm';
import { getUsersByRol } from '../../../selectors/getUser';
// import { MascotaCard } from './MascotaCard';

export const MascotasScreen = () => {

  const dispatch = useDispatch();
  const history = useHistory()

  const { mascotas } = useSelector(state => state.mascota)
  const { uid } = useSelector(state => state.auth)
  console.log( 'uid selected ::::: ', uid )

  useEffect(() => {
    dispatch( cargarMascotas( uid ) );
  }, [ dispatch, uid ])

  const [modalMascota, setModalMascota] = useState(false)
  const [modalFicha, setModalFicha] = useState(false)
  const [selectVeterinario, setSelectVeterinario] = useState(false)
  const [mascotaId, setMascotaId] = useState('')
  const [veterinarios, setVeterinarios] = useState( [] )
  const [veterinario, setVeterinario] = useState( null )

  const [ formValues, handleInputChange, handleSetAllData, reset ] = useForm( {
    nombre: '',
    edad: '',
    raza: '',
    especie: '',
    urlImage: ''
  } )

  // const [ formFicha, handleInputFichaChange ] = useForm( {
  //   veterinarioId: ''
  // } )


  const { nombre, edad, raza, especie, urlImage } = formValues
  // const { veterinarioId } = formFicha

  const handleOpenModal = () => {
    console.log('agregar nueva mascota')
    setModalMascota( true )
  }

  const handleOpenSelect = () => {
    setSelectVeterinario( !selectVeterinario )
  }

  const handleOpenModalFicha = async ( item ) => {
    if ( item.idFicha ) {
      dispatch( setFicha( item.idFicha ) )
      history.push(`/cuenta/ficha/${ item.id }`);
    } else {
      setMascotaId( item.id )
      const _veterinarios = await getUsersByRol('VETERINARIO');
      setVeterinarios( _veterinarios )
      setModalFicha( true )
    }
  }
  console.log('veterinarios', veterinarios)

  const handleCloseModal = () => {
    setMascotaId('')
    reset();
    setModalMascota( false )
  }

  const handleCloseModalFicha = () => {
    // setMascotaId('')
    setVeterinario( null )
    // reset();
    setModalFicha( false )
  }

  const handleRefreshMascotas = () => {
    dispatch( cargarMascotas( uid ) );
  }

  const handleAddMascota = () => {
    // const user = JSON.parse(localStorage.getItem('veterinaria_usuario'))
    if (mascotaId === '') {
      dispatch( addMascota(
        uid,
        nombre,
        edad,
        raza,
        especie,
        urlImage
      ) )
    } else {
      dispatch( editMascota(
        mascotaId,
        {
          nombre,
          edad,
          raza,
          especie,
          urlImage
        }
      ) )
    }

    dispatch( cargarMascotas( uid ) )

    setMascotaId('')
    reset()
    setModalMascota(false)
  }

  const handleAddFicha = () => {
    console.log('añadiendo nueva ficha', veterinario, mascotaId)
    dispatch( addFicha( veterinario.id, mascotaId ) )
    setModalFicha(false)
    setTimeout(() => {
      history.push(`/cuenta/ficha/${ mascotaId }`);
    }, 500);
  }

  const handleEdit = ( item ) => {
    setMascotaId( item.id )
    handleSetAllData( item )
    setModalMascota( true );
  }

  const handleDelete = ( id ) => {
    Swal.fire({
      title: 'Estás segura/o de eliminar esta mascota?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch( deleteMascota( id ) )
        Swal.fire('Mascota eliminada correctamente!', '', 'success')
      }
      // dispatch( cargarMascotas() )
    })
    dispatch( cargarMascotas( uid ) )
  }

  // const handleToFicha = ( mascota ) => {
  //   console.log('Ir a la ficha de la mascota ', mascota);
  //   // console.log('history ', history);
  //   history.push(`/cuenta/ficha/${ mascota.id }`);
  // }

  const handleSelectedVeterinario = ( veterinario ) => {
    console.log('Crear ficha para la mascota ' + mascotaId + 'y asignar al veterinario: ', veterinario)
    setVeterinario( veterinario )
    // dispatch()
    setSelectVeterinario( false )
  }

  return (
    <div>
      <div className='mb-8'>
        <h1 className="text-center text-3xl font-bold">Mis mascotas</h1>
      </div>
      <div className='my-4 space-x-4 w-full'>
        <button
          onClick={ handleOpenModal }
          className="text-sm bg-primary hover:bg-opacity-75 text-white font-semibold py-2 px-6 rounded-md">
          <em className="fas fa-plus mr-2"></em>
          Nueva mascota
        </button>
        <button
          className="focus:outline-none"
          onClick={ handleRefreshMascotas }>
          <em className="fas fa-sync-alt"></em>
        </button>
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <MascotaCard key={ mascota.id } { ...mascota } /> */}
        {
          mascotas.map( mascota => (
            <div className="md:flex shadow-lg mx-6 md:mx-auto max-w-lg md:max-w-2xl" key={ mascota.id }>
              <img className="h-64 w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={ mascota.urlImage } alt={ mascota.nombre } />
              <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg flex flex-col justify-between">
                <div className="flex items-center">
                  <h2 className="text-xl text-gray-800 font-medium mr-auto">{ mascota.nombre }</h2>
                </div>
                <p className="text-sm text-gray-700 mt-4">
                  { mascota.raza }
                </p>
                <div className="flex flex-wrap items-center justify-end mt-4 top-auto">
                  <button onClick={ handleDelete.bind(this, mascota.id) } className="mt-3 w-full inline-flex justify-center items-center rounded-md shadow-sm px-4 py-2 bg-error bg-opacity-80 hover:bg-opacity-75 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    <em className="fas fa-trash-alt mr-1"></em>Eliminar
                  </button>
                  <button onClick={ handleEdit.bind(this, mascota) } className="mt-3 w-full inline-flex justify-center items-center rounded-md shadow-sm px-4 py-2 bg-warning bg-opacity-80 hover:bg-opacity-75 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  <em className="fas fa-pencil-alt mr-1"></em>Editar
                  </button>
                  <button
                    className="mt-3 w-full inline-flex justify-center items-center rounded-md shadow-sm px-4 py-2 bg-info bg-opacity-80 hover:bg-opacity-75 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={ handleOpenModalFicha.bind(this, mascota) }>
                    {/* onClick={ handleToFicha.bind(this, mascota) }> */}
                    <em className={`fas fa-${mascota.idFicha ? 'heartbeat' : 'plus'} mr-1`}></em> { mascota.idFicha ? 'Ver Ficha': 'Crear Ficha'}
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      { modalMascota && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <form onSubmit={ handleAddMascota }>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <em className="fas fa-paw"></em>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      {
                        mascotaId === '' ? 'Agregar mascota' : 'Editar mascota'
                      }
                    </h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Nombre de la mascota"
                        name="nombre"
                        autoComplete="off"
                        value={ nombre }
                        onChange={ handleInputChange }
                        className="mt-2 form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                      />
                      <input
                        type="text"
                        placeholder="Edad"
                        name="edad"
                        autoComplete="off"
                        value={ edad }
                        onChange={ handleInputChange }
                        className="mt-2 form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                      />
                      <input
                        type="text"
                        placeholder="Raza"
                        name="raza"
                        autoComplete="off"
                        value={ raza }
                        onChange={ handleInputChange }
                        className="mt-2 form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                      />
                      <input
                        type="text"
                        placeholder="Especie"
                        name="especie"
                        autoComplete="off"
                        value={ especie }
                        onChange={ handleInputChange }
                        className="mt-2 form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                      />
                      <input
                        type="text"
                        placeholder="Imagen"
                        name="urlImage"
                        autoComplete="off"
                        value={ urlImage }
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
                    mascotaId === '' ? 'Guardar mascota' : 'Actualizar mascota'
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

      { modalFicha && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <form onSubmit={ handleAddFicha }>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <em className="fas fa-file-medical"></em>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Crear ficha médica
                    </h3>
                    <div className="mt-2">
                      <div className='bg-white p-4 border border-l-4 rounded-md text-gray-700 text-sm border-info'>
                        Para crear la ficha médica primero debe seleccionar a un médico veterinario que se encargará de su mascota
                      </div>
                      {/* <div>
                        <select value={ veterinarioId } onChange={ handleInputFichaChange }>
                          <option value="123">Titin</option>
                          <option value="567">Yeyo</option>
                          <option value="890">Yeicko</option>
                          <option value="1111">Lili</option>
                        </select>
                        { veterinarioId }
                      </div> */}
                      <div className="h-32 relative w-full">
                        {/* <input
                          placeholder='Seleccionar veterinario'
                          onClick={ handleOpenSelect }
                          name="veterinarioNombre"
                          value={ veterinario.nombre }
                          className="mt-2 form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base" /> */}
                          {/* name="veterinarioId" */}
                          {/* value={ veterinarioId }
                          onChange={ handleInputFichaChange } */}
                        <div onClick={ handleOpenSelect } className="mt-2 form-input w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base">
                          { !veterinario ? (
                            'Seleccionar veterinario'
                          ): (
                            <span>{ veterinario.nombre }</span>
                          )}
                        </div>
                        {/* <div className="w-full">
                        asd
                          <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                              <div className="flex flex-auto flex-wrap"></div>
                              <input value={ veterinarioId } onChange={ handleInputFichaChange } name="veterinarioId" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                              <div>
                                  <button className="cursor-pointer w-6 h-full flex items-center text-gray-400 outline-none focus:outline-none">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-4 h-4">
                                          <line x1="18" y1="6" x2="6" y2="18"></line>
                                          <line x1="6" y1="6" x2="18" y2="18"></line>
                                      </svg>
                                  </button>
                              </div>
                              <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                                  <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                          <polyline points="18 15 12 9 6 15"></polyline>
                                      </svg>
                                  </button>
                              </div>
                          </div>
                        </div> */}
                        { selectVeterinario && (
                          <div className="absolute shadow top-0 z-100 mt-12 w-full lef-0 rounded overflow-y-auto">
                            <div className="flex flex-col w-full">
                              {veterinarios.map(item => (
                                <div onClick={ handleSelectedVeterinario.bind(this, item)} className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100" key={ item.id }>
                                  <div className="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600">
                                    <div className="w-full items-center flex">
                                      <span className="mx-2 leading-6">{ item.nombre } </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:ml-3 sm:w-auto sm:text-sm">
                  Crear Ficha Médica
                </button>
                <button type="button" onClick={ handleCloseModalFicha } className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
