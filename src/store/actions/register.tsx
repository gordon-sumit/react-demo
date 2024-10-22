import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchUserProfiles} from "./profile";
import {saveToken} from "../reducer/auth";

export const doRegister = createAsyncThunk(
    'doRegister',
    async (formData, {dispatch}) => {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user`, formData, {
            headers: {}
        }).then().then((res) => {
            console.log(res)
            dispatch(saveToken(token))
        })
    },
);


export const fetchGoogleProfile = createAsyncThunk(
    'doGoogleRegister',
    async (token, {dispatch}) => {
        const {data} = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        });
        if (data) {
            const formData = {
                firstName: data.given_name,
                lastName: data.family_name,
                email: data.email,
                phone: '',
                address: '',
                password: 123456,
            };
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user`, formData).then().then((res) => {
                console.log(res)
                dispatch(saveToken(token))
            })
        }

        return data;

    }
);