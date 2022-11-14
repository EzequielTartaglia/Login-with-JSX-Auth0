import { useState, useEffect } from "react"
import Task from "./Task"
import '../Styles/FormularioLista.css'

export function FormularioLista() {
    
    //Hook para hacer cambio de estado
    const [title, setTitle] = useState('')
    const [lista,setLista] = useState([])

    useEffect(() =>{
      if(localStorage.getItem("Lista almacenada")){
        const savedList = JSON.parse(localStorage.getItem("Lista almacenada"))
        setLista(savedList)
      }
    },[])

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

        if(title) {
            const newTask = {id: crypto.randomUUID(),
            title: title,
            started: false,
            checked: false
        }
            //Copiar la lista y setearlo
            setLista([...lista,newTask])
            //Agregarlo al LocalStorage
            localStorage.setItem("Lista almacenada",JSON.stringify([...lista,newTask]))
           //Borrar el valor(al cambiar estado)
            setTitle("")
        }

    }

    //Funcion para procesar el cambio de valores entre antiguo valor y editado
    function handleClickUpdate(id, value){

        const copiedList = [...lista]
        const item = copiedList.find(item => item.id === id)
        item.title = value
        //Guardar valor modificado en el localStorage
        localStorage.setItem("Lista almacenada",JSON.stringify([...copiedList]))
        setLista(copiedList)
        
    }

    //Funcion para eliminar task(tarea)
    function handleDelete(id){
        //Encontrar ese id
        const deleted = lista.filter(item => item.id !== id)
        setLista(deleted)
        //Borrar en localStorage
        localStorage.setItem("Lista almacenada",JSON.stringify(deleted))
    }

    function handleDone(id){
        const copiedList = [...lista]
        const item = lista.findIndex(item => item.id === id)
        copiedList[item] = {
            id: copiedList[item].id,
            title: copiedList[item].title,
            started: !copiedList[item].started,
            checked: false

        }
        localStorage.setItem("Lista almacenada",JSON.stringify(copiedList))
        setLista(copiedList)

        
    }
    function handleDoneCheck(id){
        const copiedList = [...lista]
        const item = lista.findIndex(item => item.id === id)
        copiedList[item] = {
            id: copiedList[item].id,
            title: copiedList[item].title,
            started: true,
            checked: !copiedList[item].checked
        }
        localStorage.setItem("Lista almacenada",JSON.stringify(copiedList))
        setLista(copiedList)
    }
    return <>
    <div className="container">
        <form className="form" onSubmit={handleSubmit}>

            <input 
            onChange={handleChange}
            className="taskInput" 
            value={title}/>

            <input 
            onClick={handleSubmit} 
            className="btnCreateTask" 
            type="submit" 
            value="Crear nueva tarea" />

        </form>
        <div className="tasksContainer">
            {/* Recorrido del array */}
            {lista.map(item => (
                <Task 
                key={item.id} 
                item={item} 
                onUpdate={handleClickUpdate} 
                onDelete={handleDelete} 
                onDone={handleDone}
                onDoneCheck = {handleDoneCheck}
                started={item.started}
                checked= {item.checked}
                />
            ))}
        </div>
    </div>
    </>
}