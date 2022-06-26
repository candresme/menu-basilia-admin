import React from 'react';

//Import components
import HorizontalCard from './HorizontalCard';

const Favoritos = ({productos}) => {
  return (
    <div>
        {
            productos.map( (producto) => {         
              if (producto.recomendado)
              return <HorizontalCard nombre={producto.nombre} foto={producto.foto} descripcion={producto.descripcion} precio={producto.precio} estado={producto.estado}/>
            })
        }
    </div>
  )
}

export default Favoritos
