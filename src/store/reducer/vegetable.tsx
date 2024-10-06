import {createSlice} from "@reduxjs/toolkit";
import {myVegetableActions, myVegetables} from "../actions/myVegetable.actions";

const Vegetable = createSlice({
    name: 'vegetable',
    initialState: {allVegetables: [], currentPage: 1, totalPages: null, myBucket: [], loading: false, message: null},
    reducers: {
        emptyBucket(state) {
            state.myBucket = [];
            return state;
        },
        addItemToBucket(state, {payload}) {
            let newBucket = [];
            const itemExists = state.myBucket.find(bucketItem => bucketItem.id === payload.id);
            if (itemExists) {
                newBucket = state.myBucket.map(bucketItem =>
                    bucketItem.id === payload.id
                        ? {
                            ...bucketItem,
                            qty: bucketItem.qty + 250,
                            qtyType: (bucketItem.qty + 250) / 1000 > 0.75 ? 'kg' : 'gm',
                        }
                        : bucketItem
                );
            } else {
                newBucket = [...state.myBucket, {id: payload.id, name: payload.name, qty: payload.qty, qtyType: 'gm'}];
            }
            state.myBucket = newBucket;
            return state;
        },
        removeItemFromBucket(state, {payload}) {
            let newBucket = [];
            const itemExists = state.myBucket.find(bucketItem => bucketItem.id === payload.id);
            if (itemExists && itemExists.qty > 0) {
                newBucket = state.myBucket.map(bucketItem =>
                    bucketItem.id === payload.id
                        ? {
                            ...bucketItem, qty: bucketItem.qty - 250,
                            qtyType: (bucketItem.qty - 250) / 1000 > 0.75 ? 'kg' : 'gm'
                        }
                        : bucketItem
                );

            } else {
                newBucket = state.myBucket.filter(bucketItem => bucketItem.id !== payload.id)
            }
            state.myBucket = newBucket;
            return state;
        },
        setCurrentPage(state, {payload}) {
            state.currentPage = payload;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(myVegetableActions.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(myVegetableActions.fulfilled, (state) => {
            state.loading = false;
            state.message = 'Bucket Items Sent Successfully!'
        })
        builder.addCase(myVegetables.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(myVegetables.fulfilled, (state, action) => {
            state.allVegetables = action.payload.rows.filter(item => item.qty = item.initial_qty);
            state.totalPages = Math.ceil(action.payload.count / 3);
            state.loading = false;
        })
    }
});

export const {
    emptyBucket,
    setCurrentPage,
    addItemToBucket,
    removeItemFromBucket
} = Vegetable.actions;
export default Vegetable.reducer;