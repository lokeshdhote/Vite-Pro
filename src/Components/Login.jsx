import { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState(""); // Combine username and email into one field
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Email validation function
  const validateEmail = (input) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  };

  // Username validation function
  const validateUsername = (input) => {
    const usernamePattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*_)[A-Za-z\d_]{8,}$/;
    return usernamePattern.test(input);
  };

  // Basic validation function
  const validate = () => {
    let validationErrors = {};

    // Input validation (username or email)
    if (!input.trim()) {
      validationErrors.input = "Username or Email is required";
    } else if (!validateEmail(input) && !validateUsername(input)) {
      validationErrors.input = "Enter a valid username or email address.";
    }

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

    // Handle successful login logic here (e.g., API call)
    console.log("Login successful:", { input, password });

    // Clear form after submission
    setInput("");
    setPassword("");
    setErrors({});
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-cover">
      <img className="absolute z-0 w-screen h-screen" src='./public/one.webp' alt="" />
      <div className="relative z-1 w-full  md:w-2/3 lg:w-2/6 bg-stone-300 bg-opacity-80 p-6 rounded ">
        <div className="py-[1vw]">
          <h1 className="text-center text-2xl font-bold">Login</h1>
        </div>
        <form onSubmit={FormHandle} className=" gap-5 py-[2vw] flex flex-col items-center">
          {/* Username or Email */}
          <div className="flex flex-col">
            <label className="mb-1">Username or Email</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-[20vw] h-10 pl-2 text-black outline-none rounded"
            />
            {errors.input && <span className="text-red-500">{errors.input}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[20vw] h-10 pl-2 text-black outline-none rounded"
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>

          <div className="flex items-center justify-center pt-5">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:scale-[0.97]"
            >
              Submit
            </button>
          </div>
        </form>
        <div>
          <h5 className="text-center text-stone-800 mt-4 cursor-pointer">
            Don't have an account? <NavLink to={"/SignUp"}>SignUp</NavLink>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Login;
