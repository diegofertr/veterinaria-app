import React from 'react'
import { NavLink } from 'react-router-dom'

export const AppNavbar = () => {

  return (
    <nav className="border-b border-gray-200 flex justify-between p-3">
      <div>LogoVeterinaria</div>
      <div className="">
        <NavLink
          activeClassName="text-secondary"
          className="text-primary font-bold hover:text-primaryAccent"
          exact
          to="/auth/login">
          Iniciar sesión
        </NavLink>
      </div>
    </nav>
  )
}
