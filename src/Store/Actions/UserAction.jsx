import axios from "../../Utils/axios.jsx";
import {signUp,signIn,setError} from "../Reducers/UserReducer.jsx"

export const AsynSignUp = (user) => async (dispatch, getState) => {
try {
console.log(user);

    const {data} = await axios.post("/user/signup", user);
    console.log(data);
    
 dispatch(signUp(data))   
} catch (error) {
    dispatch(setError(error))
    console.log(error)
}
}

export const AsynSignIn = (user) => async (dispatch, getState) => {
    try {
    console.log(user);
    
        const {data} = await axios.post("/user/signin", user);
        console.log(data);
        
     dispatch(signIn(data))   
    } catch (error) {
        dispatch(setError(error))
        console.log(error)
    }
    }