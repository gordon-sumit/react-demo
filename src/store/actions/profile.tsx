import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfiles = createAsyncThunk(
    'fetchProfiles',
    async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
            headers: {
                'ngrok-skip-browser-warning': 'abc'
            }
        })
        return data;
    }
)