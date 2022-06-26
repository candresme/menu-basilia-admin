import React, { useState, useEffect }  from 'react';

//Import del Layout
import AdminHome from './AdminHome';

//Imports Material Design.
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
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



export const ConsultarProductos = () => {

  //Configuramos los hooks
  const [productos, setProductos] = useState( [] );

  //Referenciamos a la DB firestore
  const ProductosColeccion = collection(db, "productos");

  //Funcion para mostrar TODOS los docs
  const getProductos = async ()   => {
    const data = await getDocs(ProductosColeccion);
    
    setProductos(
        data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
    );

  };

  //Funcion para eliminar un doc
  const deleteProducto = async (id) => {
    const productoDoc = doc(db, "productos", id)
    await deleteDoc(productoDoc)
    getProductos()
  };

  //Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
    title: '¿Desea eliminar el producto?',
    text: "Esto no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) { 
          //llamamos a la funcion para eliminar   
          deleteProducto(id)               
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
    getProductos()
    // eslint-disable-next-line
  }, [] )

  //Devolvemos vista de nuestro componente 
  const ConsultarProductos = () => {

    return (
      <div  className="container-fluid">
        <div class="row">
          <div class="col-12">
            <table className="w-100 table table-striped table-hover" >
              <thead>
                <tr>
                  <th scope="col">Foto</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Recomendado</th>
                  <th scope="col">Favorito</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                
              { productos.map( (producto) => (
                <tr key={producto.id}>
                  <td><Avatar alt={producto.nombre} src={producto.foto} sx={{ width: 56, height: 56 }} /></td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.estado ? <Chip label="Disponible" color="success" variant="outlined" /> : <Chip label="No Disponible" color="error" variant="outlined" />}</td>

                  <td>{producto.recomendado ? <Chip label="Sí" color="success" variant="outlined" /> : <Chip label="No" color="error" variant="outlined" />}</td>
                  
                  <td>{producto.favorito ? <Chip label="Sí" color="success" variant="outlined" /> : <Chip label="No" color="error" variant="outlined" />}</td>
                                    
                  <td>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Link to={`/editar/producto/${producto.id}`}>
                        <IconButton color="info" aria-label="editar">
                          <EditIcon  />
                        </IconButton> 
                      </Link>

                      <IconButton aria-label="eliminar" onClick={() => {confirmDelete(producto.id)}} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </td>
                </tr>                
              ))}
              </tbody>
            </table>
          </div>
        </div>

        <Stack direction="row-reverse">
          <Fab color="primary" aria-label="add" href="/admin/productos/crear">
            <AddIcon />
          </Fab>
        </Stack>
        
      </div>
    )
  };
  


  return (
    <div>
      <AdminHome 
        child={<ConsultarProductos />} 
      />        
    </div>
  )
}
