import {createSlice} from "@reduxjs/toolkit";
import {listEvent} from "../actions/event";

const eventReducer = createSlice({
    name: 'event/list',
    initialState: {events: [], loading: false},
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(listEvent.fulfilled, (state, {payload}) => {
            state.events = payload;
        })
    }
});

export default eventReducer.reducer;