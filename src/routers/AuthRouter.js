import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './Routers.scss'

import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AuthRouter = () => {
  return (
    <div className="fondo-auth h-screen w-screen flex justify-center items-center">
      <div className="w-10/12 md:w-1/2 bg-neutral shadow-lg rounded-md p-5">
        <Switch>
          <Route
            exact
            path="/auth/login"
            component={ LoginScreen } />
          <Route
            exact
            path="/auth/register"
            component={ RegisterScreen } />
          <Redirect
            to="/auth/login"
          />
        </Switch>
      </div>
    </div>
  )
}