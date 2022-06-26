import React, { useState} from 'react';

//imports react router dom.
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import Firebase Firestore
import { app } from '../../FirebaseConfig';

//Import Material components
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


//import component
import Drawer from '../../components/admin/Drawer';
import NavBar from '../../components/admin/NavBar';


const AdminHome = (props) => {
    return (
        <div> 
          <Box sx={{ display: 'flex' }}> 
            
            <NavBar />
            <Drawer />
            <Box component="main" sx={{ p: 3}} className="w-100">
              <Toolbar />
              {props.child}
            </Box>
            
          </Box> 
        </div>
    )
}

export default AdminHome
