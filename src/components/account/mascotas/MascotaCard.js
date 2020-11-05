import React from 'react'
import { Link } from 'react-router-dom'

export const MascotaCard = ({
  uid,
  nombre,
  especie,
  raza,
  edad,
  urlImage
}) => {
  return (
    <div className="border border-gray-300 rounded-lg hover:border-gray-500">
      <img className="w-full bg-cover rounded-t-lg h-40" src={ urlImage } alt={ nombre } />
      <div className="p-5">
        <div>
          <p className="text-xl">
            { nombre }
          </p>
          <p className="text-base text-gray-700">
            { raza }
          </p>
        </div>
        <div className="mt-5">
          <Link className="text-primary font-bold" to={ `/cuenta/ficha/${ uid }` }>
            <em className="fas fa-heartbeat mr-2"></em>Ver ficha médica
          </Link>
        </div>
      </div>
    </div>
  )
}
