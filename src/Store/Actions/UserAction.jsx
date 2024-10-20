import axios from "../../Utils/axios.jsx";
import { signUp, signIn, setError ,UserLoginRequest,clearUserState } from "../Reducers/UserReducer.jsx";

export const AsynSignUp = (user) => async (dispatch, getState) => {
  dispatch(UserLoginRequest())
  try {

    const { data } = await axios.post("/user/signup", user);
    dispatch(signUp(data));
  } catch (error) {
    const {errors} = error?.response?.data ; // Get the error message
    dispatch(setError(errors.message )); // Dispatch the error message
    console.log(errors?.message); // Log the error message for debugging
  }
}

export const AsynSignIn = (user) => async (dispatch, getState) => {
dispatch(UserLoginRequest())
  try {
   
    const { data } = await axios.post("/user/signin", user);

    dispatch(signIn(data));
  } catch (error) {
    const {errors} = error?.response?.data ; // Get the error message
    dispatch(setError(errors.message )); // Dispatch the error message
    // console.log(errors?.message); // Log the error message for debugging
  }
}
export const AsynclearUserState = () => (dispatch) => {
  dispatch(clearUserState());
};