import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { loginUser, registerUser } from "@/Services/login";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignInSubmit = async (event) => {
    setSignInError("");
    event.preventDefault();
    const { email, password } = event.target.elements;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setSignInError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const data = {
      email: email.value,
      password: password.value,
    };

    try {
      console.log("Login Started in Frontend");
      const user = await loginUser(data);
      console.log("Login Completed");

      if (user?.statusCode === 200) {
        navigate("/");
      }
      console.log(user);
    } catch (error) {
      setSignInError(error.message);
      console.log("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (event) => {
    setSignUpError("");
    event.preventDefault();
    const { fullname, email, password } = event.target.elements;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setSignUpError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    console.log("User Registration Started");
    const data = {
      fullName: fullname.value,
      email: email.value,
      password: password.value,
    };
    try {
      const response = await registerUser(data);
      if (response?.statusCode === 201) {
        console.log("User Registration Started");
        handleSignInSubmit(event);
      }
    } catch (error) {
      console.log("User Registration Failed");
      setSignUpError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-green-400 to-purple-500">
      <motion.div
        className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-around mb-6 border-b border-gray-200">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-t-lg ${
              !isSignUp ? "bg-indigo-600 text-white" : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            <FaSignInAlt className={!isSignUp ? "text-white" : "text-indigo-500"} />
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-t-lg ${
              isSignUp ? "bg-purple-600 text-white" : "text-gray-600 hover:text-purple-600"
            }`}
          >
            <FaUserPlus className={isSignUp ? "text-white" : "text-purple-500"} />
            Sign Up
          </button>
        </div>

        <div className="relative overflow-hidden h-80">
          <motion.div
            className={`absolute inset-0 transition-transform duration-500 ${
              isSignUp ? "translate-x-0" : "translate-x-full"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isSignUp ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">Sign Up</h2>
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div className="flex items-center border rounded-md border-purple-300 p-2 gap-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                <FaUser className="text-purple-500" />
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  required
                  className="outline-none w-full text-gray-800 placeholder-purple-300"
                />
              </div>
              <div className="flex items-center border rounded-md border-purple-300 p-2 gap-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                <FaUser className="text-purple-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="outline-none w-full text-gray-800 placeholder-purple-300"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="flex items-center border rounded-md border-purple-300 p-2 gap-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                <FaLock className="text-purple-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="outline-none w-full text-gray-800 placeholder-purple-300"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-purple-500 hover:text-purple-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-md flex justify-center items-center hover:from-purple-600 hover:to-indigo-700 transition-all font-semibold"
              >
                {loading ? (
                  <Loader2 className="animate-spin text-center" />
                ) : (
                  "Register User"
                )}
              </button>
              {signUpError && (
                <div className="text-red-500 text-center mt-2 font-medium">
                  {signUpError}
                </div>
              )}
            </form>
          </motion.div>
          <motion.div
            className={`absolute inset-0 transition-transform duration-500 ${
              isSignUp ? "-translate-x-full" : "translate-x-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: !isSignUp ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Sign In</h2>
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div className="flex items-center border rounded-md border-indigo-300 p-2 gap-3 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                <FaUser className="text-indigo-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="outline-none w-full text-gray-800 placeholder-indigo-300"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="flex items-center border rounded-md border-indigo-300 p-2 gap-3 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                <FaLock className="text-indigo-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="outline-none w-full text-gray-800 placeholder-indigo-300"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-indigo-500 hover:text-indigo-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 rounded-md flex justify-center items-center hover:from-indigo-600 hover:to-blue-700 transition-all font-semibold"
              >
                {loading ? (
                  <Loader2 className="animate-spin text-center" />
                ) : (
                  "Login"
                )}
              </button>
              {signInError && (
                <div className="text-red-500 text-center mt-2 font-medium">
                  {signInError}
                </div>
              )}
            </form>
          </motion.div>
        </div>

        <p className="mt-4 text-center text-gray-600">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-purple-600 hover:underline font-semibold"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}

export default AuthPage;