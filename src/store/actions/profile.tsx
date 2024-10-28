import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfiles = createAsyncThunk(
    'fetchProfiles',
    async (userToken) => {
        if(!userToken) return;
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        return data;
    }
);

export const onDeleteUser = createAsyncThunk('onDeleteUser',
    async ({token, ids}) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: ids
        }
        const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/delete-user`, config);
        return data;
    });