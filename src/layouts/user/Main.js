import React, { useState, useEffect } from 'react';

//firebase imports
import {collection, getDocs, doc} from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

//Import components
import Categorias from '../../components/user/Categorias';
import Favoritos from '../../components/user/Favoritos';
import Recomendados from '../../components/user/Recomendados';

const Main = ({label}) => {

  //Configuramos los hooks
  const [productos, setProductos] = useState( [] );
  const [categorias, setCategorias] = useState( [] );

  //Referenciamos el label del menu
  const labelMenu = label

  //Referenciamos a la DB firestore
  const ProductosColeccion = collection(db, "productos");
  const CategoriasColeccion = collection(db, "categorias");

  //Funcion para mostrar TODOS los docs
  const getProductos = async ()   => {
    const data = await getDocs(ProductosColeccion);
    
    setProductos(
        data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
    );

  };

  const getCategorias = async ()   => {
    const data = await getDocs(CategoriasColeccion);
    
    setCategorias(
        data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
    );

  };

  //Funcion para mostrar el menu por filtros
  const Filtros = () =>{
    
    switch(labelMenu){
            
      case 'menu':
        return <Categorias productos={productos} categorias={categorias} />;

      case 'favoritos':
        return <Favoritos productos={productos} />;

      case 'recomendados':
        return <Recomendados productos={productos} />; 
        
      default:
        return <Categorias productos={productos} categorias={categorias} />;
    }

  };
  

  //Usamos useEffect para montar el componente con la información
  useEffect( () => {
    getCategorias()
    getProductos()
    // eslint-disable-next-line
  }, [] )

  return (
    <div>        
      <Filtros />
    </div>
  )
}

export default Main
