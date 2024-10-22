import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfiles = createAsyncThunk(
    'fetchProfiles',
    async (userToken) => {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        return data;
    }
)