import { Route, Routes } from "react-router";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import FirstPanel from "../Components/FirstPanel";
import SecondPanel from "../Components/SecondPanel";
import ThirdPanel from "../Components/ThirdPanel";
import FourthPanel from "../Components/FourthPanel";
import LoginPanel from "../Components/Loginpanel";
import Demo from "../Components/Demo";



const route = ()=>{
    return(
        <Routes>
             <Route path="/" element={<LoginPanel/>} />
             <Route path="/SignUp" element={<Demo/>} />
             

        </Routes>
    )
}
export default route;