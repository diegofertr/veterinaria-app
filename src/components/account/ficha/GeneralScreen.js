import React from 'react'

export const GeneralScreen = ({
  uid,
  nombre,
  edad,
  raza,
  especie,
  urlImage,
}) => {
  return (
    <div>
      {/* <h1>Información general de tu mascota</h1> */}
      <div
        className="w-full sm:border bg-white sm:border-grey-500 rounded-lg px-1 sm:px-10 md:px-12 pt-10 pb-16 mt-8">
        <h1 className="text-center text-xl font-black pl-3">Información General</h1>
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center items-stretch px-3 py-6 border-b border-grey-500">
            <div className="font-bold text-left mb-6 sm:mb-0 sm:w-2/5">Nombre</div>
            <div className="flex-1 text-left">
              { nombre }
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center items-stretch px-3 py-6 border-b border-grey-500">
            <div className="font-bold text-left mb-6 sm:mb-0 sm:w-2/5">Edad</div>
            <div className="flex-1 text-left">
              { edad }
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center items-stretch px-3 py-6 border-b border-grey-500">
            <div className="font-bold text-left mb-6 sm:mb-0 sm:w-2/5">Raza</div>
            <div className="flex-1 text-left">
              { raza }
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center items-stretch px-3 py-6 border-b border-grey-500 mb-2">
            <div className="font-bold text-left mb-6 sm:mb-0 sm:w-2/5">Especie</div>
            <div className="flex-1 text-left">
              { especie }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
