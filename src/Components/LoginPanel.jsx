import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const LoginPanel = () => {
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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
      // Proceed with form submission
      console.log('Form submitted', { usernameEmail, password });
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-50 flex flex-col justify-start items-center pt-20">
        {/* Logo */}
        <img src='./public/logo.png' alt="CoTravels Logo" className="w-[13vw] h-auto mb-10" />

        {/* Login Text */}
        <div className="">
          <div className='flex gap-2'>
            <i className="ri-checkbox-circle-line text-2xl font-[500] text-blue-600"></i>
            <h2 className="font-[600] text-[1.1vw]">Login</h2>
          </div>
          <p className="text-gray-400 mt-1">Enter your credentials to login</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-3/4 flex flex-col items-center justify-center p-10">
        <div className="w-full max-w-md">
          {/* Form Title */}
          <div className="mb-8 flex flex-col items-center justify-center">
            <h2 className='text-4xl font-[500]'><i className="ri-login-box-line"></i></h2>
            <h1 className="text-3xl font-bold text-gray-800">Login</h1>
            <p className="text-gray-500">Enter your username or email and password</p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="usernameEmail" className="block text-gray-700 font-medium">
                Username or Email*
              </label>
              <input
                id="usernameEmail"
                type="text"
                value={usernameEmail}
                onChange={(e) => setUsernameEmail(e.target.value)}
                placeholder="Enter your username or email"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.usernameEmail && (
                <p className="text-red-500 text-sm">{errors.usernameEmail}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Password*
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-6">
              <NavLink href="#" className="text-blue-500 hover:underline text-sm">
                Forgot Password?
              </NavLink>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>

            {/* Sign Up Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-500">
                Don't have an account?{' '}
                <NavLink to={"/SignUp"} className="text-blue-500 hover:underline">
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
