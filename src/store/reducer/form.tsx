import {createSlice} from "@reduxjs/toolkit";
import {createEvent} from "../actions/event";
import {addVegetableAction} from "../actions/myVegetable.actions";

const initialState = {
    success: false,
    message: '',
    loading: false
}
const form = createSlice({
    name: 'success',
    initialState,
    reducers: {
        isSuccess: (state, action) => {
            return {success: true, message: action.payload, loading: false}
        },
        isError: (state, action) => {
            return {success: false, message: action.payload, loading: false}
        },
        resetFormResponse: () => {
            return {success: false, message: '', loading: false};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createEvent.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(addVegetableAction.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(addVegetableAction.fulfilled,(state,action)=>{
            state.loading = false;
        });
    }
});

export const {isSuccess, isError, resetFormResponse} = form.actions;
export default form.reducer;