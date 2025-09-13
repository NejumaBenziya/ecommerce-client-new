import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    role: null,
    cartLength: 0,
  },
  reducers: {
    updateLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    setCartLength: (state, action) => {
      state.cartLength = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.cartLength = 0;
    },
  },
});

export const { updateLoginStatus, setUserRole, setCartLength, logout } =
  loginSlice.actions;
export default loginSlice.reducer;
