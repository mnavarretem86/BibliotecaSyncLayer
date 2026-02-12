import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from "./components/MainLayout";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Libros from "./pages/Libros";
import Autores from "./pages/Autores/Autores";
// import Prestamos from "./pages/Prestamos";
// import Categorias from "./pages/Categorias";
import Personas from "./pages/Persona/Personas";
// import Usuarios from "./pages/Usuarios";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Ruta  Especial */}
          <Route path="/login" element={<Login />} />

          {/* Rutas  */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/libros" element={<Libros />} />
            <Route path="/autores" element={<Autores />} />
            <Route path="/personas" element={<Personas />} />

          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer 
        position="bottom-right" 
        autoClose={3000}
        hideProgressBar={true} 
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
      />
    </>
  );
}

export default App;