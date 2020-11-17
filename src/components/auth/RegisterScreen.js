import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { removeError, setError } from '../../actions/ui'
import { registerVeterinary, registerWithEmailPassword } from '../../actions/auth'

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError, loading } = useSelector( state => state.ui );//este se ejecuta cada que se hace cambios

  const [ formValues, handleInputChange] = useForm({
    name: '',
    hospitalName: '',
    hospitalDirection: '',
    email: '',
    password: '',
    repassword: ''
  })

  const [ openTab, setOpenTab ] = useState( 1 )

  const { name, email, password, repassword, hospitalName, hospitalDirection } = formValues

  const handleRegister = ( e ) => {
    e.preventDefault();
    if ( isFormValid() ) {
      dispatch( registerWithEmailPassword( email, password, name ) );
    }
  }

  const handleRegisterVeterinary = ( e ) => {
    e.preventDefault();
    console.log('registrando veterinario....');
    dispatch( registerVeterinary( formValues ) )
  }

  const btnRegisterClass = () => {
    return loading
      ? 'mt-12 bg-gray-300 text-neutral cursor-not-allowed px-4 py-2 rounded font-bold tracking-wide focus:outline-none'
      : 'mt-12 bg-primary text-white cursor-pointer px-4 py-2 rounded font-bold tracking-wide focus:outline-none'
  }

  const isFormValid = () => {
    if ( name.trim().length === 0 ) {
      dispatch( setError('El nombre es requerido.') );
      return false;
    } else if ( !validator.isEmail( email ) ) {
      dispatch( setError('El correo electrónico no es válido.') );
      return false;
    } else if ( password !== repassword || password.length < 5 ) {
      dispatch( setError('La contraseña debe tener al menos 6 caracteres y coincidir al repetir contraseña.') );
      return false;
    }

    dispatch( removeError() );
    return true;
  }

  return (
    <>
      <h1 className="text-2xl text-center text-dark md:text-3xl font-bold mb-8">Registra tu cuenta</h1>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-primary"
                    : "text-primary bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-user-astronaut text-base mr-1"></i> Usuarios
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-primary"
                    : "text-primary bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-user-md text-base mr-1"></i>  Veterinarios
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <form className="flex flex-col" onSubmit={ handleRegister }>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  name="name"
                  autoComplete="off"
                  value={ name }
                  onChange={ handleInputChange }
                  className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                />
                <input
                  type="text"
                  placeholder="Correo electrónico"
                  name="email"
                  autoComplete="off"
                  value={ email }
                  onChange={ handleInputChange }
                  className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  autoComplete="off"
                  value={ password }
                  onChange={ handleInputChange }
                  className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                />
                <input
                  type="password"
                  placeholder="Repetir Contraseña"
                  name="repassword"
                  autoComplete="off"
                  value={ repassword }
                  onChange={ handleInputChange }
                  className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                />

                { msgError && (
                  <div className="mt-5 bg-error bg-opacity-10 text-error font-light border-l-4 border-error border-opacity-50 p-2 text-sm">
                    { msgError }
                  </div>
                )}

                <button
                  type="submit"
                  className={ btnRegisterClass() }
                  disabled={ loading }>
                  Registrar
                </button>
              </form>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <form className="flex flex-col" onSubmit={ handleRegisterVeterinary }>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  name="name"
                  autoComplete="off"
                  value={ name }
                  onChange={ handleInputChange }
                  className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                />
                <input
                  type="text"
                  placeholder="Correo electrónico"
                  name="email"
                  autoComplete="off"
                  value={ email }
                  onChange={ handleInputChange }
                  className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  autoComplete="off"
                  value={ password }
                  onChange={ handleInputChange }
                  className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                />
                <input
                  type="password"
                  placeholder="Repetir Contraseña"
                  name="repassword"
                  autoComplete="off"
                  value={ repassword }
                  onChange={ handleInputChange }
                  className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                />
                <input
                  type="text"
                  placeholder="Nombre de clínica veterinaria"
                  name="hospitalName"
                  autoComplete="off"
                  value={ hospitalName }
                  onChange={ handleInputChange }
                  className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                />
                <input
                  type="text"
                  placeholder="Dirección de clínica veterinaria"
                  name="hospitalDirection"
                  autoComplete="off"
                  value={ hospitalDirection }
                  onChange={ handleInputChange }
                  className="mt-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-400 rounded-md p-3 text-base"
                />

                { msgError && (
                  <div className="mt-5 bg-error bg-opacity-10 text-error font-light border-l-4 border-error border-opacity-50 p-2 text-sm">
                    { msgError }
                  </div>
                )}

                <button
                  type="submit"
                  className={ btnRegisterClass() }
                  disabled={ loading }>
                  Registrar
                </button>
              </form>
            </div>
            <Link to="/auth/login" className="text-center mt-8 font-medium text-dark hover:text-primary hover:underline">
              Ya tienes una cuenta?
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
