import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { firebase } from '../firebase/firebase-config'
import { login } from '../actions/auth'

import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { AccountRouter } from './AccountRouter'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {

  const dispatch = useDispatch()

  const [checking, setChecking] = useState( true );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged( (user) => {
      if ( user?.uid ) {
        dispatch( login( user.uid, user.displayName ) );
        setIsLoggedIn( true );
      } else {
        // logout??
        setIsLoggedIn( false );
      }

      setChecking( false );
    });
  }, [ dispatch, setChecking, setIsLoggedIn ]);

  if ( checking ) {
    return(
      <div className="flex flex-col h-screen w-screen items-center justify-center bg-neutral">
        <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="w-10/12 text-primary text-sm md:text-base tracking-wide mt-5 text-center">
          Espere unos segundos, por favor....
        </p>
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={ AuthRouter }
            isAuthenticated={ isLoggedIn } />
          <PublicRoute
            exact
            path="/"
            component={ JournalScreen }
            isAuthenticated={ isLoggedIn } />
          <PrivateRoute
            path="/cuenta"
            component={ AccountRouter }
            isAuthenticated={ isLoggedIn } />
        </Switch>
      </div>
    </Router>
  )
}
