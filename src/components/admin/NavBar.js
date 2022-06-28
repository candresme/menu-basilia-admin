import React from 'react';

//Material components
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

//Firebase imports
import { getAuth, signOut } from "firebase/auth";

//Router DOM
import {useNavigate} from 'react-router-dom';


export default function NavBar() {  
  const navigate = useNavigate();

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/admin');            
    })            
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{justifyContent: 'space-between'}}>            
            
            <Typography variant="h6" noWrap component="div">
                Administrador de menú digital.
            </Typography>               
               
            <Button variant="contained" onClick={logout} startIcon={<LogoutIcon />}>
                Cerrar sesión
            </Button>
                
        </Toolbar>
      </AppBar>
    </Box>
  );
}
