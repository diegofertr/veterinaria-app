import React from 'react'
import { useDispatch } from 'react-redux'
import { asyncLogout } from '../../actions/auth'

export const AccountNavbar = () => {

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch( asyncLogout() )
  }

  return (
    <div className="border-b border-gray-400 flex justify-between p-3">
      <button className="focus:outline-none">
        <em className="fas fa-bars text-xl"></em>
      </button>
      <span>pets</span>
      <button
        onClick={ handleLogout }
        className="focus:outline-none">
        <em className="fas fa-sign-out-alt text-xl"></em>
      </button>
    </div>
  )
}
