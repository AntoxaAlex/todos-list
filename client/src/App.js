import React, {useEffect, Fragment} from "react"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import CreateListModal from "./CreateListModal";
import {useTodosContext} from "./TodosContext";

function App() {

  const todosContext = useTodosContext()
  const{
    id,
    todosState,
    setTodos,
    modal,
    setModal,
    removedIndex,
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
  } = todosContext

  useEffect(async ()=>{
    const res = await axios.get("/api/todos/"+id);
    setTodos(res.data.sections)
  },[])

  return (
      <Fragment>
        {todosState &&  <div className="App">
          {modal.isModalActive && <CreateListModal
              closeModal={()=> {
                setModal({isModalActive: false})
                const newArr = [...todosState];
                newArr.splice(todosState.length-1,1)
                setTodos(newArr)
              }}
              inputData={{
                todosState,
                colors,
                onChangeSection:(e)=>onChangeSection(e),
                onChangeColor:(e,data)=>onChangeColor(e,data),
                manageTodoList:(e)=>manageTodoList(e)
              }}
          />}
          <button id="createListBtn" onClick={()=> {
            setModal({isModalActive: true});
            addNewList();
          }}><i className="fas fa-plus"/></button>
          <div className="row">
            <div className="col-sm-12">
              <img alt="" style={{width:"100%",height: "300px"}} src="https://res.cloudinary.com/antoxaalex/image/upload/v1617638137/backgrounds/Drawing-8.sketchpad_mgpwdh.svg" />
            </div>
          </div>
          <div className="row p-4">
            {todosState.map((list,i)=>{
              return(
                  <Fragment key={i} >
                    {list.section && list.section !== "" && list.style && list.style.background !== "" && list.style.fontColor !== "" &&
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                      <div key={i} style={{background: list.style.background,color: list.style.fontColor}} className="todoContainer">
                        <button type="button" className="btn btn-sm btn-danger float-right" onClick={(e)=>removeSection(e,i)}>X</button>
                        <h3 className="text-center mb-3">{list.section}</h3>
                        <form>
                          <input
                              className="form-control addToDoInput"
                              autoComplete="off"
                              type="text" placeholder="Add New Todo"
                              onFocus={(e)=>addNewTodo(e,i)}
                              onBlur={(e)=>removeNewToDo(e,i,removedIndex)}
                              onChange={(e)=> {
                                onChangeTodoText(e, i, removedIndex)
                              }}
                              onKeyPress={(e)=>{
                                if(e.key === "Enter"){
                                  handleKeyPress(e)
                                  return false
                                }
                              }}
                          />
                        </form>
                        <ul>
                          {list.todos && list.todos.length > 0 && list.todos.map((todo,index)=>{
                            return(
                                <Fragment key={index}>
                                  {todo.text && todo.text !== "" &&
                                  <li>
                                  <span className="deleteButton">
                                    <button
                                        className="transparentBtn"
                                        type="button"
                                        onClick={(e)=>removeTodo(e,i,index)}
                                    >
                                      <i className="fas fa-trash-alt"/>
                                    </button>
                                  </span>
                                    <span className="textSpan">
                                    <button
                                        type="button"
                                        className="transparentBtn"
                                        onClick={(e)=>completeTodo(e,i,index)}
                                    >
                                      <span className={todo.isCompleted ? "completed" : ""}>
                                        {todo.text}
                                      </span>
                                    </button>
                                  </span>
                                  </li>
                                  }
                                </Fragment>
                            )})}
                        </ul>
                      </div>
                    </div>
                    }
                  </Fragment>)
            })}
          </div>
        </div>}
      </Fragment>
  );
}

export default App;
