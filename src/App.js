import React, { Fragment, useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {

  //Citas en local storage, si no existen entonces y crea el item citas e inicia el array de citasIniciales
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales){
    citasIniciales = []
  }

  //Citas Listado, con lo que tiene almacenado en el item citas del local storage
  const [citas, guardarCitas] = useState(citasIniciales)

  //useEffect es para agregar operaciones cuando el componente esta listo, o algo del componente cambia, ejemplo el state citas
  useEffect(() =>{
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, citasIniciales])

  const crearCita = cita =>{
    guardarCitas([...citas, cita])
  }

  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  const titulo = citas.length > 0 ? 'Administrar tus citas' : 'Agrega citas'

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita}/>
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => <Cita 
                                  key={cita.id} 
                                  cita={cita}
                                  eliminarCita={eliminarCita}
                                /> )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
