import React from 'react';

//Import components
import HorizontalCard from './HorizontalCard';

import Toolbar from '@mui/material/Toolbar';

const Favoritos = ({productos}) => {
  return (
    <div className="p-3 rounded-5 mt-2 align-items-center">
        <Toolbar />        
        <div className="d-flex flex-wrap justify-content-center">
          {
              productos.map( (producto) => {         
                if (producto.recomendado)
                return (
                  <div className="col mt-2" key={producto.id}>
                    <HorizontalCard nombre={producto.nombre} foto={producto.foto} descripcion={producto.descripcion} precio={producto.precio} estado={producto.estado}/>
                  </div>
                )
              })
          }
        </div>
    </div>
  )
}

export default Favoritos
