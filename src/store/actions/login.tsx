import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {error} from "./error";
import {isError} from "../reducer/errorReducer";
import {Navigate, redirect, useNavigate} from "react-router-dom";

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
            if (data.error === 'error') {
                dispatch(isError('invalid credentials...'))
            } else {
                dispatch(isError(''))
                localStorage.setItem('userToken', data.access_token)
            }
            return data
        } catch (error) {
            console.log('error : ', error.message)
        }
    }
);


export const fethData = createAsyncThunk(
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
}

