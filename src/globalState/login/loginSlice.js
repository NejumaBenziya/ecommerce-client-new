import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: null,
  
  user: null,
  authChecked: false, // ✅ IMPORTANT
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isLoggedIn = true;
      
      state.authChecked = true; // ✅ mark done
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
     
      state.user = null;
      state.authChecked = true; // ✅ still checked
    },

    authFinished: (state) => {
      state.authChecked = true; // ✅ for failed auth
    },
  },
});

export const { setAuthUser, logout, authFinished } = authSlice.actions;
export default authSlice.reducer;
