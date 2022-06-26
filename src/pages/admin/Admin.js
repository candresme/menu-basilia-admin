
import React, { useEffect } from "react";

//Imports firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Importacion de componentes a renderizar.
import AdminHome from './AdminHome';
import LogIn from './LogIn';

const Admin = () => {
  const [usuario, setUsuario] = React.useState(); 
   
  useEffect(() => {

    const auth = getAuth();

    onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase);      
    });

  }, []);

  if(usuario) {
    return <AdminHome />
  } else {
    return <LogIn setUsuario={usuario}/>
  }  

}
export default Admin
