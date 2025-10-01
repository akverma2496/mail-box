import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authActions } from "./auth-slice";
const apiKey = import.meta.env.VITE_API_KEY;

export const signUpUser = createAsyncThunk(
    "auth/signUpUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {

            const { data } = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
                {
                    email, password,
                    returnSecureToken: true,
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const expiresIn = Number(data.expiresIn) * 1000; // in milliseconds
            const expiresAt = Date.now() + expiresIn;

            setTimeout(() => {
                dispatch(authActions.logout())
                localStorage.removeItem("auth")
            }, expiresIn)

            const authData = {
                idToken: data.idToken,
                email: data.email,
                expiresAt
            }

            localStorage.setItem("auth", JSON.stringify(authData));
            return authData

        } catch (error) {
            return rejectWithValue(error.response.data.error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
                {
                    email, password,
                    returnSecureToken: true
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            console.log(data)

            const expiresIn = Number(data.expiresIn) * 1000; // in milliseconds
            const expiresAt = Date.now() + expiresIn;

            setTimeout(() => {
                dispatch(authActions.logout())
                localStorage.removeItem("auth")
            }, expiresIn)

            const authData = {
                idToken: data.idToken,
                email: data.email,
                expiresAt
            }

            localStorage.setItem("auth", JSON.stringify(authData));
            return authData

        } catch (error) {
            return rejectWithValue(error.response.data.error.message);
        }
    }
)