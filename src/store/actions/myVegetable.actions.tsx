import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {isSuccess} from "../reducer/form";
import {emptyBucket, setCurrentPage} from "../reducer/vegetable";


export const myVegetables = createAsyncThunk(
    'my-veggies/get',
    async ({page, order, search}, {dispatch, getState}) => {
        const state = getState();
        const {userToken, temporaryCredentials} = state && state.root && state.root.auth;
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vegetable/${page ? page : 1}/${order}${search ? `/${search}` : ''}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    temporaryCredentials: JSON.stringify(temporaryCredentials.Credentials)
                }
            }
        )
        dispatch(setCurrentPage(page ? page : 1))
        return data;
    }
);

export const removeItemFromDefault = createAsyncThunk('my-veggies/delete',
    async (id, {dispatch}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/vegetable/delete/${id}`, config);
        if (data) {
            dispatch(isSuccess('Item Deleted!'))
            dispatch(myVegetables({page: 1, order: 'desc', search: ''}))
        }
        return data;
    });

export const myVegetableActions = createAsyncThunk(
    'my-veggies/send',
    async ({myData, sendType}, {dispatch}) => {
        try {
            if (!myData.length) return;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const {data} = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/vegetable/send-message-${sendType}`,
                myData,
                config
            )
            if (data) {
                dispatch(emptyBucket())
            }
            return data;
        } catch (error) {
            console.log('error : ', error.message)
        }
    }
);


export const addVegetableAction = createAsyncThunk(
    'my-veggies/create',
    async (myData, {dispatch, getState}) => {
        try {
            const state = getState();
            const {userToken, temporaryCredentials} = state && state.root && state.root.auth;
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    temporaryCredentials: JSON.stringify(temporaryCredentials.Credentials),
                    'Content-Type': 'multipart/form-data',
                }
            }
            const {data} = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/vegetable/add`,
                myData,
                config
            )
            if (data.filename) {
                dispatch(isSuccess(data.message))
                dispatch(myVegetables({page: 1, order: 'desc', search: ''}))
            }
            return data;
        } catch (error) {
            console.log('error : ', error.message)
        }
    }
);