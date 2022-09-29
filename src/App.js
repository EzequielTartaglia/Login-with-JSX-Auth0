//Estilos desde .css
import './App.css';
//Paginas para enlazar (SPA)
import Inicio from './Pages/Inicio';
import TareasCompletas from './Pages/TareasCompletas';
import TareasIncompletas from './Pages/TareasIncompletas';
import { Route, Routes } from 'react-router-dom';

//Componentes para funcion login
import { Perfil } from './Componentes/Perfil';
import NavegadorBar from './Componentes/NavegadorBar'

function App() {

  
   //Efecto de carga
/*   const {isLoading} = useAuth0()
  if(isLoading) return <h1>Cargando...</h1> */

  return (
    <div className="App">

      <>
      <NavegadorBar />
      <div>
        <Routes>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/completadas" element={<TareasCompletas />} />
        <Route path="/incompletas" element={<TareasIncompletas />} />
        </Routes>
      </div>
      </>

      <h1>Aplicación </h1>
      
      <Perfil/>
      
      
      
    </div>

  );
}

export default App;
