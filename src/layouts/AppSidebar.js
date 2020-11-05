import React from 'react'
import { NavLink } from 'react-router-dom'
import './AppSidebar.scss'

export const AppSidebar = () => {
  return (
    <aside className="flex flex-col h-full fondo-sidebar">
      <div className="border-b border-gray-400 p-3">
        <h1 className="text-lg inline-flex items-center">
          <em className="fas fa-paw mr-1"></em>
          <span className="hidden md:block">Veterinaria App</span>
        </h1>
      </div>
      <div className="mt-5 w-full flex flex-col text-gray-800">
        <NavLink
          activeClassName="bg-accent bg-opacity-25 text-secondary"
          className="hover:bg-success w-full p-3 cursor-pointer"
          exact
          to="/cuenta">
          <em className="fas fa-box mr-5"></em>
          Inicio
        </NavLink>
        <NavLink
          activeClassName="bg-accent text-secondary"
          className="hover:bg-success w-full p-3 cursor-pointer"
          exact
          to="/cuenta/usuarios">
          <em className="fas fa-users mr-5"></em>
          Usuarios
        </NavLink>
        <NavLink
          activeClassName="bg-accent text-secondary"
          className="hover:bg-success w-full p-3 cursor-pointer"
          exact
          to="/cuenta/mascotas">
          <em className="fas fa-paw mr-5"></em>
          Mascotas
        </NavLink>
        <NavLink
          activeClassName="bg-accent text-secondary"
          className="hover:bg-success w-full p-3 cursor-pointer"
          exact
          to="/cuenta/cirugias">
          <em className="fas fa-x-ray mr-5"></em>
          Cirugias
        </NavLink>
      </div>
    </aside>
  )
}
