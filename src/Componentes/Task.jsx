import { useState } from 'react'
import '../Styles/FormularioLista.css'

export default function Task({ item, onUpdate, onDelete }){
    
    const [isEditar, setIsEditar] = useState(false)
    
    //Funcion para el "estado de edicion" de la tarea
    function FormEditar(){

        //Crear un estado que tome como valor el original title
        const [newValue,setNewValue] = useState(item.title)

        //Funcion para editar campo
        function handleSubmit(e){
            
            e.preventDefault()

        }

        //Funcion para editar el texto del campo
        function handleChange(e){
            const value = e.target.value
            setNewValue(value)
        }

        //Funcion para procesar el cambio(edicion)
        function handleClickUpdate(){
            onUpdate(item.id,newValue)
            setIsEditar(false)
        }

        return <form id='taskUpdateForm' onSubmit={handleSubmit}>
            <input type="text" className="taskInput" onChange={handleChange} value={newValue}/>
            <button id="buttonEdit" onClick={handleClickUpdate}>Cambiar</button>
        </form>
    }

    //Estado default para cada task(tarea)
    function TaskElement(){

        return (<div id='taskInformation'>
        <span className='taskTitle'>{item.title} </span>
        <button id='buttonEdit' onClick={() => setIsEditar(true)}>Editar</button>
        <button id="buttonDelete" onClick={(e) => onDelete(item.id)}>Eliminar</button>
        </div>)

    }

    return <div className='taskToDo'>{isEditar ? <FormEditar/>: <TaskElement/>}
    </div>

        
}