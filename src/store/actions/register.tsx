import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchUserProfiles} from "./profile";
import {saveToken} from "../reducer/auth";

export const doRegister = createAsyncThunk(
    'doRegister',
    async (formData, {dispatch}) => {
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user`, formData, {
            headers: {}
        });
        return data;
    },
);

export const confirmRegistration = createAsyncThunk(
    'doRegister/confirm',
    async ({username, code}, {dispatch}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
      try {
          const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/confirm-register`, {
              username,
              code
          }, config);
          return data;
      }catch (e) {
          console.log(e,'khghjhjfhjfh')
          throw new Error(e.response.data.message);
      }
    }
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