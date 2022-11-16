import { useState, useEffect } from "react"
import Task from "./Task"
import '../Styles/FormularioLista.css'
import { FaSearch } from "react-icons/fa"

export function FormularioLista() {
    
    //Hook para hacer cambio de estado
        const [title, setTitle] = useState('')
        const [lista,setLista] = useState([])
    
    //Funcion de busqueda
        const [search, setSearch]  = useState('')
        
        //Declarar una constante con la lista de datos
        const dataBase = JSON.parse(localStorage.getItem("Lista almacenada"))
        
        //Funcion para buscar
        function searcher(e){
            setSearch(e.target.value)
        }
        //Metodo para filtrar(lo buscado)
        let results = []
        if(!search){
            results = dataBase
        }
        else{
            results=  dataBase.filter((dataItem) => dataItem.title.toLowerCase().includes(search.toLocaleLowerCase()))
            
        }

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

    //Funcion para iniciar task(tarea)
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
    
    //Funcion para poner check una task(tarea)
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


    //Componente final
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

        <div className="searchBar">
            <div className="searchInput">
                <input type="text" 
                value={search}
                onChange={searcher}
                placeholder="Busca una tarea..." className="prompt"
                />
                <i className="searchIcon">{FaSearch()}</i>  
            </div>
        </div>

        <div className="tasksContainer">
            {/* Recorrido del array (results
                viene desde el localStorage) */}
                
            {results.map(item => (
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