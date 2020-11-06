import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { loginWithGoogle, loginWithEmailPassword } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { msgError, loading } = useSelector(state => state.ui);

  const [ formValues, handleInputChange ] = useForm({
    email: '',
    password: ''
  })

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if ( isFormValid() ) {
      dispatch( loginWithEmailPassword( email, password ) )
    }
  }

  const handleGoogleLogin = () => {
    dispatch( loginWithGoogle() )
  }

  const btnLoginClass = () => {
    return loading
      ? 'mt-12 bg-gray-300 text-gray-600 cursor-not-allowed px-4 py-2 rounded font-bold tracking-wide focus:outline-none'
      : 'mt-12 bg-primary text-white cursor-pointer px-4 py-2 rounded font-bold tracking-wide focus:outline-none'
  }

  const isFormValid = () => {
    if ( !validator.isEmail( email ) ) {
      dispatch( setError('El correo electrónico no es válido.') );
      return false;
    } else if ( password.length < 5 ) {
      dispatch( setError('La contraseña debe tener al menos 6 caracteres.') );
      return false;
    }

    dispatch( removeError() );
    return true;
  }

  return (
    <>
      <h1 className="text-2xl text-center text-dark md:text-3xl font-bold mb-8">Ingresa a tu cuenta</h1>
      <form className="flex flex-col" onSubmit={ handleLogin }>
        <input
          type="text"
          placeholder="Correo electrónico"
          name="email"
          autoComplete="off"
          className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
          value={ email }
          onChange={ handleInputChange }
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          autoComplete="off"
          className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
          value={ password }
          onChange={ handleInputChange }
        />

        { msgError && (
          <div className="mt-5 bg-error bg-opacity-10 text-error font-light border-l-4 border-error border-opacity-50 p-2 text-sm">
            { msgError }
          </div>
        )}

        <button
          type="submit"
          className={ btnLoginClass() }
          disabled={ loading }>
          Ingresar
        </button>
      </form>
      <div className="flex flex-col">
        <button
          onClick={ handleGoogleLogin }
          className="mt-1 bg-gray-300 text-dark px-4 py-2 rounded-md text-black text-sm font-bold flex items-center justify-center focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="96px" height="96px" className="w-6 h-6 mr-3">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          Ingresar con Google
        </button>

        <Link to="/auth/register" className="text-center mt-8 font-medium text-dark hover:text-primary hover:underline">
          ó Crea una cuenta nueva
        </Link>
      </div>
    </>
  )
}
