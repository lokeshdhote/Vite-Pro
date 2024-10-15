import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AsynSignUp } from "../Store/Actions/UserAction";
import { NavLink } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import FirstPanel from "./FirstPanel";
import SecondPanel from "./SecondPanel";
import ThirdPanel from "./ThirdPanel";
import FourthPanel from "./FourthPanel";

const SignUp = () => {
  const dispatch = useDispatch();

  // State for each input field
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setdate_of_birth] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  // const [travelPreference, setTravelPreference] = useState("");
  // const [language, setLanguage] = useState("");
  // const [bio, setBio] = useState("");
  // Error state for validation
  const [errors, setErrors] = useState({});

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(country);
  const cities = City.getCitiesOfState(country, state);

  // Basic validation function
  const validate = () => {
    let validationErrors = {};

    if (!username.trim()) {
      validationErrors.username = "Username is required";
    } else if (username.length < 8) {
      validationErrors.username = "Username must be at least 8 characters long.";
    } else if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
      validationErrors.username = "Username must contain only letters, numbers, underscores, dots, or dashes.";
    } else if (/\s/.test(username)) {
      validationErrors.username = "Don't use spaces. Use @ and _ instead.";
    } 

    // Name validation
    if (!name.trim()) {
      validationErrors.name = "Name is required";
    } else if (name.length < 8) {
      validationErrors.name = "Name must be at least 8 characters";
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
    if (!date_of_birth) validationErrors.date_of_birth = "Date of birth is required";

    // Phone_number validation
    if (!phone_number.trim()) {
      validationErrors.phone_number = "Phone_number number is required";
    } else if (!/^\+?1?\d{9,15}$/.test(phone_number)) {
      validationErrors.phone_number = "Phone_number number should be 10 digits";
    }

    // Country validation
    if (!country.trim()) validationErrors.country = "Country is required";

    // City validation
    if (!city.trim()) validationErrors.city = "City is required";

    // State validation
    if (!state.trim()) validationErrors.state = "State is required";

    // Password validation
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 8) {
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

  const today = new Date().toISOString().split("T")[0];

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
        date_of_birth,
        phone_number,
        city,
        state,
        country,
        password,
        
      })
    );

    // Clear form after submission
    setUsername("");
    setName("");
    setEmail("");
    setGender("");
    setdate_of_birth("");
    setPhone_number("");
    setCity("");
    setState("");
    setCountry("");
    setPassword("");
   
    setErrors({});
  };
  useEffect(()=>{
    // message ? toast.success(message) :toast.error(error)

  },[dispatch])

  return (
  <div>
    <FirstPanel/>
    <SecondPanel/>
    <ThirdPanel/>
    <FourthPanel/>
  </div>
  );
};

export default SignUp;
