//Estilos desde .css
import '../Styles/App.css';
import'../Styles/NavegadorBar.css';
//Paginas para enlazar (SPA)
import Instrucciones from './Instrucciones';
import GestorDeTareas from './GestorDeTareas';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2';
//Componentes para funcion login
import Particle from '../Componentes/Particles';
import NavegadorBar from '../Componentes/NavegadorBar'


export default function App() {
  
  const {isAuthenticated} = useAuth0()

  function backup(){
    setTimeout(function(){
    Swal.fire({
      title: '¿Desea continuar con la lista almacenada?',
      text: `Si es la primera vez que ingresa o desea resetear su lista haga click en "Insertar lista vacia", si tiene una lista almacenada, haga click en "Insertar lista almacenada`,
      icon:"warning",
      focusConfirm: false,
      allowOutsideClick: false,
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
      width: 700,
      padding: "1.7rem",
      color: 'black',
      background: "linear-gradient(360deg, #0ecd97 , grey 70% )",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Insertar lista vacia',
      confirmButtonColor: 'red',
      denyButtonText: `Insertar lista almacenada`,
      denyButtonColor: 'black',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.setItem("Lista almacenada",JSON.stringify([]))
       
        toast.info(' ¡Creando lista!', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setTimeout(function(){
          toast.success(' ¡Lista creada, con exito!', {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          }, 3000);
        }
        
      else if (result.isDenied) {
        toast.info(' Cargando...', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setTimeout(function(){
          toast.success(' ¡Lista cargada, con exito!', {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          }, 3000);
        }
  
    })}, 3000);
    
  }

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
    }, 500);
    
    
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
        <Route path="/instrucciones" element={<Instrucciones />} />
          {/* Componentes de la pagina "Gestor de tareas" */}
        <Route path="/gestor-de-tareas" element={<GestorDeTareas />} />
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
        />{timerLog()}
        {backup()}</> 
        
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
 