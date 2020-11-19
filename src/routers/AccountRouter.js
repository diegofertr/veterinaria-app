import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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
  const [usuario, setUsuario] = useState({})
  const [userInitials, setUserInitials] = useState('')
  const [menu, setMenu] = useState([])

  const isStatic = useBreakpoint( 'sm' )

  const handleLogout = () => {
    dispatch( asyncLogout() )
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('veterinaria_usuario'))
    if (user) {
      setUsuario( user.usuario )
      setMenu( getMenuByRol( user.usuario.rol ))
      setUserInitials( user.usuario.nombre.substr(0, 1) )
    }
  }, [ dispatch, setUsuario, setMenu ])

  const { nombre, rol } = usuario;

  // const handleCloseAside = (e) => {
  //   e.preventDefault();
  //   if (!isStatic) {
  //     setClosed( true )
  //   }
  // }

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
              <span className='uppercase bg-primary text-white text-5xl rounded-full w-24 h-24 flex items-center justify-center'>
                { userInitials }
              </span>
              <span className="text-center text-primary mt-2 bg-neutral bg-opacity-50 p-1 font-medium">
                { nombre }
              </span>
              <span className="text-center text-primary bg-neutral bg-opacity-50 p-1 font-medium">
                { rol }
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
        {/* CONTENIDO CENTRAL DE ADMIN */}
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
        {/* CONTENIDO CENTRAL DE ADMIN */}
      </main>
    </div>
  )
}