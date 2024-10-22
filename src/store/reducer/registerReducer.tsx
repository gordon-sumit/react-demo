import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {doRegister} from "../actions/register";
import {useDispatch} from "react-redux";
import {fetchUserProfiles} from "../actions/profile";

const registerAdapter = createEntityAdapter();

const initialState = registerAdapter.getInitialState({
    saveData: null,
    loader: false,
})
const registerReducer = createSlice({
    name: 'doRegister',
    initialState,
    reducers: {
        validateData: state => {
            state.loader = true
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(doRegister.pending, (state, action) => {
            state.loader = true
        })
        builder.addCase(doRegister.fulfilled, (state, action) => {
            state.loader = false
        })
    },
});

export const {validateData} = registerReducer.actions;

export default registerReducer.reducer;