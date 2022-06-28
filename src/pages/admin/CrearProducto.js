import React, { useState, useEffect } from 'react';
import AdminHome from './AdminHome';

//imports react router dom.
import { useNavigate } from 'react-router-dom';

//Material components
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

//Material Icons
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

//firebase imports
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, storage } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


//SweetAlert imports
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const CrearProducto = () => {

    const Formulario = () => {
        
      //Configuramos los hooks
        const [ nombre, setNombre ] = useState('');
        const [ descripcion, setDescripcion ] = useState('');
        const [ foto, setFoto ] = useState('');
        const [ precio, setPrecio ] = useState('');
        const [ categoria, setCategoria ] = useState('');
        const [ categoriaStorage, setCategoriaStorage ] = useState([]);
        const [ estado, setEstado ] = useState(true);
        const [ recomendado, setRecomendado ] = useState(false);
        const [ favorito, setFavorito ] = useState(false);       

        //Llamado a la base de datos.
        const productos = collection(db, "productos");
        const categoriasColeccion = collection(db, "categorias");

        //Funcion para mostrar TODOS los docs
        const getCategorias = async ()   => {
          const data = await getDocs(categoriasColeccion);
          
          setCategoriaStorage(
              data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
          );

        };

        //Funcion para cargar la foto a firestorage
        const archivoHandler = async (e)=> {

          const archivo = e.target.files[0];
          const storageRef = ref(storage, archivo.name);

          // 'file' comes from the Blob or File API
          await uploadBytes(storageRef, archivo).then((snapshot) => {
            console.log('Uploaded a blob or file!');            
          });

          getDownloadURL(storageRef).then((url) => {setFoto(url); console.log(foto)});

        }        

        //Funcion para crear el producto
        const crearProducto = async (e) => {
            e.preventDefault();
            //Hace la escritura de la base de datos
            await addDoc( productos, { descripcion: descripcion, nombre: nombre, estado: estado, foto: foto, precio:precio, categoria:categoria, recomendado:recomendado, favorito: favorito} );
            
            //Envia notificacion al usuario de la correcta creacion en la base de datos.
            await Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: '¡Fue creado con exito!',
                showConfirmButton: false,
                timer: 1300
            })             
             
            //Limpia el formulario.
            setNombre("");
            setDescripcion("");
            setFoto("");
            setPrecio("");            
            setEstado(true);
            setRecomendado(false);
            setFavorito(false);
        };

        //Funcion del switch del formulario
        const AntSwitch = styled(Switch)(({ theme }) => ({
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex',
            '&:active': {
              '& .MuiSwitch-thumb': {
                width: 15,
              },
              '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
              },
            },
            '& .MuiSwitch-switchBase': {
              padding: 2,
              '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                  opacity: 1,
                  backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
                },
              },
            },
            '& .MuiSwitch-thumb': {
              boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
              width: 12,
              height: 12,
              borderRadius: 6,
              transition: theme.transitions.create(['width'], {
                duration: 200,
              }),
            },
            '& .MuiSwitch-track': {
              borderRadius: 16 / 2,
              opacity: 1,
              backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
              boxSizing: 'border-box',
            },
        }));

         //Usamos useEffect
          useEffect( () => {
            getCategorias()
            // eslint-disable-next-line
          }, [] )

        return(
            <>
                <Typography align="left" variant="h4" gutterBottom >Crear nuevo producto</Typography>

                <form className="row g-3 text-start needs-validation" onSubmit={crearProducto}>

                  <div className="mb-3 col-6">
                    <label htmlFor="formFile" className="form-label" >Añade una foto</label>
                    <input className="form-control" type="file" onChange={archivoHandler} />
                  </div>
                    
                  <div className="col-6">                        
                    <TextField id="nombreCategoria" label="Nombre del producto" variant="standard"  className="form-control" value={nombre} onChange={ (e) => setNombre(e.target.value)} required/>
                  </div>

                  <div className="col-6">                        
                    <TextField
                        id="descripcion"
                        label="Descripción"
                        variant="standard" 
                        multiline
                        rows={2}
                        defaultValue=""
                        className="form-control"
                        value={descripcion}
                        onChange={ (e)=> setDescripcion(e.target.value)}
                    />
                  </div>
                                          
                  <div className="col-3">
                    <InputLabel htmlFor="precio">Precio</InputLabel>
                    <Input
                      id="precio"
                      value={precio}
                      onChange={ (e)=> setPrecio(e.target.value)}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      required
                    />
                  </div>

                  <div className="col-3" >
                          
                    <InputLabel id="categoria">Categoría</InputLabel>
                    <Select
                      labelId="categoria"
                      id="selectCategoria"
                      value={categoriaStorage.nombre}                        
                      label="Categoría"
                      variant="standard"
                      sx={{ minWidth: 120 }}
                      onChange={(e)=>setCategoria(e.target.value)}
                      required
                    >
                              
                      { categoriaStorage.map( (categoria) => (
                        <MenuItem key={categoria.id} value={categoria.nombre}>{categoria.nombre}</MenuItem>
                      ))}
                                                        
                    </Select>                                                
                  </div>                     
                      
                  <Stack direction="row" spacing={3}>                    
                      <Stack direction="row" spacing={1} alignItems="center">                        
                          <AntSwitch value={estado} checked={estado} onChange={()=>setEstado(!estado)} />
                          <Typography>{estado ? "Disponible" : "No disponible"}</Typography>
                      </Stack>               
                      <Stack direction="row" spacing={1} alignItems="center">                        
                          <AntSwitch value={recomendado} checked={recomendado} onChange={()=>setRecomendado(!recomendado)} />
                          <Typography>{recomendado ? "Recomendar" : "No recomendar"}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Checkbox value={favorito} checked={favorito} icon={<FavoriteBorder />} checkedIcon={<Favorite />} color={favorito? "error": "default"} onChange={()=>setFavorito(!favorito)} />
                        <Typography>Favorito</Typography>
                      </Stack>                    
                  </Stack>                   
                    
                  <div className="col-12">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button type="submit"variant="contained" color="success" startIcon={<SaveIcon />} >Guardar</Button>
                      <Button type="button" variant="contained" href="/#/admin/productos/consultar"  startIcon={<ArrowBackIosIcon />}>Volver</Button>
                    </Stack>
                  </div>                  
                </form>                
            </>
        )
    }

    return (
        <> 
            <AdminHome 
                child={<Formulario />}
            /> 
        </>
    )
}
