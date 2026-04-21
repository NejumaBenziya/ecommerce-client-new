import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: null,
  wishlist:[],
  cartLength:0,
  user: null,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
     
      state.cartLength=action.payload.cartLength||0;
      state.isLoggedIn = true;
      
      state.authChecked = true; 
    },
    setWishlist: (state, action) => {
  state.wishlist = action.payload.wishlist;
},

    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      
      state.user = null;
      state.authChecked = true; 
    },

    authFinished: (state) => {
      state.authChecked = true; //  for failed auth
    },
  },
});

export const { setAuthUser,setWishlist, logout, authFinished } = authSlice.actions;
export default authSlice.reducer;
