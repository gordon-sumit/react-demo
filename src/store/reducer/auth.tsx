import {createSlice} from "@reduxjs/toolkit";
import {initialState, login, validateMFA} from "../actions/login";

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
        },
        setAuthChallenge: (state, {payload}) => {
            if (payload) {
                state.authChallenge = payload.ChallengeName;
                state.session = payload.Session;
            }
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                // Handle the pending state here
                state.loading = true;
            })
            .addCase(validateMFA.pending, (state) => {
                // Handle the pending state here
                state.loading = true;
                state.userToken = null;
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                if (payload) {
                    state.authChallenge = payload.ChallengeName;
                    state.session = payload.Session;
                    if (payload.qr) {
                        state.qr = payload.qr;
                    }
                    state.loading = false;
                }
            })
            .addCase(validateMFA.fulfilled, (state, action) => {
                // Handle the fulfilled state here
                if (action.payload.AuthenticationResult.AccessToken) {
                    state.userToken = action.payload.AuthenticationResult.AccessToken;
                    localStorage.setItem('userToken', action.payload.AuthenticationResult.AccessToken)
                    state.loading = false;
                    state.authChallenge = null;
                    state.session = null;
                }
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action,'ooooooooooo')
                state.loading = false;
            })
    },
});

export const {saveToken, setAuthChallenge, removeToken} = doLogin.actions;
export default doLogin.reducer;