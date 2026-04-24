import { createSlice } from "@reduxjs/toolkit";

//  Initial state of authentication
const initialState = {
  isLoggedIn: false,   // whether user is logged in or not
  role: null,          // user role (admin / seller / member)
  wishlist: [],        // list of product IDs in wishlist
  cartLength: 0,       // total number of items in cart
  user: null,          // full user object
  authChecked: false,  //  used to check if auth validation is completed
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Set user after login / refresh (/me API)
    setAuthUser: (state, action) => {

      //  store full user data
      state.user = action.payload.user;

      //  store role separately for easy access
      state.role = action.payload.role;
     
      //  update cart count (fallback to 0 if undefined)
      state.cartLength = action.payload.cartLength || 0;

      //  mark user as logged in
      state.isLoggedIn = true;
      
      // auth check completed
      state.authChecked = true; 
    },

    //  Update wishlist globally
    setWishlist: (state, action) => {
      state.wishlist = action.payload.wishlist;
    },

    //  Logout user
    logout: (state) => {

      // reset auth state
      state.isLoggedIn = false;
      state.role = null;
      
      // remove user data
      state.user = null;

      // keep authChecked true so UI doesn't hang
      state.authChecked = true; 
    },

    //  Used when auth check fails (ex: token invalid)
    authFinished: (state) => {
      state.authChecked = true; // prevents infinite loading UI
    },
  },
});

// Export actions
export const { setAuthUser, setWishlist, logout, authFinished } = authSlice.actions;

//  Export reducer
export default authSlice.reducer;