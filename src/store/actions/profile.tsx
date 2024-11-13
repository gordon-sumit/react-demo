import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {removeToken} from "../reducer/auth";

export const fetchUserProfiles = createAsyncThunk(
    'fetchProfiles',
    async (userToken) => {
        if (!userToken) return;
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        return data;
    }
);


export const fetchAllMedia = createAsyncThunk(
    'fetchMedia',
    async ({userToken, temporaryCredentials}, {dispatch}) => {
        if (!userToken) return;
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/media`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    temporaryCredentials: JSON.stringify(temporaryCredentials.Credentials)
                }
            })
            return data;
        } catch (error) {
             dispatch(removeToken());
            throw new Error(error.response.data.message);
        }
    }
);

export const uploadMedia = createAsyncThunk(
    'uploadMedia',
    async ({userToken, file, temporaryCredentials}, {dispatch}) => {
        if (!userToken) return;
        try {
            const formData = new FormData();
            formData.append('file', file);
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/upload-media`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        temporaryCredentials: JSON.stringify(temporaryCredentials.Credentials),
                        'Content-Type': file.type,
                    }

                })
            if(data){
                dispatch(fetchAllMedia({userToken, temporaryCredentials}));
            }
            return data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
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