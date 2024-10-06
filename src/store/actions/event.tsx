import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {isError, isSuccess} from "../reducer/form";

export const createEvent = createAsyncThunk('event/create', async (eventInfo, {dispatch}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'abc'
        },
    }
    try {
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/event`, eventInfo, config)
        console.log(data, ' this  is response...')
        if (!data.code) {
            dispatch(isSuccess('Event has been created!'))
        } else {
            dispatch(isError(`${data.code} ${data.errors[0].message}`))
        }
        return data;
    } catch (e) {
        dispatch(isError('Something went wrong!'))
        console.log(e, 'error')

    }
})

export const listEvent = createAsyncThunk('event/list',async ()=>{
    const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}event`,{
        headers: {
            'ngrok-skip-browser-warning': 'abc'
        }});
    return data;
})