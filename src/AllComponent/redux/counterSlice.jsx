import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
    count: 0,
};

// Create Redux Slice
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0;
        },
    },
});

// Export Actions & Reducer
export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
