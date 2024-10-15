import React, { useState } from 'react';

const FirstPanel = () => {
  const [activeStep, setActiveStep] = useState(1); // "Your details" step is active.

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-50 p-6 flex flex-col justify-start">
        <div className="mb-8">
          {/* Logo */}
          <img src="/logo.png" alt="CoTravels Logo" className="w-32 h-auto" />
        </div>

        <div className="space-y-6">
          {/* Steps */}
          <div
            onClick={() => handleStepClick(1)}
            className={`flex items-center space-x-2 cursor-pointer ${
              activeStep === 1 ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <span
              className={`inline-block w-4 h-4 rounded-full ${
                activeStep === 1 ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            />
            <span className="font-medium">Your details</span>
          </div>
          <div
            onClick={() => handleStepClick(2)}
            className={`flex items-center space-x-2 cursor-pointer ${
              activeStep === 2 ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <span
              className={`inline-block w-4 h-4 rounded-full ${
                activeStep === 2 ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            />
            <span className="font-medium">Personal Information</span>
          </div>
          <div
            onClick={() => handleStepClick(3)}
            className={`flex items-center space-x-2 cursor-pointer ${
              activeStep === 3 ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <span
              className={`inline-block w-4 h-4 rounded-full ${
                activeStep === 3 ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            />
            <span className="font-medium">Location</span>
          </div>
          <div
            onClick={() => handleStepClick(4)}
            className={`flex items-center space-x-2 cursor-pointer ${
              activeStep === 4 ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <span
              className={`inline-block w-4 h-4 rounded-full ${
                activeStep === 4 ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            />
            <span className="font-medium">Account Security</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="w-3/4 flex flex-col items-center justify-center p-10">
        <div className="w-full max-w-md">
          {/* Form Title */}
          <div className="mb-8 flex  flex-col items-center justify-center">
            <h2 className='text-4xl font-[500] ' ><i class="ri-file-list-2-line"></i></h2>
            <h1 className="text-3xl font-bold text-gray-800">Your details</h1>
            <p className="text-gray-500">Please provide your name and contact</p>
          </div>

          {/* Form Fields */}
          <form>
            <div className="mb-6">
              <label htmlFor="firstName" className="block text-gray-700 font-medium">
                First name*
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="lastName" className="block text-gray-700 font-medium">
                Last name*
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your Email"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-700 font-medium">
                Phone number*
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone no."
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FirstPanel;
