import axios from "../../Utils/axios.jsx";
import {signUp} from "../Reducers/UserReducer.jsx"

export const AsynSignUp = (user) => async (dispatch, getState) => {
try {
console.log(user);

    const {data} = await axios.post("/signup", user);
    console.log(data);
    
 dispatch(signUp(data))   
} catch (error) {
    console.log(error)
}
}