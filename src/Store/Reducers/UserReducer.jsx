import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,  // Use camelCase for consistency
    isAuth: false,  // Track authentication status
    error: null, 
    msg :null, // Track any errors
};

export const userSlice = createSlice({
    name: "user",  // Name of the slice
    initialState,
    reducers: {
        UserLoginRequest :(state, action) => {
            state.isAuth = false;
            state.loading = true;
        },
        signUp: (state, action) => {
            state.user = action.payload;  // Set user data
            state.isAuth = state?.user ? true : false;  // Update authentication status
            state.error = null;
           
        
        },
       signIn:(state, action) => {
        state.LoginUser = action.payload;  // Set user data
        localStorage.setItem("access_token", JSON.stringify(state.LoginUser?.access_token));
        state.isAuth = state?.LoginUser ? true : false;  // Update authentication status
        state.error = null;
        state.loading = false;
        state.msg= 'Login Successfully !';

        
       },

        setError: (state, action) => {
            state.error = action?.payload ;  // Store any errors
            state.loading = false;
            state.isAuth = false;
        }, // Clear user state (can be used when component unmounts)
        clearUserState: (state) => {
           
            state.error = null;
            state.loading = false;
            state.msg = null; 
        },
    }
});

export default userSlice.reducer;  // Export the reducer function

export const { signUp, signOut, setError,signIn, UserLoginRequest ,clearUserState} = userSlice.actions;  // Export actions
