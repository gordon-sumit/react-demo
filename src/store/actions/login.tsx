import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {error} from "./error";
import {isError} from "../reducer/errorReducer";
import {Navigate, redirect, useNavigate} from "react-router-dom";
import {loadConfigFromFile} from "vite";
import {saveToken, setAuthChallenge} from "../reducer/auth";

export const LOGIN = 'app.login';
// export const login = (email,password) => ({
//     type: LOGIN,
//     email,
//     password
// })
export const login = createAsyncThunk(
    LOGIN,
    async ({email, password}, {dispatch}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'abc'
                },
            }
            const {data} = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/auth/login`,
                {email, password},
                config
            )
            return data
        } catch (error) {
            //console.log('error : ', error);
            //if (error.response) {
            dispatch(isError(error.response.data.message))
            throw new Error(error.response.data.message);
            // dispatch(isError(error.response.data.message))
            //}
        }
    }
);

export const validateMFA = createAsyncThunk(
    'login/validateMFA',
    async (formData, {dispatch, getState}) => {
        const state = getState();
        const {authChallenge} = state && state.root && state.root.auth;
        console.log(authChallenge, 'challengeName', state.root.auth, 'state')
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            if (authChallenge) {
                const {data} = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/user/auth/${authChallenge === 'MFA_SETUP' ? 'verifySoftwareToken' : 'respondToAuthChallenge'}`,
                    formData,
                    config
                );
                return data;
            }
        } catch (e) {
            console.log('error : ', e.message)
        }
    }
);


export const fetchData = createAsyncThunk(
    'fetch',
    async () => {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return data;
    }
)

export const fetchUsers = createAsyncThunk(
    'fetchUsers',
    async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
        return data;
    }
)

export const initialState = {
    loading: false,
    userInfo: null,
    userToken: null,
    error: null,
    success: false,
    authChallenge: null,
    session: null,
    qr: null,
}

