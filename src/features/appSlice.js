import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'red' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
  ],
  filters: {
    status: 'Active',
    colors: ['red', 'blue']
  }
};

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}


export const appSlice = createSlice({
  name: 'app',
  initialState,
   reducers: {
    addTodoList: (state, action) => {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: nextTodoId(state.todos),
            text: action.payload,
            completed: false
          }
        ]
      }
    },
    removeTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.filter(todo => 
           (todo.id !== action.payload) 
        )
      }
    }
    ,
    todoToggled : (state, action) => {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed
            }
          }

          return todo
        })
      }
    }, 
    statusFilterChanged : (state, action) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.payload
        }
      }
    }
  },
});

export const { addTodoList, todoToggled, statusFilterChanged, removeTodo } = appSlice.actions

export const selectTodo = (state) => state.app.todos;

export default appSlice.reducer;
