import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";

const MyMiddleware = (store) => (next) => (action) => {
  console.log(action);
  if(action.type === "app/addTodoList" && action.payload === "fuck"){
    action.payload = "***";
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: [MyMiddleware],
});
