import { useState } from "react";
import { useDispatch } from "react-redux";
import { AsynSignUp } from "../Store/Actions/UserAction";
import { NavLink } from "react-router-dom";
import { Country, State, City } from "country-state-city";

const SignUp = () => {
  const dispatch = useDispatch();
  

  // State for each input field
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [travelPreference, setTravelPreference] = useState("" );
  const [language, setLanguage] = useState("");
  const [bio, setBio] = useState("");
  // Error state for validation
  const [errors, setErrors] = useState({});

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(country);
  const cities = City.getCitiesOfState(country,state);


console.log(  country,states);
  // Basic validation function
  const validate = () => {
    let validationErrors = {};

    if (!username.trim()) {
      validationErrors.username = "Username is required";
    } else if (username.length < 8) {
      validationErrors.username = "Username must be at least 8 characters long.";
    } else if (!/^[a-zA-Z@_]+$/.test(username)) {
      validationErrors.username = "Username can only contain letters, @, and _ (no numbers allowed).";
    } else if (/\s/.test(username)) {
      validationErrors.username = "Don't use spaces. Use @ and _ instead.";
    } else if (!username.includes('@') && !username.includes('_')) {
      validationErrors.username = "Username must contain at least one @ or _ character.";
    }
    
    

    // Name validation
    if (!name.trim()) {
      validationErrors.name = "Name is required";
    } else if (name.length < 6) {
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

    // Gender validation
    if (!gender) validationErrors.gender = "Gender is required";

    // Date of Birth validation
    if (!dob) validationErrors.dob = "Date of birth is required";

    // Phone validation
    if (!phone.trim()) {
      validationErrors.phone = "Phone number is required";
    } else if (!/^\+?1?\d{9,15}$/.test(phone)) {
      validationErrors.phone = "Phone number should be 10 digits";
    }

    // Country validation
    if (!country.trim()) validationErrors.country = "Country is required";

    // City validation
    if (!city.trim()) validationErrors.city = "City is required";

    // State validation
    if (!state.trim()) validationErrors.state = "State is required";

    // Password validation
   // Password validation
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

    return validationErrors;
  };

  // Handle form submission
  const FormHandle = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(
      AsynSignUp({
        username,
        name,
        email,
        gender,
        dob,
        phone,
        city,
        state,
        country,
        password,
        travelPreference,
        language,
        bio,
      })
    );

    // Clear form after submission
    setUsername("");
    setName("");
    setEmail("");
    setGender("");
    setDob("");
    setPhone("");
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
    <div className="flex items-center justify-center w-screen h-screen bg-cover">
    <img className="absolute z-0 w-screen h-screen " src='./public/one.webp' alt="" />
    
    {/* Reduced the height of this div */}
    <div className="relative z-1 w-full md:w-3/4 lg:w-2/3 bg-stone-300 bg-opacity-80 px-14 py-2 rounded">
      <div className="py-1">
        <h1 className="text-center text-2xl font-bold">Sign-Up</h1>
      </div>
      
      <form onSubmit={FormHandle} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Username */}
          <div className="flex flex-col">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
            />
            {errors.username && <span className="text-red-500">{errors.username}</span>}
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            {errors.gender && <span className="text-red-500">{errors.gender}</span>}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label>Date Of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
            />
            {errors.dob && <span className="text-red-500">{errors.dob}</span>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
            />
            {errors.phone && <span className="text-red-500">{errors.phone}</span>}
          </div>

         {/* Country */}
         <div className="flex flex-col">
            <label>Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && <span className="text-red-500">{errors.country}</span>}
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label>State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
              disabled={!country}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && <span className="text-red-500">{errors.state}</span>}
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label>City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
              disabled={!state}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && <span className="text-red-500">{errors.city}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>

          {/* Travel Preference */}
          <div className="flex flex-col">
            <label>Travel Preference</label>
            <select
              value={travelPreference}
              onChange={(e) => setTravelPreference(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
            >
              <option value="">Select Travel Preference</option>
              <option value="Domestic">Domestic</option>
              <option value="International">International</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {/* Language */}
          <div className="flex flex-col">
            <label>Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-9 pl-2 text-black outline-none rounded"
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>

          {/* Bio (Covering all areas) */}
          <div className="flex flex-col col-span-3">
            <label>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full h-24 pl-2 py-1 text-black outline-none rounded"
            />
          </div>
          <div className="flex items-center justify-center col-span-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:scale-[0.97]"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div>
<h5 className="text-center text-stone-800 mt-4 cursor-pointer">

Already have an account ? <NavLink to={"/"} > Login</NavLink> 
</h5>
</div>
      </div>
    </div>
  );
};

export default SignUp;
