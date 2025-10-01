import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signUpUser } from "./auth-actions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    idToken: null,
    email : null,
    isLoggedIn: false,
    isHydrated: false
  },
  reducers: {
    logout(state) {
      state.idToken = null,
      state.email = null
      state.isLoggedIn = false
    },

    setHydrated(state){
      state.isHydrated = true
    },

    setAuthFromStorage(state, action){
      state.idToken = action.payload.idToken;
      state.email = action.payload.email;
      state.isLoggedIn = true
      state.isHydrated = true
    }
  },

  extraReducers: (builder) => {
    builder

      // signup user
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.idToken = action.payload.idToken;
        state.email = action.payload.email;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
      })


      // login user
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true
      })
      
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.idToken = action.payload.idToken;
        state.email = action.payload.email;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export const authActions = authSlice.actions
export default authSlice