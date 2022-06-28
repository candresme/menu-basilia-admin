import React, { useState, useEffect }  from 'react';

//Import del Layout
import AdminHome from './AdminHome';

//Imports Material Design.
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';

//import icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

//Import del react router dom
import { Link } from 'react-router-dom';

//firebase imports
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

//SweetAlert imports
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);





export const ConsultarCategorias = () => {

  //Configuramos los hooks
  const [categorias, setCategorias] = useState( [] );

  //Referenciamos a la DB firestore
  const CategoriasColeccion = collection(db, "categorias");

  //Funcion para mostrar TODOS los docs
  const getCategorias = async ()   => {
    const data = await getDocs(CategoriasColeccion);
    
    setCategorias(
        data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
    );

  };

  //Funcion para eliminar un doc
  const deleteCategoria = async (id) => {
    const categoriaDoc = doc(db, "categorias", id)
    await deleteDoc(categoriaDoc)
    getCategorias()
  };

  //Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
    title: '¿Desea eliminar la categoría?',
    text: "Esto no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) { 
          //llamamos a la funcion para eliminar   
          deleteCategoria(id)               
          Swal.fire(
          '¡Eliminado!',
          'La categoría fue eliminada.',
          'success'
          )
      }
    })    
  }

  //Usamos useEffect
  useEffect( () => {
    getCategorias()
    // eslint-disable-next-line
  }, [] )
  
  //Devolvemos vista de nuestro componente 
  const Consultar = () => {

    return (
      <div  className="container-fluid">
        <div class="row">
          <div class="col-12">
            <table className="w-100 table table-striped table-hover" >
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                
              { categorias.map( (categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.nombre}</td>
                  <td>{categoria.descripcion}</td>
                  <td>{categoria.estado ? <Chip label="Activa" color="success" variant="outlined" /> : <Chip label="Inactiva" color="error" variant="outlined" />}</td>
                  <td>

                    <Link to={`/editar/categoria/${categoria.id}`}>
                      <IconButton color="info" aria-label="eliminar">
                        <EditIcon  />
                      </IconButton> 
                    </Link>

                    <IconButton aria-label="eliminar" onClick={() => {confirmDelete(categoria.id)}} color="error">
                      <DeleteIcon />
                    </IconButton>

                  </td>
                </tr>                
              )) }

              </tbody>
            </table>
          </div>
        </div>
        <Stack direction="row-reverse">
          <Fab color="primary" aria-label="add" href="/#/admin/categorias/crear">
            <AddIcon />
          </Fab>
        </Stack>
      </div>
    )
  };


  return (
    <div>
      <AdminHome 
        child={<Consultar />}
      />        
    </div>
  )
}
