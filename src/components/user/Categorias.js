import React from 'react';

//Import components
import HorizontalCard from './HorizontalCard';

import Stack from '@mui/material/Stack';

const Categorias = ({productos, categorias}) => {    

  return (
    <div>
        {
            categorias.map((data) =>{   
            return(
                <div id={data.nombre} >
                <h3 class="text-start mt-5 text-light bg-dark p-2 rounded-3" key={data.id}>{data.nombre}</h3>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                    {
                        productos.map( (producto) => {                  
                            if(producto.categoria === data.nombre){
                            return(
                                <HorizontalCard nombre={producto.nombre} foto={producto.foto} descripcion={producto.descripcion} precio={producto.precio} estado={producto.estado}/>
                            )                    
                            }
                        })
                    }
                    </Stack >
                </div>
            )
            })

        }      
    </div>
  )
}

export default Categorias
