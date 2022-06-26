import React, { useState } from 'react';
import AdminHome from './AdminHome';

//imports react router dom.
import { useNavigate } from 'react-router-dom';

//Material components
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

//Import MAterial Icons
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

//firebase imports
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig';

//SweetAlert imports
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const CrearCategoria = () => {

    const Formulario = () => {

        const [ nombre, setNombre ] = useState('');
        const [ descripcion, setDescripcion ] = useState('');
        const [ estado, setEstado ] = useState(true);

        //Llamado a la base de datos.
        const categorias = collection(db, "categorias");

        //Funcion para crear la categoria
        const crearCategoria = async (e) => {
            e.preventDefault();

            //Hace la escritura de la base de datos
            await addDoc( categorias, { descripcion: descripcion, nombre: nombre, estado: estado } );
            
            //Envia notificacion al usuario de la correcta creacion en la base de datos.
            await Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: '¡Fue creada con exito!',
                showConfirmButton: false,
                timer: 1300
            })             
             
            //Limpia el formulario.
            setNombre("");
            setDescripcion("");

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


        return(
            <>
                <Typography align="left" variant="h4" gutterBottom >Crear una nueva categoría</Typography>

                <form className="row g-3 text-start" onSubmit={crearCategoria}>

                    <div className="col-md-6">                        
                        <TextField id="nombreCategoria" label="Nombre de la Categoría" variant="standard"  className="form-control"  value={nombre} onChange={ (e) => setNombre(e.target.value)}/>
                    </div>

                    <div className="row g-2">
                        <div className="col-md-6">                        
                            <TextField
                                id="descripcion"
                                label="Descripción"
                                variant="standard" 
                                multiline
                                rows={1}
                                defaultValue=""
                                className="form-control"
                                value={descripcion}
                                onChange={ (e)=> setDescripcion(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12">
                    <Stack direction="row" spacing={1} alignItems="center">                        
                        <AntSwitch value={estado} checked={estado} onChange={()=>setEstado(!estado)} />
                        <Typography>{estado ? "Activa" : "Inactiva"}</Typography>
                    </Stack>
                    </div>                   
                    
                    <div className="col-12">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Button type="submit"variant="contained" color="success" startIcon={<SaveIcon />} >Guardar</Button>
                        <Button type="button" variant="contained" href="/admin/categorias/consultar"  startIcon={<ArrowBackIosIcon />}>Volver</Button>
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
