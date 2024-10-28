import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {confirmRegistration, doRegister, fetchGoogleProfile} from "../actions/register";
import {useDispatch} from "react-redux";
import {fetchUserProfiles} from "../actions/profile";

const registerAdapter = createEntityAdapter();

const initialState = registerAdapter.getInitialState({
    saveData: null,
    loader: false,
    codeDeliveryDetails: {},
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
        builder.addCase(doRegister.fulfilled, (state, {payload}) => {
            if (payload.CodeDeliveryDetails) {
                state.codeDeliveryDetails = payload.CodeDeliveryDetails;
            }
            state.loader = false
        })
        builder.addCase(confirmRegistration.pending, (state, action) => {
            state.loader = true
        })
        builder.addCase(confirmRegistration.fulfilled, (state, action) => {
            state.codeDeliveryDetails = {redirect: true}
            state.loader = false
        })
        builder.addCase(confirmRegistration.rejected, (state, action) => {
            console.log(action, 'this is reject action')
            state.codeDeliveryDetails.error = action.error.message
            state.loader = false
        })
        builder.addCase(fetchGoogleProfile.pending, (state, action) => {
            state.loader = true
        })
        builder.addCase(fetchGoogleProfile.fulfilled, (state, action) => {
            state.loader = false
        })
    },
});

export const {validateData} = registerReducer.actions;

export default registerReducer.reducer;