import React, { useState } from 'react';
import AppBar from '../../layouts/user/AppBar';
import NavBar from '../../layouts/user/NavBar';
import Toolbar from '@mui/material/Toolbar';

//imports layout
import Main from '../../layouts/user/Main';

const Home = () => {
  const [label, setLabel]= useState("menu");
  return (
    <div>
      <NavBar />
      <Toolbar />
      <Main label={label} />
      <Toolbar />
      <AppBar labelActive={setLabel}/>
    </div>
  )
}

export default Home
