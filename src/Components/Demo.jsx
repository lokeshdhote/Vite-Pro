import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AsynSignUp } from '../Store/Actions/UserAction';
import { Country, State, City } from "country-state-city";
import { NavLink } from 'react-router-dom';

const Demo = () => {
  const {user,isAuth,error}= useSelector(state=>(state.user))
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = useState(1); 

  const [name , setName] = useState("")
  const [email, setEmail] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [languages_spoken, setLanguage] = useState([]);
  const [gender, setGender] = useState('');
  const [travel_preferences, setTravelPreference] = useState([]);
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 



  const languages = [
    "English", "Spanish", "French", "German", "Hindi", 
    "Mandarin", "Arabic", "Russian", "Portuguese", "Japanese"
  ];

  const preferences = [
    "Business Travel", "Leisure Travel", "Adventure Travel", 
    "Solo Travel", "Family Vacation", "Group Travel", 
    "Luxury Travel", "Budget Travel", "Cruise"
  ];

  const handleCheckboxChange2 = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (travel_preferences.length < 7) { // Maximum of 7 selections
        setTravelPreference([...travel_preferences, value]);
        setErrors({}); // Clear any previous errors
      } else {
        setErrors({ travel: "You can select up to 7 travel preferences only." });
      }
    } else {
      setTravelPreference(travel_preferences.filter(pref => pref !== value));
    }
  };
  const handleCheckboxChange1 = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (languages_spoken.length + 1 === 5) {
        setIsDropdownOpen(false);
      }
      if (languages_spoken.length < 5) {
        setLanguage([...languages_spoken, value]);
        setErrors({}); // Clear any previous errors
      } else {
        setErrors({ language: "You can select up to 5 languages only." });
      }
    } else {
      setLanguage(languages_spoken.filter(lang => lang !== value));
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const handleStepIconClick = (step) => {
    // Check if current step is filled before allowing forward navigation
    const currentStepErrors = validate();
  
    // If navigating backward to a previous step, allow it unconditionally
    if (step < activeStep) {
      setActiveStep(step);
    } else if (step > activeStep) {
      // Allow navigation forward only if current step is filled
      if (Object.keys(currentStepErrors).length === 0) {
        setActiveStep(step); // Navigate to the next step
      } else {
        // If current step is not filled, show an error
        toast.error("Please fill in all required fields in the current step.");
      }
    }
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
        validationErrors.phone_number = "Phone number is required";
      } else if (!/^\+?1?\d{9,15}$/.test(phone_number)) {
        validationErrors.phone_number = "Phone number should be 10 digits";
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
      if(!name && !phone_number && !email) toast.error("Please fill in all required fields.");
       // Display toast notification
    }
    
  };
  const today = new Date().toISOString().split("T")[0];

  const OnFinish = (e)=>{
    e.preventDefault();
    if(!username && !password) toast.error("Please fill in all required fields.");
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
    // console.log(languages_spokenpm run ,travel_preferences);
    setActiveStep(1)
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
  useEffect(()=>{
    if(user){
      toast.success("signIn Successfully !")
    }
    if(error){
    toast.error(error)
    }
    },[dispatch,user,error])
    
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
          <img src='/logo.png' alt="CoTravels Logo" className="w-[35vw] lg:w-[13vw] h-auto mx-auto lg:mx-0" />
        </div>

        <div className="py-2 px-4 flex lg:flex-col lg:space-y-6 lg:pt-5 bg-[#ccecf4] w-full lg:bg-blue-50">
          {/* Steps */}
           {[1, 2, 3, 4].map((step) => (
             <div
               key={step}
               onClick={() => handleStepIconClick(step)}
               className="flex items-center  space-x-4 cursor-pointer lg:px-1 px-2 pt-2 ml-[4vw] "
            >
               <div>
                 <div className='flex gap-3 items-center '>
                   <span className={`text-2xl font-[500] ${activeStep === step ? 'text-[#3689a3]' : 'text-gray-400'}`}>
                     <i className="ri-checkbox-circle-line"></i>
                   </span>
                   <h2 className={`w-full text-[2.8vw] font-[700] lg:bg-blue-50  lg:font-[600] lg:text-[1.5vw]  xl:text-[1.1vw] ${activeStep === step ? 'inline text-black' : 'hidden text-gray-400'}
                   lg:inline `}>
                    {step === 1 ? "Your details" :
                     step === 2 ? "Personal Information" :
                       step === 3 ? "Location" :
                       "Account Security"}
                       </h2>
                 </div>
                 <p className="text-gray-400 mt-1 hidden lg:inline lg:text-[1.4vw]  xl:text-[1vw]">
                  {step === 1 ? "Please provide your name and contact" :
                   step === 2 ? "Tell us more about yourself" :
                     step === 3 ? "Share your location details" :
                     "Set up your username and password"}</p>
               </div>
             </div>
           ))}
         </div>

      </div>

      {/* Form Content */}
      <div className="w-full lg:w-3/4 flex flex-col items-center justify-center p-5 lg:p-6  ">
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
                  <input id="name" type="text" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
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
      <label className="block text-gray-700 font-medium">Languages spoken</label>

      {/* Dropdown */}
      <div className="relative">
        <div
          onClick={handleDropdownToggle} // Toggle dropdown on click
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          {/* Show selected languages */}
          {languages_spoken.length > 0 
            ? languages_spoken.join(', ') 
            : "Select your preferred languages"}
        </div>

        {/* Dropdown content (checkbox list) */}
        {isDropdownOpen && ( // Conditionally render dropdown content
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
            {languages.map((language, index) => (
              <div key={index} className="flex items-center p-2 hover:bg-gray-100">
                <input
                  type="checkbox"
                  id={language}
                  value={language}
                  checked={languages_spoken.includes(language)}
                  onChange={handleCheckboxChange1}
                  className="mr-2"
                />
                <label htmlFor={language} className="text-gray-700">{language}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Show error message if needed */}
      {errors.language && <p className="text-red-600 text-sm mt-2">{errors.language}</p>}
    </div>
                <button type="button" onClick={handleNextStep} className="w-full py-2 text-white bg-[#3689a3] rounded-md ">Next</button>
              </form>
              <div className="mt-4 text-center">
              <p className="text-black">
              Already have an account?{' '}
                <NavLink to={"/"} className="
                 text-[#3689a3] font-[600]
                  hover:underline
                ">
               Login
                </NavLink>
                </p>
                </div>
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
                     <option value="female">Female</option>                     <option value="other">Other</option>
                   </select>
                   {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
                 </div>

                <div className="mb-4">
                  <label htmlFor="date_of_birth" className="block text-gray-700 font-medium">Date of Birth*</label>
                  <input id="date_of_birth" type="date" value={date_of_birth} onChange={(e) => setdate_of_birth(e.target.value)} max={today} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  {errors.date_of_birth && <p className="text-red-600 text-sm">{errors.date_of_birth}</p>}
                </div>
                <div className="mb-6">
      <label className="block text-gray-700 font-medium">Travel Preference</label>

      {/* Dropdown */}
      <div className="relative">
        <div
          onClick={handleDropdownToggle} // Toggle dropdown on click
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          {/* Show selected travel preferences */}
          {travel_preferences.length > 0 
            ? travel_preferences.join(', ') 
            : "Select your travel preferences"}
        </div>

        {/* Dropdown content (checkbox list) */}
        {isDropdownOpen && ( // Conditionally render dropdown content
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
            {preferences.map((preference, index) => (
              <div key={index} className="flex items-center p-2 hover:bg-gray-100">
                <input
                  type="checkbox"
                  id={preference}
                  value={preference}
                  checked={travel_preferences.includes(preference)}
                  onChange={handleCheckboxChange2}
                  className="mr-2"
                />
                <label htmlFor={preference} className="text-gray-700">{preference}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Show error message if needed */}
      {errors.travel && <p className="text-red-600 text-sm mt-2">{errors.travel}</p>}
    </div>

                <div className="mb-4">
                  <label htmlFor="bio" className="block text-gray-700 font-medium">Bio</label>
                   <textarea id="bio" placeholder="Tell us about yourself" value={bio}  onChange={(e) => setBio(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                   {errors.bio && <p className="text-red-600 text-sm">{errors.bio}</p>}
                 </div>
                <button type="button" onClick={handleNextStep} className="w-full py-2 text-white bg-[#3689a3] rounded-md ">Next</button>
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

                <button type="button" onClick={handleNextStep} className="w-full py-2 text-white bg-[#3689a3] rounded-md">Next</button>
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

                

                <button type="submit" className="w-full py-2 text-white bg-[#3689a3] rounded-md ">Sign Up</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
