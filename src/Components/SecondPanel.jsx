import React, { useState } from 'react';

const SecondPanel = () => {
  const [activeStep, setActiveStep] = useState(2); // Personal Information step is active by default.

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
          <h2 className='text-4xl font-[500] ' >   <i class="ri-id-card-line"></i></h2>       
            <h1 className="text-3xl font-bold text-gray-800">Personal information</h1>
            <p className="text-gray-500">Please provide your gender and Date of birth</p>
          </div>

          {/* Form Fields */}
          <form>
            <div className="mb-6">
              <label htmlFor="gender" className="block text-gray-700 font-medium">
                Gender*
              </label>
              <select
                id="gender"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="dob" className="block text-gray-700 font-medium">
                Date of birth*
              </label>
              <input
                id="dob"
                type="date"
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

export default SecondPanel;
