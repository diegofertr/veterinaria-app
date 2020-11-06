import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { AppNavbar } from '../../layouts/AppNavbar'

export const JournalScreen = () => {

  const [isOpen, setOpen] = useState(false)

  return (
    <div>
      {/* <AppNavbar /> */}
      <main>
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-screen-xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>

              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <Link to="/" aria-label="Home">
                        <img className="h-16 w-auto sm:h-16" src={ "./assets/images/logoPet.svg" } alt="LogoPet" />
                      </Link>
                      <div className="-mr-2 flex items-center md:hidden">
                        <button type="button" onClick={() => setOpen( true )} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" id="main-menu" aria-label="Main menu" aria-haspopup="true">
                          <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:ml-10 md:pr-4">
                    <Link to="/pets" className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">
                      Amigos
                    </Link>
                    {/* <a href="#" className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Features</a>
                    <a href="#" className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Marketplace</a> */}
                    <Link to="/auth/login" className="ml-8 font-medium text-primary hover:text-dark transition duration-150 ease-in-out">
                      Inicia sesión
                    </Link>
                    <Link to="/auth/register" className="ml-8 font-medium text-primary hover:text-dark transition duration-150 ease-in-out">
                      Regístrate
                    </Link>
                  </div>
                </nav>
              </div>
              {isOpen && (
                <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                  <div className="rounded-lg shadow-md">
                    <div className="rounded-lg bg-white shadow-xs overflow-hidden" role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
                      <div className="px-5 pt-4 flex items-center justify-between">
                        <div>
                          <img className="h-16 w-auto" src={ "./assets/images/logoPet.svg" } alt="LogoPet" />
                        </div>
                        <div className="-mr-2">
                          <button type="button" onClick={() => setOpen( false )} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Close menu">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="px-2 pt-2 pb-3">
                        <Link to="/pets" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">
                          Amigos
                        </Link>
                      </div>
                      <div>
                        <Link to="/auth/login" className="block w-full px-5 py-3 text-center font-medium text-primary bg-gray-100 hover:bg-gray-200 hover:text-dark focus:outline-none focus:bg-gray-200 focus:text-dark transition duration-150 ease-in-out">
                          Inicia sesión
                        </Link>
                        <Link to="/auth/register" className="block w-full px-5 py-3 text-center font-medium text-primary bg-gray-100 hover:bg-gray-200 hover:text-dark focus:outline-none focus:bg-gray-200 focus:text-dark transition duration-150 ease-in-out">
                          Regístrate
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                    Lleva el control digital
                    <br className="xl:hidden" />
                    <span className="text-primary"> de tu amigo</span>
                  </h2>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    VeterinariaApp es la startup que te permite llevar el control digital de tus amigos peluditos de la mano de un médico veterinario confiable.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link to="/auth/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:border-dark focus:shadow-outline-primary transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                        Regístrate
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link to="/" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-primary bg-green-100 hover:text-dark hover:bg-green-50 focus:outline-none focus:shadow-outline-primary focus:border-green-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                        Adopta a tu amigo
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1415369629372-26f2fe60c467?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="" />
          </div>
        </div>
        {/* <div className="py-16">
          <div className="container m-auto px-6">
            <div className="lg:flex justify-between items-center">
              <div className="lg:w-6/12 lg:p-0 p-7">
                <h1 className="text-4xl font-bold leading-tight mb-5 capitalize">  Nos preocupamos por los mejores amigos. </h1>
                <p className="text-xl">Queremos verte experimentar la alegría de toda la vida con tus mascotas.</p>
                <div className="py-5">
                  <Link to="/auth/register" className="text-white rounded-full py-2 px-5 text-lg font-semibold bg-primary inline-block border border-primary mr-3">
                    Regístrate
                  </Link>
                </div>
              </div>
              <div className="lg:w-5/12 order-2">
                <img
                  src={ "./assets/images/joyride.svg" }
                  alt="bg-imagen"
                  className="rounded"
                />
              </div>
            </div>
          </div>
        </div> */}
        {/* style={ "transform: scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg);" } */}
      </main>
    </div>
  )
}
