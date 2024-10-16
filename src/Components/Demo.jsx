import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AsynSignUp } from '../Store/Actions/UserAction';
import { Country, State, City } from "country-state-city";

const Demo = () => {
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = useState(1); 

  const [name , setName] = useState("")
  const [email, setEmail] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [languages_spoken, setLanguage] = useState('');
  const [gender, setGender] = useState('');
  const [travel_preferences, setTravelPreference] = useState('');
  const [bio, setBio] = useState('');
  const [date_of_birth, setdate_of_birth] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(country);
  const cities = City.getCitiesOfState(country, state);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };
  const validate = () => {
    const validationErrors = {};


   // Name validation
    if (!name.trim()) {
      validationErrors.name = "Name is required";
    } else if (name.length < 3) {
      validationErrors.name = "Name must be at least 3 characters";
    } else if (!/^[A-Za-z]+(?: [A-Za-z]+)?$/.test(name)) {
      validationErrors.name = "Name can only contain letters and one space between words";
    }
    
   

    // Email validation
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid";
    }

    // phone_number number validation

    if (!phone_number.trim()) {
        validationErrors.phone_number = "phone_number number is required";
      } else if (!/^\+?1?\d{9,15}$/.test(phone_number)) {
        validationErrors.phone_number = "phone_number number should be 10 digits";
      }

   

    // Step-specific validations
    if (activeStep === 2) {
      if (!gender) {
        validationErrors.gender = "Gender is required";
      }
      if (!date_of_birth) {
        validationErrors.date_of_birth = "Date of birth is required";
      }
    
    } else if (activeStep === 3) {
      if (!country.trim()) {
        validationErrors.country = "Country is required";
      }
      if (!state.trim()) {
        validationErrors.state = "State is required";
      }
      if (!city.trim()) {
        validationErrors.city = "City is required";
      }
    } else if (activeStep === 4) {

        // Username validation
    if (!username.trim()) {
      validationErrors.username = "Username is required";
    }else if (/\s/.test(username)) {
      validationErrors.username = "Don't use spaces. Use @ and _ instead.";
    }  else if (!/^[\w@._]+$/.test(username)) {
      
      validationErrors.username = "Username can only contain letters, numbers, @, and _";
    } else if (username.length < 3) {
      validationErrors.username = "Username must be at least 8 characters long.";
    }   
    //   Password validation

     if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    } else if (!/[0-9]/.test(password)) {
      validationErrors.password = "Password must contain at least one number";
    } else if (!/[A-Z]/.test(password)) {
      validationErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      validationErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      validationErrors.password = "Password must contain at least one special character";
    }

    }

    return validationErrors;
  };

  const handleNextStep = () => {
  
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setActiveStep(activeStep + 1);
      setErrors({});
    } else {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields."); // Display toast notification
    }
    
  };
  const today = new Date().toISOString().split("T")[0];

  const OnFinish = (e)=>{
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("Please fill in all required fields.");
     } 
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }
  // Display toast notification;
    dispatch( AsynSignUp({
      username,
      name,
      email,
      gender,
      date_of_birth,
      phone_number,
      city,
      state,
      country,
      password,
      languages_spoken,
      travel_preferences,
      bio,
    }));
    
    setUsername("");
    setName("");
    setEmail("");
    setGender("");
    setdate_of_birth("");
    setphone_number("");
    setCity("");
    setState("");
    setCountry("");
    setPassword("");
    setTravelPreference("");
    setLanguage("");
    setBio("");
    setErrors({});
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
        lg:pt-[4vw]            /* Larger padding top on desktop */
      ">
        <div className="mb-8">
          {/* Logo */}
          <img src='/logo.png' alt="CoTravels Logo" className="w-32 lg:w-[13vw] h-auto mx-auto lg:mx-0" />
        </div>

        <div className="py-2 flex lg:flex-col lg:space-y-6 lg:pt-5 bg-[#ccecf4] w-full lg:bg-blue-50">
  {/* Steps */}
  {[1, 2, 3, 4].map((step) => (
    <div
      key={step}
      onClick={() => handleStepClick(step)}
      className={`flex items-center cursor-pointer  p-4 rounded-md `}
    >
      <div className="flex items-center space-x-3">
        <span className={`text-2xl font-[500] ${activeStep === step ? 'text-blue-600' : 'text-gray-400'}`}>
          <i className="ri-checkbox-circle-line"></i>
        </span>
        <h2 className={`w-full text-[2.7vw] font-[700] lg:bg-blue-50  lg:font-[600] lg:inline lg:text-[1.1vw] ${activeStep === step ? 'inline' : 'hidden'} `}>
          {step === 1 ? "Your details" :
          step === 2 ? "Personal Information" :
          step === 3 ? "Location" : "Account Security"}
        </h2>
      </div>
      {/* Show description only for the active step */}
      {activeStep === step && (
        <p className="lg:inline text-gray-400 mt-1 text-sm lg:text-base hidden ">
          {step === 1 ? "Please provide your name and contact" :
          step === 2 ? "Tell us more about yourself" :
          step === 3 ? "Share your location details" :
          "Set up your username and password"}
        </p>
      )}
    </div>
  ))}
</div>

      </div>

      {/* Form Content */}
      <div className="w-full lg:w-3/4 flex flex-col items-center justify-center p-4 lg:p-10">
        <div className="w-full max-w-md">
          {/* Form Title and Content based on active step */}
          {activeStep === 1 && (
            <div>
              <div className="mb-5 flex flex-col items-center justify-center">
                <h2 className='text-3xl font-[500]'><i className="ri-file-list-2-line"></i></h2>
                <h1 className="text-xl font-bold text-gray-800">Your details</h1>
                <p className="text-gray-500">Please provide your name and contact</p>
              </div>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium">Name*</label>
                  <input id="name" type="text" placeholder="Enter your first name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                </div>
             
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium">Email*</label>
                  <input id="email" type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="phone_number" className="block text-gray-700 font-medium">Phone Number*</label>
                  <input id="phone_number" type="text" placeholder="Enter your Phone Number" value={phone_number} onChange={(e) => setphone_number(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  {errors.phone_number && <p className="text-red-600 text-sm">{errors.phone_number}</p>}
                </div>
                <div className="mb-6">
  <label htmlFor="language" className="block text-gray-700 font-medium">Language spoken*</label>
  <select
    id="language"
    value={languages_spoken}
    onChange={(e) => setLanguage(e.target.value)}
    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  >
    <option value="">Select your preferred language</option>
    <option value="English">English</option>
    <option value="Spanish">Spanish</option>
    <option value="French">French</option>
    <option value="German">German</option>
    <option value="Hindi">Hindi</option>
    <option value="Mandarin">Mandarin</option>
    <option value="Arabic">Arabic</option>
    <option value="Russian">Russian</option>
    <option value="Portuguese">Portuguese</option>
    <option value="Japanese">Japanese</option>
    {/* Add more language options as needed */}
  </select>
  {errors.language && <p className="text-red-600 text-sm">{errors.language}</p>}
</div>

                <button type="button" onClick={handleNextStep} className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Next</button>
              </form>
            </div>
          )}

          {/* Step 2 - Personal Information */}
          {activeStep === 2 && (
            <div>
              <div className="mb-5 flex flex-col items-center justify-center">
                <h2 className='text-3xl font-[500]'><i className="ri-user-line"></i></h2>
                <h1 className="text-xl font-bold text-gray-800">Personal Information</h1>
                <p className="text-gray-500">Tell us more about yourself</p>
              </div>
              <form>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 font-medium">Gender*</label>
                  <select id="gender" value={gender}  onChange={(e) => setGender(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                     <option value="">Select Gender</option>
                     <option value="male">Male</option>
                     <option value="female">Female</option>                     <option value="other">other</option>
                   </select>
                   {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
                 </div>

                <div className="mb-4">
                  <label htmlFor="date_of_birth" className="block text-gray-700 font-medium">Date of Birth*</label>
                  <input id="date_of_birth" type="date" value={date_of_birth} onChange={(e) => setdate_of_birth(e.target.value)} max={today} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  {errors.date_of_birth && <p className="text-red-600 text-sm">{errors.date_of_birth}</p>}
                </div>

                <div className="mb-4">
  <label htmlFor="travelPreference" className="block text-gray-700 font-medium">Travel Preference*</label>
  <select
    id="travelPreference"
    value={travel_preferences}
    onChange={(e) => setTravelPreference(e.target.value)}
    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  >
    <option value="">Select your travel preference</option>
    <option value="Business Travel">Business Travel</option>
    <option value="Leisure Travel">Leisure Travel</option>
    <option value="Adventure Travel">Adventure Travel</option>
    <option value="Solo Travel">Solo Travel</option>
    <option value="Family Vacation">Family Vacation</option>
    <option value="Group Travel">Group Travel</option>
    <option value="Luxury Travel">Luxury Travel</option>
    <option value="Budget Travel">Budget Travel</option>
    <option value="Cruise">Cruise</option>
    {/* Add more travel preferences if needed */}
  </select>
</div>

                <div className="mb-4">
                  <label htmlFor="bio" className="block text-gray-700 font-medium">Bio*</label>
                   <textarea id="bio" placeholder="Tell us about yourself" value={bio}  onChange={(e) => setBio(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                   {errors.bio && <p className="text-red-600 text-sm">{errors.bio}</p>}
                 </div>
                <button type="button" onClick={handleNextStep} className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Next</button>
              </form>
            </div>
          )}

          {/* Step 3 - Location */}
          {activeStep === 3 && (
            <div>
              <div className="mb-5 flex flex-col items-center justify-center">
                <h2 className='text-3xl font-[500]'><i className="ri-map-pin-line"></i></h2>
                <h1 className="text-xl font-bold text-gray-800">Location</h1>
                <p className="text-gray-500">Share your location details</p>
              </div>
              <form>
                <div className="mb-4">
                  <label htmlFor="country" className="block text-gray-700 font-medium">Country*</label>
                  <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && <p className="text-red-600 text-sm">{errors.country}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="state" className="block text-gray-700 font-medium">State*</label>
                  <select id="state" value={state} onChange={(e) => setState(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-700 font-medium">City*</label>
                  <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
                </div>

                <button type="button" onClick={handleNextStep} className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Next</button>
              </form>
            </div>
          )}

          {/* Step 4 - Account Security */}
          {activeStep === 4 && (
            <div>
              <div className="mb-5 flex flex-col items-center justify-center">
                <h2 className='text-3xl font-[500]'><i className="ri-shield-user-line"></i></h2>
                <h1 className="text-xl font-bold text-gray-800">Account Security</h1>
                <p className="text-gray-500">Set up your username and password</p>
              </div>
              <form onSubmit={OnFinish}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 font-medium">Username*</label>
                  <input id="username" type="text" placeholder="Choose your username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-medium">Password*</label>
                  <input id="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                </div>

                

                <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Sign Up</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
