import { Route, Routes } from "react-router";
import LoginPanel from "../Components/LoginPanel";
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