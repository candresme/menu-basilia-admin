import React, { useState } from 'react';
import AppBar from '../../layouts/user/AppBar';

//imports layout
import Main from '../../layouts/user/Main';

const Home = () => {
  const [label, setLabel]= useState("menu");
  return (
    <div>
      <Main label={label} />
      <AppBar labelActive={setLabel}/>
    </div>
  )
}

export default Home
