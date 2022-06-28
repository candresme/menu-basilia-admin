import React from 'react';

//Material components
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';


export default function NavBar() {  
    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color="inherit" >
        <Toolbar className="p-2" sx={{justifyContent: 'center'}}>         
         <img src="https://firebasestorage.googleapis.com/v0/b/menu-basilia-5405d.appspot.com/o/LOGO-10.png?alt=media&token=4537b3da-6e4d-44ca-9bb5-1f63acc1f93c" alt="" width={200}/>              
        </Toolbar>
      </AppBar>
    </Box>
  );
}
