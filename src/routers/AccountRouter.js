import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { AccountScreen } from '../components/account/AccountScreen'
import { MascotasScreen } from '../components/account/mascotas/MascotasScreen'
import { UsuariosScreen } from '../components/account/usuarios/UsuariosScreen'

import { AppSidebar } from '../layouts/AppSidebar'
import { AccountNavbar } from '../components/account/AccountNavbar'
// import { CirugiasScreen } from '../components/account/ficha/CirugiasScreen'
import { FichaScreen } from '../components/account/ficha/FichaScreen'

export const AccountRouter = () => {
  return (
    <>
      <div className="flex">
        <div className="w-1/6 h-screen">
          <AppSidebar />
        </div>
        <main className="w-5/6">
          <AccountNavbar />
          <div className="py-5 px-10">
            <Switch>
              <Route
                exact
                path="/cuenta"
                component={ AccountScreen } />
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
              {/* <Route
                exact
                path="/cuenta/cirugias"
                component={ CirugiasScreen } /> */}
              <Redirect to="/cuenta" />
            </Switch>
          </div>
        </main>
      </div>
    </>
  )
}