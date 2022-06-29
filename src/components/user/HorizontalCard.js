import React, { useState } from 'react';

//impor components
import ModalProducto from './ModalProducto';


//MAterial Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

//Material Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';



const HorizontalCard = ({nombre, foto, descripcion, precio, estado}) => {
    
    const [show, setShow]=useState(false);
    const handleShow=()=>setShow(!show);  
    
  return (
    <div>
        <Card className="m-1" sx={{ display: 'flex', height:150, width:360}} onClick={handleShow} >
            
            <div className="col-4" style={{backgroundImage:`url(${foto})`, backgroundPosition:'center', backgroundSize:'cover', width:"40%", height:"100%"}}></div>
            
            <Box className="" sx={{ display: 'flex', flexDirection: 'column'}}>
                
                <CardContent className="text-start" >
                    <Typography variant="h5" gutterBottom>{nombre}</Typography>                    

                    <Stack direction="row" spacing={0.5} >
                        <Chip
                            label={precio}                            
                            icon={<AttachMoneyIcon />}
                            variant="outlined"
                        />
                        <Chip
                            label={estado ? "Disponible" : "No disponible"}
                            variant="outlined"
                            color={estado ? "success" : "error"}
                        />                         
                    </Stack>                   
                </CardContent>      
            </Box>            
        </Card>

        <Modal
        open={show}
        onClose={handleShow}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
        >            
            <Box className="">
                <div className="container mb-5"  style={{backgroundColor:'white'}}>
                    <Stack direction="row-reverse" spacing={0.5}>
                        <IconButton aria-label="close" onClick={handleShow}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                            
                    <div className="row">
                        <div className="card-img-top" style={{width:'100%', height:'450px', backgroundImage:`url(${foto})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>
                    </div>

                    <div className="card-body container align-middle p-3" >
                        <div className="row align-items-end">
                            <div className="lh-1 mb-2" style={{textAlign: 'justify'}}>                                    
                                <h2 className="fw-bold">{nombre}</h2>
                            </div>
    
                        </div>
                                                
                        <div className="row">
                            <div className="lh-1 mb-2" style={{textAlign: 'justify'}}>
                                <p className="text-break" >{descripcion}</p>
                                
                            </div>
                            <Stack className="mb-5" direction="row" spacing={0.5}  >
                                <Chip
                                    label={precio}                            
                                    icon={<AttachMoneyIcon />}
                                    variant="outlined"
                                />
                                <Chip
                                    label={estado ? "Disponible" : "No disponible"}
                                    variant="outlined"
                                    color={estado ? "success" : "error"}
                                />                         
                            </Stack>                                    
                        </div>                                                   
                    </div>
                </div>
            </Box>            
        </Modal>    
    </div>
  )
}

export default HorizontalCard
