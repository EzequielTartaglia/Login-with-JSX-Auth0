//importar link para manipular el router-dom
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import 'react-json-pretty/themes/monikai.css';
import logo from '../Images/logo.png';



export default function NavegadorBar(){

    //Datos del usuario
    const {isAuthenticated} = useAuth0()

    return <>
            {/* Si esta autorizado muestra Logout(button)sino Login*/}
            {isAuthenticated       
            ? <NavLogin/>

            :<NavLogout/>
            }

           

           
            
        </>
}

//Componentes adicionales
export const CustomLink = ({to, children, ...props}) => {

    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname})

    return <>
            <li className={isActive === to 
                ? "active" 
                : ""}>

                    <Link to={to} {...props}>{children}</Link>
            
            </li>
    </>
}

export const PerfilNav = () => {

    //Datos del usuario
    const {user, isAuthenticated} = useAuth0()

    
    return(
        isAuthenticated &&  (
        <div className="nav-custom">
         
        <img className="img-nav-custom" src={user.picture} alt={user.name} />

        {/*  
        
        Detalles de la imagen(en caso se requiera):
        <p className="p-nav-custom">{user.name}</p>
        <p className="p-nav-custom">{user.email}</p>
             
        */}
        
    </div>

    ) 
        
    )
}

export const LogoutButton = () => {

    const { logout } = useAuth0()

    return(
        <button onClick={() => logout()} className="logoutButton"> Cerrar sesión</button>
    )
}
export const LoginButton = () => {

    //Login-redirecciona a la misma pag pero logeado
    const { loginWithRedirect } = useAuth0();

    return (<>

        <button onClick={() => loginWithRedirect()} className="loginButton">Iniciar sesión</button> 

    </>)
}

export  const NavLogin = () => {
       //Datos del usuario
        const {user} = useAuth0()

return <nav className="nav">
        <Link to="/inicio" className="site-title"><img src={logo} alt="" /></Link>
        
        <ul className="principalMenu">
        <CustomLink to="/inicio">[Inicio]</CustomLink> 
        <CustomLink to="/completadas">[Completadas]</CustomLink>
        <CustomLink to="/incompletas">[Por hacer]</CustomLink>
        </ul>
        <ul>
         {/* Importar perfil modificado */}
         
         <PerfilNav/>
        {/* Si esta autorizado muestra Logout(button)sino Login*/}
         
        <ul className="sessionInfo">
            
            <li >{user.name}</li> 
            <li ><CustomLink to="/"><LogoutButton/></CustomLink></li> 
            <li ><em><u>Ultimo inicio:</u> {user.updated_at}</em></li> 
            
            {/* Informacion al almacenamiento local */}
            {localStorage.setItem('User', user.name)} 
            {localStorage.setItem('User img', user.picture)}
            {localStorage.setItem('Last Updated', user.updated_at)}   
        </ul> 

        

        </ul>

       
        
    </nav>
}

export  const NavLogout = () => {

return <nav className="nav">
     
     {/* Logo desabilitada la funcion de desplegar menu */}
     <Link  className="site-title"><img src={logo} alt="" /></Link>
     

     <ul>
      {/* Importar perfil modificado */}
      
      <PerfilNav/>
     {/* Si esta autorizado muestra Logout(button)sino Login*/}
      
     <ul className="sessionInfo">
         
     <LoginButton/> 
             
             {/*Quitar informacion al almacenamiento local */}
             {localStorage.removeItem('User')}
             {localStorage.removeItem('User img')}
             {localStorage.removeItem('Last Updated')}

         </ul>
     

     

     </ul>

    
     
 </nav>
}