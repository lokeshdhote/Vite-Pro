import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/UserReducer.jsx"; // Import the reducer, not the slice

export const Store = configureStore({
    reducer: {
        user: userReducer,  // Use the reducer exported from userSlice
    }
});
