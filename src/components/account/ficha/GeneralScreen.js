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
      {/* <div
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
      </div> */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Información de tu mascota
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
            Detalles e información general.
          </p>
        </div>
        <div>
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Nombre
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                { nombre }
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Edad
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                { edad }
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Raza
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                { raza }
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Especie
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                { especie }
              </dd>
            </div>
            {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                About
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Attachments
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                    <div className="w-0 flex-1 flex items-center">
                      <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                      </svg>
                      <span className="ml-2 flex-1 w-0 truncate">
                        resume_back_end_developer.pdf
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                        Download
                      </a>
                    </div>
                  </li>
                  <li className="border-t border-gray-200 pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                    <div className="w-0 flex-1 flex items-center">
                      <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                      </svg>
                      <span className="ml-2 flex-1 w-0 truncate">
                        coverletter_back_end_developer.pdf
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div> */}
          </dl>
        </div>
      </div>
    </div>
  )
}
