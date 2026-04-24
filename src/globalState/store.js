import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./login/loginSlice";

//  Create Redux store
export const store = configureStore({
  reducer: {

    //  Auth slice (handles login, logout, wishlist, cart count, etc.)
    auth: authReducer,

    //  You can add more slices here in future
    // example:
    // product: productReducer,
    // order: orderReducer,
   
  },
});