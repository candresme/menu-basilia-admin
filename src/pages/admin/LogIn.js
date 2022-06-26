import React, { useEffect, useState } from 'react';

//import Firebase Firestore
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


//Imports Material UI
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

//Router DOM


const LogIn = (props) => {
  
  const iniciarSesion = (correo, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, correo, password)
      .then((userCredential) => {
        console.log("sesión iniciada con:", userCredential.user);
        props.setUsuario(userCredential);
      });        
  };

  
  const submitHandler = (e) => {

     e.preventDefault();
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;              
    iniciarSesion(correo, password);      

  };


    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
  
    return (
      <div>
        <h1>Inicia sesión</h1>
        <form onSubmit={submitHandler}>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                
                <FormControl variant="standard">

                    <InputLabel htmlFor="emailField">Correo</InputLabel>

                    <Input
                    type="email"
                    id="emailField"
                    startAdornment={
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    }

                    />                               

                </FormControl >                
            </Box>

            <Box sx={{ '& > :not(style)': { m: 1 } }}>          
              <FormControl sx={{  }} variant="standard">
                <InputLabel htmlFor="passwordField">Contraseña</InputLabel>
                <Input
                    id="passwordField"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
              </FormControl>
            </Box>

            <Button type="submit" variant="outlined">Iniciar sesion</Button>
          
        </form>         
      </div>
    );
};


export default LogIn
