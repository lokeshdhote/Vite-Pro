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
            state.isAuth = state?.user ? true : false;  // Update authentication status
            state.error = null;
        
        },
       signIn:(state, action) => {
        state.user = action.payload;  // Set user data
        state.isAuth = state?.user ? true : false;  // Update authentication status
        state.error = null;
       },

        setError: (state, action) => {
            state.error = action.payload;  // Store any errors
        }
    }
});

export default userSlice.reducer;  // Export the reducer function

export const { signUp, signOut, setError,signIn } = userSlice.actions;  // Export actions
