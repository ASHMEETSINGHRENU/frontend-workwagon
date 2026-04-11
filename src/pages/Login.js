import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import bannerImg from "../photos/banner-4.png";
import { LogIn } from "lucide-react";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post("https://backend-workwagon.onrender.com/api/auth/login", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      alert("Error: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-2xl max-w-4xl p-6 md:p-0 overflow-hidden w-full m-4">
        
        {/* Left Image Section */}
        <div className="md:w-1/2 p-4 hidden md:flex justify-center items-center animate-slideInLeft">
          <img
            src={bannerImg}
            alt="Login Visual"
            className="w-full h-auto max-h-[400px] object-contain"
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">WorkWagon</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              disabled={loading}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              disabled={loading}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            
            {/* Enhanced button with loading state */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-[#cbb2fe] to-[#b39ddb] text-[#2d1b4e] py-4 rounded-2xl font-semibold text-lg hover:from-[#b39ddb] hover:to-[#a58ac7] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <svg 
                      className="animate-spin h-5 w-5 text-[#2d1b4e]" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    {/* Login icon using SVG (no external dependencies) */}
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                      />
                    </svg>
                    <span>Login</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#b39ddb] to-[#a58ac7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
          
          <p className="text-center mt-4">
            Not registered?{" "}
            <Link to="/register" className="text-blue-500 underline hover:text-blue-700">
              Create an account
            </Link>
          </p>
          <p className="text-center mt-4">
            Global clients await—sign in to{" "}
            <Link to="/freelancer-login" className="text-blue-500 underline hover:text-blue-700">WorkWagon</Link>{" "}
            and grab your next project.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;