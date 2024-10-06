import {createSlice} from "@reduxjs/toolkit";
import {fetchUserProfiles} from "../actions/profile";
import {useDispatch} from "react-redux";

const profileReducers = createSlice({
    name: 'profiles',
    initialState: {profiles: [],loading:false},
    reducers: {
        profileData: (state) => {
            return state;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchUserProfiles.pending,(state,action)=>{
                state.loading = true;
        })
        builder.addCase(fetchUserProfiles.fulfilled,(state,action)=>{
            state.loading = false;
            state.profiles= action.payload;
        })
    }
});

export const {profileData} = profileReducers.actions;
export default profileReducers.reducer;