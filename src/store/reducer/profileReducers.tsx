import {createSlice} from "@reduxjs/toolkit";
import {fetchAllMedia, fetchUserProfiles, uploadMedia} from "../actions/profile";
import {useDispatch} from "react-redux";

const profileReducers = createSlice({
    name: 'profiles',
    initialState: {profiles: [], loading: false, mediaList: [], error: ''},
    reducers: {
        profileData: (state) => {
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfiles.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchUserProfiles.fulfilled, (state, action) => {
            state.loading = false;
            state.profiles = action.payload;
        })
        builder.addCase(fetchAllMedia.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchAllMedia.fulfilled, (state, action) => {
            state.loading = false;
            state.mediaList = action.payload.Contents;
        })
        builder.addCase(fetchAllMedia.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(uploadMedia.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(uploadMedia.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(uploadMedia.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error && action.error.message;
        })
    }
});

export const {profileData} = profileReducers.actions;
export default profileReducers.reducer;