//Estilos desde .css
import '../Styles/App.css';
import'../Styles/NavegadorBar.css';
//Paginas para enlazar (SPA)
import Inicio from './Inicio';
import GestorDeTareas from './GestorDeTareas';
import TareasIncompletas from './TareasIncompletas';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
//Componentes para funcion login
import Particle from '../Componentes/Particles';
import NavegadorBar from '../Componentes/NavegadorBar'


export default function App() {
  
  const {isAuthenticated} = useAuth0()

  function timerLog(){
  setTimeout(function(){
    toast.success(' ¡Inicio de sesion, exitoso!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }, 1000);
  
  }
  //Efecto de carga
  /*   const {isLoading} = useAuth0()
  if(isLoading) return <h1>Cargando...</h1> */

  return (<>
    
    <div className="App">
      <Particle/>
      {/* Barra de navegacion */}
      <>
      <NavegadorBar />

      </>
      
      <h1 className='titleApp'>Making time </h1>
      <h2 className='subTitleApp'>Gestor de tareas </h2>
      <main>
      <QuoteHeader/>
      <div>
        {/* Agregar materiales especiales por la route */}
        <Routes>
          {/* Componentes de la pagina "Inicio" */}
        <Route path="/inicio" element={<Inicio />} />
          {/* Componentes de la pagina "Gestor de tareas" */}
        <Route path="/gestor-de-tareas" element={<GestorDeTareas />} />
          {/* Componentes de la pagina "TareasIncompletas" */}
        <Route path="/incompletas" element={<TareasIncompletas />} />
        </Routes>
        {/* Fin de componentes agregados por la route */}
      </div>
      
      {isAuthenticated 

      /* Si esta logeado */
      ? <>
      {/* Notificacion de inicio de sesion con exito */}      
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />{timerLog()}</> 
        
      /* Si no esta logeado */
      : <><NotLogInInstructions/></>
      } 
      
      
      </main>
      <footer id='footerApp'>
        <ul id='footerCredits'>
        <li>Making time&#174; </li>|
        <li>Desarrollado por <span class="credito"><a href="https://www.linkedin.com/in/ezequieltartaglia/" target="blank">Ezequiel M. Tartaglia</a></span> </li>|
        <li> Todos los derechos reservados 2022&copy;</li>
        </ul>
         

      </footer>
      
    </div>
    </>
  );
}


export function QuoteHeader() {
  return(
    
    
    <quote><em className='quote'>"La gestión del tiempo debe centrarse en decidir qué tareas debemos hacer y elegir lo que no debemos hacer. ¿Cómo ser más productivo? Comience por priorizar las tareas y asignarles franjas horarias específicas."</em>
  </quote>)
}
export function NotLogInInstructions(){
  //Datos del usuario
     
  return(
      
       <>
       <p>En <b className='titleBolder'>Making time</b> podras gestionar como utilizar tu tiempo de manera eficaz. <b>Inicia sesion</b> para poder <b>desbloquear funciones</b> como:</p>
       <ul className='listApp'>
         <li>Agregar tareas</li>
         <li>Buscarlas en tu lista</li>
         <li>Inicializarlas</li>
         <li>Almacenarlas</li>
         <li>Concluirlas</li>
         <li>Eliminarlas</li>
         </ul>
         </>
 
  ) 
      
  
 }
 