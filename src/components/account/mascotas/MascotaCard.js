import React from 'react'
import { Link } from 'react-router-dom'

export const MascotaCard = ({
  uid,
  nombre,
  especie,
  raza,
  edad,
  fichaId,
  urlImage
}) => {
  return (
    <div className="md:flex shadow-lg mx-6 md:mx-auto max-w-lg md:max-w-2xl">
      <img className="h-64 w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={ urlImage } alt={ nombre } />
      <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg flex flex-col justify-between">
        <div className="flex items-center">
          <h2 className="text-xl text-gray-800 font-medium mr-auto">{ nombre }</h2>
          {/* <p className="text-gray-800 font-semibold tracking-tighter">
            only
            <i className="text-gray-600 line-through">60$</i>
            48$
          </p> */}
        </div>
        <p className="text-sm text-gray-700 mt-4">
          { raza }
        </p>
        <div className="flex flex-wrap items-center justify-end mt-4 top-auto">
          <button className="mt-3 w-full inline-flex justify-center items-center rounded-md shadow-sm px-4 py-2 bg-error bg-opacity-80 hover:bg-opacity-75 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            <em className="fas fa-trash-alt mr-1"></em>Eliminar
          </button>
          <button className="mt-3 w-full inline-flex justify-center items-center rounded-md shadow-sm px-4 py-2 bg-warning bg-opacity-80 hover:bg-opacity-75 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          <em className="fas fa-pencil-alt mr-1"></em>Editar
          </button>
          {/* <button className=" bg-blue-600 text-gray-200 px-2 py-2 rounded-md ">Crear Ficha</button> */}
          <Link
            className="mt-3 w-full inline-flex justify-center items-center rounded-md shadow-sm px-4 py-2 bg-info bg-opacity-80 hover:bg-opacity-75 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            to={ `/cuenta/ficha/${ uid }` }>
            <em className={`fas fa-${fichaId ? 'heartbeat' : 'plus'} mr-1`}></em> { fichaId ? 'Ver Ficha': 'Crear Ficha'}
          </Link>
          {/* <button type="button" onClick={ handleCloseModal } className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancel
          </button> */}
        </div>
      </div>
    </div>
  )
  // {/* <div className="border border-gray-300 rounded-lg hover:border-gray-500">
  //   <img className="w-full bg-cover rounded-t-lg h-40" src={ urlImage } alt={ nombre } />
  //   <div className="p-5">
  //     <div>
  //       <p className="text-xl">
  //         { nombre }
  //       </p>
  //       <p className="text-base text-gray-700">
  //         { raza }
  //       </p>
  //     </div>
  //     <div className="mt-5">
  //       <Link className="text-primary font-bold" to={ `/cuenta/ficha/${ uid }` }>
  //         <em className="fas fa-heartbeat mr-2"></em>Ver ficha médica
  //       </Link>
  //     </div>
  //   </div>
  // </div> */}
}
