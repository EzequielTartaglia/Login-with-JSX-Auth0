import { useState } from 'react'
import '../Styles/FormularioLista.css'
import { FaCheckCircle,FaPause,FaPlay,FaEdit,FaTrash, FaReply } from "react-icons/fa";

export default function Task({ item, onUpdate, onDelete, onDone, onDoneCheck, started, checked }){
    
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

    //Funcion para el elemento de tarea empezada
    function TaskStarted(){
        return <div id='taskInformation' className='containerDoneStarted'>
        <span className='taskTitle'>{item.title}</span>
        <button id="buttonDoneStarted" onClick={(e) => onDone(item.id)}>{FaPause()}</button>
                <button id="buttonDoneFinish" onClick={(e) => onDoneCheck(item.id)}>{FaCheckCircle()}</button>
        </div>
        
    }
    
    //Funcion para el elemento de tarea completada
    function TaskFinished(){
        return <div id='taskInformation' className='containerDoneFinished'>
        <span className='taskTitle'>
             <del>{item.title}</del> </span>
             <button id="buttonDoneReply" onClick={(e) => onDone(item.id)}>{FaReply()}</button>
        <button id="buttonDoneFinished" onClick={(e) => onDoneCheck(item.id)}>{FaCheckCircle()}</button>
        </div>
        
    }  

    //Funcion tarea por hacer
    function TaskToDo(){
        return <div id='taskInformation'>
        <button id='buttonEdit' onClick={() => setIsEditar(true)}>{FaEdit()}</button>
        <span className='taskTitle'>{item.title} </span>
        <button id="buttonDone" onClick={(e) => onDone(item.id)}>{FaPlay()}</button> 
        <button id="buttonDelete" onClick={(e) => onDelete(item.id)}>{FaTrash()}</button>
        </div>
    }
    
    //Estado default para cada task(tarea)
    function TaskElement(){

        return (<>
        {started 
        //Tarea iniciada
        ? (checked ? <TaskFinished/> : <TaskStarted/>)
        //Tarea sin empezar
        :(<TaskToDo />)
        }
        </>)

    }
  
    
    return <div className='taskToDo'>{isEditar ? <FormEditar/>: <TaskElement/>}
    </div>

        
}

