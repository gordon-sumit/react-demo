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
            console.log(payload, 'ppp')
            let newBucket = [];
            const payloadItem = payload.item
            const itemExists = state.myBucket.find(bucketItem => bucketItem.id === payloadItem.id);
            if (itemExists) {
                newBucket = state.myBucket.map(bucketItem =>
                    bucketItem.id === payloadItem.id
                        ? {
                            ...bucketItem,
                            qty: payload.direct ? payloadItem.qty : bucketItem.qty + 50,
                            qtyType: (payload.direct ? payloadItem.qty : bucketItem.qty + 50) / 1000 > 0.95 ? 'kg' : 'gm',
                        }
                        : bucketItem
                );
            } else {
                newBucket = [...state.myBucket, {
                    id: payloadItem.id,
                    name: payloadItem.name,
                    qty: payloadItem.qty,
                    qtyType: 'gm',
                    thumbnail: payloadItem.thumbnail
                }];
            }
            state.myBucket = newBucket;
            return state;
        },
        reduceBucketItemQty(state, {payload}) {
            let newBucket = [];
            const itemExists = state.myBucket.find(bucketItem => bucketItem.id === payload.id);
            if (itemExists && itemExists.qty > 0) {
                newBucket = state.myBucket.map(bucketItem =>
                    bucketItem.id === payload.id
                        ? {
                            ...bucketItem, qty: bucketItem.qty - 50,
                            qtyType: (bucketItem.qty - 50) / 1000 > 0.95 ? 'kg' : 'gm'
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
        },
        removeItemFromBucket(state, {payload}) {
            state.myBucket = state.myBucket.filter(bucketItem => bucketItem.id !== payload.id);
            return state;
        },
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
            state.totalPages = Math.ceil(action.payload.count / 10);
            state.loading = false;
        })
    }
});

export const {
    emptyBucket,
    setCurrentPage,
    addItemToBucket,
    removeItemFromBucket,
    reduceBucketItemQty,
} = Vegetable.actions;
export default Vegetable.reducer;