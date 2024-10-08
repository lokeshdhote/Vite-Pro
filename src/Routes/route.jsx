import { Route, Routes } from "react-router";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";


const route = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/SignUp" element={<SignUp/>} />

        </Routes>
    )
}
export default route;