import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTodo } from "../features/appSlice";

function TodoList({ getTodo, removeTodoById }) {
  const selectorTodo = useSelector(selectTodo);
  const [styleOfTodos, setStyleOfTodos] = useState(false);
  const [styleOfTodoComplete, setStyleOfTodoComplete] = useState(false);

  const getAllTodo = () => {
    setStyleOfTodos(true);
    setStyleOfTodoComplete(false);
  };

  const getTodoComplete = () => {
    setStyleOfTodos(false);
    setStyleOfTodoComplete(true);
  };
  const getTodoActive = () => {
    setStyleOfTodos(false);
    setStyleOfTodoComplete(false);
  };

  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {styleOfTodos &&
          !styleOfTodoComplete &&
          selectorTodo.map((todo, index) => (
            <li style={{cursor: "pointer"}} onClick={() => getTodo(todo.id)} key={index}>
              <span style={{ textDecoration: `${todo.completed ? "line-through" : ""}` }}>
                {todo.text}
              </span>
              <span
                style={{ marginLeft: "15px", cursor: "pointer" }}
                onClick={() => removeTodoById(todo.id)}
              >
                X
              </span>
            </li>
          ))}
        {!styleOfTodos &&
          styleOfTodoComplete &&
          selectorTodo.map(
            (todo, index) =>
              todo.completed && (
                <li onClick={() => getTodo(todo.id)} key={index}>
                  <span style={{ textDecoration:"line-through" }}>
                    {todo.text}
                  </span>
                  <span
                    style={{ marginLeft: "15px", cursor: "pointer" }}
                    onClick={() => removeTodoById(todo.id)}
                  >
                    X
                  </span>
                </li>
              )
          )}
        {!styleOfTodos &&
          !styleOfTodoComplete &&
          selectorTodo.map(
            (todo, index) =>
              !todo.completed && (
                <li onClick={() => getTodo(todo.id)} key={index}>
                  <span>
                    {todo.text}
                  </span>
                  <span
                    style={{ marginLeft: "15px", cursor: "pointer" }}
                    onClick={() => removeTodoById(todo.id)}
                  >
                    X
                  </span>
                </li>
              )
          )}
      </ul>
      <button onClick={getAllTodo}>All Todo</button>
      <button onClick={getTodoComplete}>Complete</button>
      <button onClick={getTodoActive}>Active</button>
    </div>
  );
}

export default TodoList;
