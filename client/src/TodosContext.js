import React,{useContext,useState} from 'react';
import axios from "axios";

const TodosContext = React.createContext()

export const useTodosContext = () => {
    return useContext(TodosContext)
}

const TodosProvider = ({children}) => {
    const id = process.env.DBID || "606b9cb88ee796e07afdd9ff"
    const [todosState,setTodos] = useState(null)
    const [modal,setModal] = useState({
        isModalActive:false
    })
    const [removedIndex,setRemovedIndex] = useState(null)

    const colors = {
        red:{
            fontColor: "black",
            background: "linear-gradient(#f85032,#e73827)"
        },
        orange:{
            fontColor: "black",
            background: "linear-gradient(#fc4a1a,#f7b733)"
        },
        yellow:{
            fontColor: "black",
            background: "linear-gradient(#fffc00,#ffffff)"
        },
        blue:{
            fontColor: "black",
            background: "linear-gradient(#2193b0,#6dd5ed)"
        },
        green:{
            fontColor: "black",
            background: "linear-gradient(#56ab2f,#a8e063)"
        },
        purple:{
            fontColor: "black",
            background: "linear-gradient(#da22ff,#9733ee)"
        },
        violet:{
            fontColor: "black",
            background: "linear-gradient(#6a3093,#a044ff)"
        },
        gray:{
            fontColor: "black",
            background: "linear-gradient(#3e5151,#decba4)"
        },
        black:{
            fontColor: "black",
            background: "linear-gradient(#232526,#414345)"
        }
    }

    const addNewList = () => {
        const todosArr = [...todosState];
        todosArr.push({
            section:"",
            style:null,
            todos:[]
        })
        setTodos(todosArr)
    }

    const onChangeSection = (e) => {
        const{value} = e.target;
        const newArr = [...todosState];
        newArr[todosState.length-1].section = value;
        setTodos(newArr)
    }

    const onChangeColor = (e,data) => {
        e.preventDefault()
        const newArr = [...todosState];
        newArr[todosState.length-1].style = data;
        setTodos(newArr)
    }

    const addNewTodo = (e,i) => {
        e.preventDefault();
        const newArr = [...todosState]
        newArr[i].todos.push({
            text:"",
            isCompleted:false,
            completedDate: Date.now()
        })
        setTodos(newArr)
        setRemovedIndex(newArr[i].todos.length-1)
    }
    const removeNewToDo = (e,i,removedIndex) => {
        e.preventDefault();
        if(removedIndex){
            const newArr = [...todosState]
            newArr[i].todos.splice(removedIndex,1)
            setTodos(newArr)
        }
    }

    const onChangeTodoText = (e,i,todoIndex) => {
        const{value} = e.target;
        const newArr = [...todosState]
        newArr[i].todos[todoIndex].text = value
        setTodos(newArr)

    }
    const removeSection = async (e,i) => {
        e.preventDefault();
        const newArr = [...todosState]
        newArr.splice(i,1)
        setTodos(newArr)
        try{
            const res = await axios.put("/api/todos/"+id, {
                sections:newArr
            })
            setTodos(res.data.sections)
        }catch (e) {
            console.log(e.message)
        }
    }

    const removeTodo = async (e,listIndex,todoIndex) => {
        e.preventDefault();
        const newArr = [...todosState]
        newArr[listIndex].todos.splice(todoIndex,1)
        try{
            const res = await axios.put("/api/todos/"+id, {
                sections:newArr
            })
            setTodos(res.data.sections);
        }catch (e) {
            console.log(e.message)
        }
    }
    const completeTodo = async (e,listIndex,todoIndex) => {
        e.preventDefault();
        const newArr = [...todosState]
        newArr[listIndex].todos[todoIndex].isCompleted = !newArr[listIndex].todos[todoIndex].isCompleted
        try{
            const res = await axios.put("/api/todos/"+id, {
                sections:newArr
            })
            setTodos(res.data.sections)
        }catch (e) {
            console.log(e.message)
        }
    }

    const handleKeyPress = (e) => {
        e.preventDefault()
        setRemovedIndex(null)
        manageTodoList(e)
    }

    const checkEmptyTodo = () => {
        const newToDo = [...todosState]
        newToDo.map((section)=> {
            if(section.todos.length>0){
                section.todos.map((todo,i )=> {
                    if (todo.text === "") {
                        section.todos.splice(i,1)
                    }
                })
            }
        })
        return newToDo
    }

    const manageTodoList = async (e) => {
        e.preventDefault();
        setModal({isModalActive: false})
        setRemovedIndex(null)
        try{
            const finalToDo = await checkEmptyTodo()
            const res = await axios.put("/api/todos/"+id, {
                sections:finalToDo
            })
            setTodos(res.data.sections)
            const input = document.querySelector(".addToDoInput");
            input.value = "";
            input.blur()
        }catch (e) {
            console.log(e.message)
        }
    }
    return(
        <TodosContext.Provider value={{
            id,
            todosState,
            setTodos,
            modal,
            setModal,
            removedIndex,
            setRemovedIndex,
            colors,
            onChangeSection,
            onChangeColor,
            onChangeTodoText,
            addNewList,
            addNewTodo,
            removeSection,
            removeNewToDo,
            removeTodo,
            completeTodo,
            manageTodoList,
            handleKeyPress
        }}>
            {children}
        </TodosContext.Provider>
    )
}

export default TodosProvider