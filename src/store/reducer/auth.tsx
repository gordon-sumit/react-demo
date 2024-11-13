import {createSlice} from "@reduxjs/toolkit";
import {initialState, login, validateMFA} from "../actions/login";

const doLogin = createSlice({
    name: 'dologin',
    initialState,
    reducers: {
        removeToken: state => {
            state.userToken = null;
            localStorage.removeItem('userToken')
            localStorage.removeItem('idToken')
            localStorage.removeItem('temporary-credentials')
            return state;
        },
        saveToken: (state, {payload}) => {
            if (payload) {
                localStorage.setItem('userToken', payload);
                //localStorage.setItem('idToken', payload);
                state.userToken = payload;
            } else {
                state.userToken = localStorage.getItem('userToken');
                state.idToken = localStorage.getItem('idToken');
                state.temporaryCredentials = JSON.parse(localStorage.getItem('temporary-credentials'));
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
                    if(payload.AuthenticationResult){
                        state.userToken = payload.AuthenticationResult.AccessToken;
                        state.idToken = payload.AuthenticationResult.IdToken;
                        state.temporaryCredentials = payload.resourceAccessCreds;
                        localStorage.setItem('userToken', payload.AuthenticationResult.AccessToken);
                        localStorage.setItem('idToken', payload.AuthenticationResult.IdToken);
                        localStorage.setItem('temporary-credentials', JSON.stringify(payload.resourceAccessCreds));
                    }else{
                        if(payload.ChallengeName){
                            state.authChallenge = payload.ChallengeName;
                            state.session = payload.Session;
                            if (payload.qr) {
                                state.qr = payload.qr;
                            }
                        }
                    }
                    state.loading = false;
                }
            })
            .addCase(validateMFA.fulfilled, (state, action) => {
                // Handle the fulfilled state here
                if (action.payload.AuthenticationResult.AccessToken) {
                    state.userToken = action.payload.AuthenticationResult.AccessToken;
                    state.idToken = action.payload.AuthenticationResult.IdToken;
                    state.temporaryCredentials = action.payload.resourceAccessCreds;
                    localStorage.setItem('userToken', action.payload.AuthenticationResult.AccessToken);
                    localStorage.setItem('idToken', action.payload.AuthenticationResult.IdToken);
                    localStorage.setItem('temporary-credentials', JSON.stringify(action.payload.resourceAccessCreds));
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