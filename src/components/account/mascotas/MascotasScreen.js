import React from 'react'
import { pets } from '../../../data/pets'
import { MascotaCard } from './MascotaCard'

export const MascotasScreen = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Mis mascotas</h1>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {
          pets.map( mascota => (
            <MascotaCard key={ mascota.uid } { ...mascota } />
          ))
        }
      </div>
    </div>
  )
}
