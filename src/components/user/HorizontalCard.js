import React, { useState } from 'react';

//Material Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

//Material Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';



const HorizontalCard = ({nombre, foto, descripcion, precio, estado}) => {
    
    const [show, setShow]=useState(false);
    const handleShow=()=>setShow(!show); 
        
    return (
        <div className="row border m-1 mt-3 rounded-4 shadow align-items-center" style={{width: '22rem', height: '10rem'}}  onClick={handleShow}>
            
            <div className="col-4 rounded-4" style={{height:'100%', backgroundImage:`url(${foto})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>

            <div className="col">                                      

                <div className="row p-2 ">
                    
                    <div className="row text-start" >
                        <Typography variant="h5" gutterBottom>{nombre}</Typography>                    
                    </div>

                        <div className="row ">
                            <Chip
                                label={precio}                            
                                icon={<AttachMoneyIcon />}
                                variant="outlined"
                                className="col-6"
                                size="small"
                            />
                            <Chip
                                label={estado ? "Disponible" : "No disponible"}
                                variant="outlined"
                                color={estado ? "success" : "error"}
                                className="col-6"
                                size="small"
                            />                         
                        </div>                   
                          
                </div>            
            </div>

            <Modal
            open={show}
            onClose={handleShow}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"                
            >            
                <Box className="">
                    <div className="container mb-5"  style={{backgroundColor:'white'}}>
                        <Stack direction="row-reverse" spacing={0.5}>
                            <IconButton aria-label="close" onClick={handleShow}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                                
                        <div className="row">
                            <div className="card-img-top" style={{width:'100%', height:'25rem', backgroundImage:`url(${foto})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>
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
                        <Button onClick={handleShow}>Cerrar</Button>
                    </div>                  
                </Box>                        
            </Modal>    
        </div>
    )
}

export default HorizontalCard
