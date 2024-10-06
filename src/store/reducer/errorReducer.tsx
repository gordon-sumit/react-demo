import {createSlice} from "@reduxjs/toolkit";

const errorReducer = createSlice(
    {
        name: 'error',
        initialState: {error: ''},
        reducers: {
            isError(state,action) {
                state.error = action.payload;
                return state;
            }
        },
    }
);

export const {isError} = errorReducer.actions
export default errorReducer.reducer;