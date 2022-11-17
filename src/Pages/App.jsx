//Estilos desde .css
import '../Styles/App.css';
import'../Styles/NavegadorBar.css';
//Paginas para enlazar (SPA)
import Inicio from './Inicio';
import TareasCompletas from './TareasCompletas';
import TareasIncompletas from './TareasIncompletas';
import { Route, Routes } from 'react-router-dom';

//Componentes para funcion login
import { Perfil } from '../Componentes/Perfil';
import NavegadorBar from '../Componentes/NavegadorBar'

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
