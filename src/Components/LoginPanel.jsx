import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AsynSignIn } from '../Store/Actions/UserAction';

const LoginPanel = () => {
  const dispatch = useDispatch();
  const {user,isAuth,error}= useSelector(state=>(state.user))
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [inputType, setInputType] = useState('text'); // State for input type

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = 'Username or email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
  
      // Show alert if both fields are empty
      if (!username && !password) {
        toast.error("Please fill in all required fields."); // Display toast notification;
      }
    } else {

      dispatch(AsynSignIn({ username, password }));
 
      setUsername("");  
  setPassword("");
  setErrors({})
      
  };
 
 
}

useEffect(()=>{
  if(user){
    toast.success("Login Successfully !")
  }
  if(error){
  toast.error(error )
  }
  },[dispatch,user,error])
  


  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full gap-4 flex-col-reverse lg:w-1/4 lg:bg-blue-50 flex justify-start items-center lg:flex-col lg:pt-20">
        {/* Logo */}
        <img 
          src='/logo.png' 
          alt="CoTravels Logo" 
          className="w-[36vw] h-auto lg:w-[13vw] mb-6 lg:mb-10" 
        />
        {/* Login Text */}
        <div className="text-center w-full bg-[#ccecf4] lg:bg-blue-50 lg:flex items-start flex-col px-[5vw]">
          <div className="flex gap-2 justify-center py-2">
            <i className="text-[#3689a3] ri-checkbox-circle-line text-2xl font-[500] lg:text-[#3689a3]"></i>
            <h2 className="font-[600] text-lg lg:text-[1.1vw]">Login</h2>
          </div>
          <p className="text-gray-400 mt-1 hidden text-sm lg:text-base lg:inline">
            Enter your credentials to login
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full lg:w-3/4 flex flex-col items-center justify-center p-4 lg:p-10">
        <div className="w-full max-w-md">
          {/* Form Title */}
          <div className="mb-6 lg:mb-8 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-[500]">
              <i className="ri-login-box-line"></i>
            </h2>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Login</h1>
            <p className="text-gray-500 text-sm lg:text-base">
              Enter your username or email and password
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 lg:mb-6">
              <label htmlFor="username" className="block text-gray-700 font-medium">
                Username or Email*
              </label>
              <input
                id="username"
                type={inputType} // Dynamically set input type
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username or email"
                className="mt-2 block w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            <div className="mb-4 lg:mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Password*
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-2 block w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-left mb-4 lg:mb-6">
              <NavLink className="text-[#3689a3] no-underline font-[500] hover:underline text-sm">
                Forgot Password?
              </NavLink>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3689a3] text-white font-medium py-2 rounded-md transition duration-300"
            >
              Log In
            </button>

            {/* Sign Up Link */}
            <div className="mt-4 text-center">
              <p className="text-black">
                Don't have an account?{' '}
                <NavLink to={"/SignUp"} className="text-[#3689a3] font-[600] hover:underline">
                  Sign up
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
