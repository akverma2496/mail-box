import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-state/auth-slice";
import emailSlice from "./email-state/email-slice";

const store = configureStore({
    reducer : { auth : authSlice.reducer, email : emailSlice.reducer }
})

export default store