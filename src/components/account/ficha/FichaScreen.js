import React, { useMemo, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getPetByUid } from '../../../selectors/getPetById';
import { DesparacitacionesScreen } from './DesparacitacionesScreen';
import { GeneralScreen } from './GeneralScreen';
import { VacunasScreen } from './VacunasScreen';
import { VitaminasScreen } from './VitaminasScreen';
import { CirugiasScreen } from './CirugiasScreen';
import { useDispatch } from 'react-redux';
import { cargarCirugias, cargarDesparacitaciones, cargarVacunas, cargarVitaminas } from '../../../actions/ficha';

export const FichaScreen = ({ history }) => {

  const { petId } = useParams();

  const [section, setSection] = useState('general')

  const dispatch = useDispatch();

  // cargando vacunas de la ficha, se le deberia enviar el uid de la ficha o mascota....
  dispatch( cargarVacunas() );
  dispatch( cargarCirugias() );
  dispatch( cargarDesparacitaciones() );
  dispatch( cargarVitaminas() );

  const mascota = useMemo(() => getPetByUid( petId ), [ petId ])

  if (!mascota) {
    return <Redirect to="/cuenta/mascotas" />
  }

  const handleReturn = () => {
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
      <div className="">
        {/* <h1>{ petId }</h1> */}
        <div className="flex items-end justify-center">
          <h1 className="text-xl md:text-3xl">Ficha médica de { mascota.nombre }</h1>
          {/* <img className="rounded-md h-40 w-40 bg-auto bg-center" src={ mascota.urlImage } alt={ mascota.nombre + '-image' } /> */}
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
    </div>
  )
}
