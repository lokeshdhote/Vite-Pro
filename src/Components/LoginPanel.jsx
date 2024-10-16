import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const LoginPanel = () => {
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!usernameEmail) {
      newErrors.usernameEmail = 'Username or email is required';
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
    } else {
      setErrors({});
      console.log('Form submitted', { usernameEmail, password });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      
      {/* Sidebar */}
      <div className="
        w-full  
        gap-4
        flex-col-reverse            /* Full width on mobile */
        lg:w-1/4            /* 1/4 width on large screens */
       lg:bg-blue-50          /* Light blue background */
        flex 
        justify-start
        items-center
     
        lg:flex-col             /* Padding top on mobile */
        lg:pt-20            /* Larger padding top on desktop */
      ">
        {/* Logo */}
        <img 
          src='/logo.png' 
          alt="CoTravels Logo" 
          className="
            w-[35vw]         /* Logo width on mobile */
            h-auto 
            lg:w-[13vw]      /* Logo width on large screens */
            mb-6             /* Margin bottom on mobile */
            lg:mb-10         /* Larger margin bottom on desktop */
          " 
        />

        {/* Login Text */}
        <div className="text-center w-full bg-[#ccecf4]
        lg:bg-blue-50
        ">
          <div className="flex gap-2 justify-center  py-2 ">
            <i className="
            text-[#3689a3]
              ri-checkbox-circle-line 
              text-2xl 
              font-[500] 
              lg-text-blue-600
            "></i>
            <h2 className="
              font-[600] 
              
              text-lg          /* Font size on mobile */
              lg:text-[1.1vw]  /* Font size on large screens */
            ">
              Login
            </h2>
          </div>
          <p className="
            text-gray-400 
            mt-1 
            hidden
            text-sm            /* Font size on mobile */
            lg:text-base       /* Font size on large screens */
            lg:inline
          ">
            Enter your credentials to login
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="
        w-full              /* Full width on mobile */
        lg:w-3/4            /* 3/4 width on large screens */
        flex flex-col
        items-center
        justify-center
        p-4                 /* Padding on mobile */
        lg:p-10             /* Larger padding on desktop */
      ">
        <div className="w-full max-w-md">
          {/* Form Title */}
          <div className="
            mb-6              /* Margin bottom on mobile */
            lg:mb-8           /* Larger margin bottom on desktop */
            flex flex-col
            items-center
            justify-center
          ">
            <h2 className="text-4xl font-[500]">
              <i className="ri-login-box-line"></i>
            </h2>
            <h1 className="
              text-2xl         /* Font size on mobile */
              lg:text-3xl      /* Font size on large screens */
              font-bold 
              text-gray-800
            ">
              Login
            </h1>
            <p className="
              text-gray-500 
              text-sm           /* Font size on mobile */
              lg:text-base      /* Font size on large screens */
            ">
              Enter your username or email and password
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 lg:mb-6">
              <label htmlFor="usernameEmail" className="
                block 
                text-gray-700 
                font-medium
              ">
                Username or Email*
              </label>
              <input
                id="usernameEmail"
                type="text"
                value={usernameEmail}
                onChange={(e) => setUsernameEmail(e.target.value)}
                placeholder="Enter your username or email"
                className="
                  mt-2
                  block 
                  w-full 
                  px-3               /* Padding on mobile */
                  lg:px-4            /* Larger padding on desktop */
                  py-2 
                  border 
                  border-gray-300 
                  rounded-md 
                  shadow-sm 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  focus:border-blue-500
                "
              />
              {errors.usernameEmail && (
                <p className="text-red-500 text-sm">
                  {errors.usernameEmail}
                </p>
              )}
            </div>

            <div className="mb-4 lg:mb-6">
              <label htmlFor="password" className="
                block 
                text-gray-700 
                font-medium
              ">
                Password*
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="
                  mt-2
                  block 
                  w-full 
                  px-3               /* Padding on mobile */
                  lg:px-4            /* Larger padding on desktop */
                  py-2 
                  border 
                  border-gray-300 
                  rounded-md 
                  shadow-sm 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  focus:border-blue-500
                "
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="
              text-right 
              mb-4              /* Margin bottom on mobile */
              lg:mb-6           /* Larger margin bottom on desktop */
            ">
              <NavLink href="#" className="
                text-blue-500 
                hover:underline 
                text-sm
              ">
                Forgot Password?
              </NavLink>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                w-full 
                bg-blue-600 
                text-white 
                font-medium 
                py-2              /* Padding on mobile */
                rounded-md 
                hover:bg-blue-700 
                transition 
                duration-300
              "
            >
              Log In
            </button>

            {/* Sign Up Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-500">
                Don't have an account?{' '}
                <NavLink to={"/SignUp"} className="
                  text-blue-500 
                  hover:underline
                ">
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
