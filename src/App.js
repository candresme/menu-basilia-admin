import React from 'react';
import './App.css';

//imports react router dom.
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Imports pages
import Admin  from './pages/admin/Admin';
import Home from './pages/user/Home';

//Import pages
import { CrearCategoria } from './pages/admin/CrearCategoria';
import { ConsultarCategorias } from './pages/admin/ConsultarCategorias';
import { CrearProducto } from './pages/admin/CrearProducto';
import { ConsultarProductos } from './pages/admin/ConsultarProductos';
import EditarCategoria from './pages/admin/EditarCategoria';
import EditarProducto from './pages/admin/EditarProducto';

function App() {



  return (
    <div className="App">

      <BrowserRouter>      
        <Routes>
          
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin/categorias/crear" element={<CrearCategoria />} />
          <Route exact path="/admin/categorias/consultar" element={<ConsultarCategorias />} />
          <Route exact path="/admin/productos/crear" element={<CrearProducto />} />
          <Route exact path="/admin/productos/consultar" element={<ConsultarProductos />} />
          <Route exact path='/editar/categoria/:id' element={ <EditarCategoria /> } />
          <Route exact path='/editar/producto/:id' element={ <EditarProducto /> } />

        </Routes>      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
