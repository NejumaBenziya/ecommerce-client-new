import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./login/loginSlice"; 
export const store = configureStore({
  reducer: {
    auth: authReducer,   
  },
});
