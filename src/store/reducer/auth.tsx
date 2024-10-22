import {createSlice} from "@reduxjs/toolkit";
import {initialState, login} from "../actions/login";

const doLogin = createSlice({
    name: 'dologin',
    initialState,
    reducers: {
        removeToken: state => {
            state.userToken = null;
            localStorage.removeItem('userToken')
            return state;
        },
        saveToken: (state, {payload}) => {
            if (payload) {
                localStorage.setItem('userToken', payload);
                state.userToken = payload;
            } else {
                state.userToken = localStorage.getItem('userToken');
             }
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                // Handle the pending state here
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                // Handle the fulfilled state here
                console.log(action, 'sddhsdsh')
                state.userToken = action.payload.access_token;
            })
            .addCase(login.rejected, (state, action) => {
                // Handle the rejected state here
            })
    },
});

export const {saveToken, removeToken} = doLogin.actions;
export default doLogin.reducer;