import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import TodoList from "./components/TodoList";
import {
  addTodoList,
  statusFilterChanged,
  todoToggled,
  removeTodo
} from "./features/appSlice";

function App() {
  const dispatch = useDispatch();
  
  dispatch(statusFilterChanged("Active"));
  
  const inputRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    if(!inputRef.current.value) return;
    dispatch(addTodoList(inputRef.current.value));
    inputRef.current.value = "";
  };

  const getTodo = (id) => {
    dispatch(todoToggled(id));
  }

  const removeTodoById = (id) => {
    dispatch(removeTodo(id))
  }

  return (
    <div className="App">
      <form>
        <input ref={inputRef} type="text" placeholder="Input text" />
        <button style={{ display: "none" }} onClick={submitForm}>
          Submit
        </button>
      </form>
      <TodoList getTodo={getTodo} removeTodoById={removeTodoById} />
    </div>
  );
}

export default App;
