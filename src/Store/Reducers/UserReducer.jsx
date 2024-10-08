import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,  // Use camelCase for consistency
    isAuth: false,  // Track authentication status
    error: null, 
    sucess:false, // Track any errors
};

export const userSlice = createSlice({
    name: "user",  // Name of the slice
    initialState,
    reducers: {
        signUp: (state, action) => {

       
          
            state.user = action.payload;  // Set user data
            state.isAuth = true;  // Update authentication status
            state.error = null;
            state.sucess= true  // Reset error if there is one
        },
       
        setError: (state, action) => {
            state.error = action.payload;  // Store any errors
        }
    }
});

export default userSlice.reducer;  // Export the reducer function

export const { signUp, signOut, setError } = userSlice.actions;  // Export actions
