import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import taskReducer from "./task/taskReducer";
import ProjectReducer from "./project/projectReducer"

const reducer = {
    auth: authReducer,
    task : taskReducer,
    project: ProjectReducer,

  };
  const store = configureStore({
    reducer,
  });
  export type RootState = ReturnType<typeof store.getState>;
  export default store;
  