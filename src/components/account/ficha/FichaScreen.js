import React, { useMemo, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getPetByUid } from '../../../selectors/getPetById';
import { DesparacitacionesScreen } from './DesparacitacionesScreen';
import { GeneralScreen } from './GeneralScreen';
import { VacunasScreen } from './VacunasScreen';
import { VitaminasScreen } from './VitaminasScreen';
import { CirugiasScreen } from './CirugiasScreen';
import { useDispatch } from 'react-redux';
import {
  cargarCirugias,
  cargarDesparacitaciones,
  cargarVacunas,
  cargarVitaminas,
  setCirugias,
  setDesparacitaciones,
  setFicha,
  setVacunas,
  setVitaminas
} from '../../../actions/ficha';

export const FichaScreen = ({ history }) => {

  const { petId } = useParams();

  const [section, setSection] = useState('general')
  const [mascota, setMascota] = useState({})
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch();


  useMemo(async () => {
    const data = await getPetByUid( petId )
    console.log( 'datita de mascota :: ', data );
    setMascota( data )

    dispatch( setFicha( data.idFicha ) )
    dispatch( cargarVacunas( data.idFicha ) );
    dispatch( cargarCirugias( data.idFicha ) );
    dispatch( cargarDesparacitaciones( data.idFicha ) );
    dispatch( cargarVitaminas( data.idFicha ) );

    setLoading( false )
    if (!data) {
      setLoading( false )
      return <Redirect to="/cuenta/mascotas" />
    }
  }, [ petId, dispatch ])


  const handleReturn = () => {
    dispatch( setFicha('') )
    dispatch( setVacunas([]) )
    dispatch( setVitaminas([]) )
    dispatch( setCirugias([]) )
    dispatch( setDesparacitaciones([]) )
    if( history.length <=2 ) {
      history.push('/cuenta');
    } else {
      history.goBack();
    }
  }

  const handleChangeSection = ( sectionValue ) => {
    setSection( sectionValue );
  }

  return (
    <div>
      <div>
        <button onClick={ handleReturn } className="focus:outline-none">
          <em className="fas fa-arrow-alt-circle-left mr-2"></em> Volver
        </button>
      </div>
      { loading ? (
        <div className="flex flex-col items-center justify-center">
          <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="w-10/12 text-primary text-sm md:text-base tracking-wide mt-5 text-center">
            Cargando datos de la mascota, espere por favor....
          </p>
        </div>
      ) : (
        <div className="">
          <div className="flex items-end justify-center">
            <h1 className="text-xl md:text-3xl">Ficha médica de { mascota.nombre }</h1>
          </div>
          <div className="grid grid-flow-row md:grid-flow-col gap-2 mt-5">
            {
              section === 'general'
              ? <button onClick={ handleChangeSection.bind(this, 'general') } className="bg-primary px-4 py-3 rounded-md text-sm md:text-base text-white focus:outline-none">Información General</button>
              : <button onClick={ handleChangeSection.bind(this, 'general') } className="border border-primary px-4 py-3 rounded-md text-sm md:text-base text-primary focus:outline-none">Información General</button>
            }
            {
              section === 'vacunas'
              ? <button onClick={ handleChangeSection.bind(this, 'vacunas') } className="bg-primary px-4 py-3 rounded-md text-sm md:text-base text-white focus:outline-none">Vacunas</button>
              : <button onClick={ handleChangeSection.bind(this, 'vacunas') } className="border border-primary px-4 py-3 rounded-md text-sm md:text-base text-primary focus:outline-none">Vacunas</button>
            }
            {
              section === 'desparacitaciones'
              ? <button onClick={ handleChangeSection.bind(this, 'desparacitaciones') } className="bg-primary px-4 py-3 rounded-md text-sm md:text-base text-white focus:outline-none">Desparacitaciones</button>
              : <button onClick={ handleChangeSection.bind(this, 'desparacitaciones') } className="border border-primary px-4 py-3 rounded-md text-sm md:text-base text-primary focus:outline-none">Desparacitaciones</button>
            }
            {
              section === 'vitaminas'
              ? <button onClick={ handleChangeSection.bind(this, 'vitaminas') } className="bg-primary px-4 py-3 rounded-md text-sm md:text-base text-white focus:outline-none">Vitaminas</button>
              : <button onClick={ handleChangeSection.bind(this, 'vitaminas') } className="border border-primary px-4 py-3 rounded-md text-sm md:text-base text-primary focus:outline-none">Vitaminas</button>
            }
            {
              section === 'cirugias'
              ? <button onClick={ handleChangeSection.bind(this, 'cirugias') } className="bg-primary px-4 py-3 rounded-md text-sm md:text-base text-white focus:outline-none">Cirugías</button>
              : <button onClick={ handleChangeSection.bind(this, 'cirugias') } className="border border-primary px-4 py-3 rounded-md text-sm md:text-base text-primary focus:outline-none">Cirugías</button>
            }
          </div>
          <div className="mt-5">
            {
              {
                general: <GeneralScreen { ...mascota } />,
                vacunas: <VacunasScreen />,
                desparacitaciones: <DesparacitacionesScreen />,
                vitaminas: <VitaminasScreen />,
                cirugias: <CirugiasScreen />
              }[ section ]
            }
          </div>
        </div>
      )}
    </div>
  )
}
