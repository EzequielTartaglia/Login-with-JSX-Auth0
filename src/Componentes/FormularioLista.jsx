import { useState } from "react"
import Task from "./Task"
import '../Styles/FormularioLista.css'

export function FormularioLista() {
    
    //Hook para hacer cambio de estado
    const [title, setTitle] = useState('')
    const [lista,setLista] = useState([])


    //Recibir informacion del input text
    function handleChange(e){
        //Traer los caracteres escritos(valor)
        const value = e.target.value
        //Setearlo
        setTitle(value)
    }
  
    //Funcion del submit
    function handleSubmit(e){
        e.preventDefault()

        const newTask = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        }

        //Copiar la lista
        const copiedList = [...lista]
        //Agregar este elemento a la lista
        copiedList.unshift(newTask)
        //Setearlo
        setLista(copiedList)
        //Borrar el valor(al cambiar estado)
        setTitle("")
    }

    //Funcion para procesar el cambio de valores entre antiguo valor y editado
    function handleClickUpdate(id, value){

        const copiedList = [...lista]
        const item = copiedList.find(item => item.id === id)
        item.title = value
        setLista(copiedList)
    }

    //Funcion para eliminar task(tarea)
    function handleDelete(id){
        //Encontrar ese id
        const copiedList = lista.filter(item => item.id !== id)
        setLista(copiedList)
    }

    return <>
    <div className="container">
        <form className="form" onSubmit={handleSubmit}>
            <input onChange={handleChange}className="taskInput" value={title}/>
            <input onClick={handleSubmit} className="btnCreateTask" type="submit" value="Crear nueva tarea" />
        </form>
        <div className="tasksContainer">
            {/* Recorrido del array */}
            {lista.map(item => (
                <Task key={item.id} item={item} onUpdate={handleClickUpdate} onDelete={handleDelete}/>
            ))}
        </div>
    </div>
    </>
}