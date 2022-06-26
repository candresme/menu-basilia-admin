import React, { useEffect, useState } from "react";
import AdminHome from './AdminHome';

//imports react router dom.
import { useNavigate, useParams } from "react-router-dom";

//firebase imports
import { getDoc, updateDoc, doc, collection} from 'firebase/firestore'
import { db } from '../../FirebaseConfig';

//Material components
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

//Material Icons
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

//SweetAlert imports
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const EditarCategoria = () => {

    const navigate = useNavigate();    
    const {id} = useParams();

    const Formulario = () => {

        const [ nombre, setNombre ] = useState('');
        const [ descripcion, setDescripcion ] = useState('');
        const [ estado, setEstado ] = useState();

        const update = async (e) => {
            e.preventDefault()
            const categorias = doc(db, "categorias", id)
            const data = {nombre: nombre, descripcion: descripcion, estado: estado}
            await updateDoc(categorias, data)

            //Envia notificacion al usuario de la correcta modificación en la base de datos.
            await Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: '¡Fue modificada con exito!',
                showConfirmButton: false,
                timer: 1300
            })            
        }

        const getCategoriaById = async (id) => {
            const categoria = await getDoc( doc(db, "categorias", id) )
    
            if(categoria.exists()) {
                setNombre(categoria.data().nombre)    
                setDescripcion(categoria.data().descripcion)
                setEstado(categoria.data().estado)
            }else{
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'La categoria no existe.',
                    showConfirmButton: false,
                    timer: 1300
                })
            }
        }

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

        useEffect( () => {
            getCategoriaById(id)
            // eslint-disable-next-line
        }, [])


        return(
            <>
                <Typography align="left" variant="h4" gutterBottom >Editar {nombre}</Typography>

                <form className="row g-3 text-start" onSubmit={update}>

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

};

export default EditarCategoria;