//Importaciones
import { useAuth0 } from "@auth0/auth0-react"
import { FormularioLista } from '../Componentes/FormularioLista';

/* Elementos/componentes unicos que aparecen en esta pagina */
export default function ListaPage() {
    const {user, isAuthenticated} = useAuth0()

    return <>
    <h1>Gestor de tareas</h1>
    {isAuthenticated 

    /* Si esta logeado */
    ? <div> 
    <div className='RecognizedUserMesagge'> ¡Hola <span>{user.name}</span>,continua desde donde te habias quedado!</div>
    <div className='LoggedList'>
    <FormularioLista/>
    </div>
    
    {/* 
    Componente para mostrar todas las opciones de usuario del auth0
    <Perfil/> 
    */}
    </div> 

    /* Si no esta logeado */
    : <></>
    } 
        </>
    }


  