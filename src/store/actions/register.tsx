import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchUserProfiles} from "./profile";

export const doRegister = createAsyncThunk(
    'doRegister',
    async (formData, {dispatch}) => {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user`, formData,{
            headers: {
                'ngrok-skip-browser-warning': 'abc'
            }
        }).then().then(()=>{
            dispatch(fetchUserProfiles())
        })
    },

);