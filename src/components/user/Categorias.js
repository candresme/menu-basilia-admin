import React from 'react';

//Import components
import HorizontalCard from './HorizontalCard';


const Categorias = ({productos, categorias}) => {    

  return (
    <div>
        {
            categorias.map((data) =>{

                if (data.estado){
                    return(
                        <div id={data.nombre} className="p-3 rounded-5 mt-4 align-items-center" style={{backgroundColor:'#f5f5f5'}}>

                            <h3 className="text-start m-2" key={data.id}>{data.nombre}</h3>
                            
                            <div className="d-flex flex-wrap">
                                {
                                    productos.map( (producto) => {                  
                                        if(producto.categoria === data.nombre){
                                            return(
                                                <div className="col" key={producto.id}>                                
                                                    <HorizontalCard key={producto.id} nombre={producto.nombre} foto={producto.foto} descripcion={producto.descripcion} precio={producto.precio} estado={producto.estado}/>
                                                </div>
                                            )                    
                                        }
                                    })
                                 }
                            </div>
                            
                        </div>
                    )}
            })

        }      
    </div>
  )
}

export default Categorias
