import React, { useMemo, useState } from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLogout } from '../actions/auth'

import { CuentaScreen } from '../components/account/CuentaScreen'
import { MascotasScreen } from '../components/account/mascotas/MascotasScreen'
import { UsuariosScreen } from '../components/account/usuarios/UsuariosScreen'
import { FichaScreen } from '../components/account/ficha/FichaScreen'
import { FichasScreen } from '../components/account/fichas/FichasScreen'

// import { AppSidebar } from '../layouts/AppSidebar'
import useBreakpoint from '../hooks/useBreakpoint'
import Transition from '../components/elements/Transition'
import FocusTrap from '../components/elements/FocusTrap'
import { getMenuByRol } from '../selectors/getMenuByRol'

export const AccountRouter = () => {

  const dispatch = useDispatch()
  const [isClosed, setClosed] = useState( false )

  const isStatic = useBreakpoint( 'sm' )

  const handleLogout = () => {
    dispatch( asyncLogout() )
  }

  const { name, rol } = useSelector(state => state.auth)
  // const handleCloseAside = (e) => {
  //   e.preventDefault();
  //   if (!isStatic) {
  //     setClosed( true )
  //   }
  // }

  const menu = useMemo(() => getMenuByRol( rol ), [ rol ])
  // console.log('menu obtenido :: ', menu)

  return (
    <div className="flex bg-neutral bg-opacity-50">
      <Transition
        show={( isStatic || !isClosed )}
        enter="transition-all duration-500"
        enterFrom="-ml-72"
        enterTo="ml-0"
        leave="transition-all duration-500"
        leaveTo="-ml-72"
      >
        <aside className={`z-20 bg-white w-72 min-h-screen flex flex-col ${isStatic ? '' : 'fixed'}`}>
          <FocusTrap isActive={!isStatic}>
            <div className="bg-white border-r text-xl border-b px-4 h-12 flex items-center justify-between">
              <span className="text-primary py-2">
                <em className="fas fa-paw mr-1"></em>
                Veterinaria
              </span>
              {!isStatic && (
                <button
                  autoFocus
                  aria-label="Close menu"
                  title="Close menu"
                  onClick={() => setClosed(true)}
                  className="w-10 p-1"
                >
                  {/* focus:outline-none */}
                  <em className="fas fa-times text-dark text-xl"></em>
                </button>
              )}
            </div>
            <div className="fondo-auth py-10 px-4 flex flex-col items-center justify-center border-b">
              <img className="h-24 w-24" src={ "/assets/images/profile.png" } alt="imagen people" />
              <span className="text-center text-primary mt-2 bg-neutral bg-opacity-50 p-1 rounded font-medium">
                { name }
              </span>
            </div>
            <div className="border-r flex-grow flex flex-col">
                { menu.map( item => (
                  <NavLink
                    key={ item.to }
                    activeClassName="bg-accent bg-opacity-10 hover:bg-opacity-15 border-r-4 border-primary text-primary"
                    className="hover:bg-accent hover:bg-opacity-10 w-full p-4 cursor-pointer text-dark text-lg"
                    exact
                    to={ item.to }>
                    <em className={`${item.to} mr-5`}></em>
                    { item.label }
                  </NavLink>
                ))}
              {/* <NavLink
                activeClassName="bg-accent bg-opacity-10 hover:bg-opacity-15 border-r-4 border-primary text-primary"
                className="hover:bg-accent hover:bg-opacity-10 w-full p-4 cursor-pointer text-dark text-lg"
                exact
                to="/cuenta">
                <em className="fas fa-home mr-5"></em>
                Inicio
              </NavLink>
              <NavLink
                activeClassName="bg-accent bg-opacity-10 hover:bg-opacity-15 border-r-4 border-primary text-primary"
                className="hover:bg-accent hover:bg-opacity-10 w-full p-4 cursor-pointer text-dark text-lg"
                exact
                to="/cuenta/usuarios">
                <em className="fas fa-users mr-5"></em>
                Usuarios
              </NavLink>
              <NavLink
                activeClassName="bg-accent bg-opacity-10 hover:bg-opacity-15 border-r-4 border-primary text-primary"
                className="hover:bg-accent hover:bg-opacity-10 w-full p-4 cursor-pointer text-dark text-lg"
                exact
                to="/cuenta/mascotas">
                <em className="fas fa-paw mr-5"></em>
                Mascotas
              </NavLink>
              <NavLink
                activeClassName="bg-accent bg-opacity-10 hover:bg-opacity-15 border-r-4 border-primary text-primary"
                className="hover:bg-accent hover:bg-opacity-10 w-full p-4 cursor-pointer text-dark text-lg"
                exact
                to="/cuenta/fichas">
                <em className="fas fa-file-medical mr-5"></em>
                Fichas médicas
              </NavLink> */}
            </div>
          </FocusTrap>
        </aside>
      </Transition>
      <Transition
        appear={true}
        show={!isStatic && !isClosed}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-50"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-50"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black opacity-0"></div>
      </Transition>
      <main className="w-full flex-grow flex flex-col min-h-screen">
        <header className="bg-white border-b h-12 flex items-center justify-center">
          {!isStatic && (
              <button
                tabIndex="1"
                aria-hidden={!isClosed}
                aria-label="Open menu"
                title="Open menu"
                onClick={() => setClosed(false)}
                className="w-10 p-1 focus:outline-none"
              >
                <em className="fas fa-bars text-xl"></em>
              </button>
            )
          }
          <div className="flex flex-grow items-center justify-between px-3">
            <div></div>
            <button
              onClick={ handleLogout }
              className="focus:outline-none text-primary font-medium text-lg">
              <em className="fas fa-sign-out-alt mr-2"></em>
              <span className="text-base">Cerrar sesión</span>
            </button>
          </div>
        </header>
        <div className="py-5 px-10">
          <Switch>
            <Route
              exact
              path="/cuenta"
              component={ CuentaScreen } />
            <Route
              exact
              path="/cuenta/ficha/:petId"
              component={ FichaScreen } />
            <Route
              exact
              path="/cuenta/usuarios"
              component={ UsuariosScreen } />
            <Route
              exact
              path="/cuenta/mascotas"
              component={ MascotasScreen } />
            <Route
              exact
              path="/cuenta/fichas"
              component={ FichasScreen } />
            <Redirect to="/cuenta" />
          </Switch>
        </div>
      </main>
    </div>
  )
}