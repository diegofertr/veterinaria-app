import React from 'react'
import { useSelector } from 'react-redux'

export const AccountScreen = () => {

  const { name } = useSelector(state => state.auth)

  return (
    <>
      <div className="mt-8 flex flex-col items-center">
        <img className="w-40" src={ "./assets/images/friends.svg" } alt="imagen people" />
        <p className="mt-2 text-2xl">
          Bienvenid@, { name }
        </p>
      </div>
      <p className="text-center mt-5">
        Lleva el control de tu mascota de manera digital, accede a información de controles como vacunas, cirugías y demás.
      </p>
    </>
  )
}
