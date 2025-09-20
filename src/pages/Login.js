import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import bannerImg from "../photos/banner-4.png";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://backend-workwagon.onrender.com/api/auth/login", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      alert("Error: " + message);
    }
  };

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-2xl max-w-4xl p-6 md:p-0 overflow-hidden w-full m-4">
        
        {/* Left Image Section */}
        <div className="md:w-1/2 p-4 hidden md:flex justify-center items-center animate-slideInLeft">
          <img
            src={bannerImg}// <-- ✅ Replace with your image path
            alt="Login Visual"
            className="w-full h-auto max-h-[400px] object-contain"
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6"> WorkWagon </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
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
          <Link to="/freelancer-login" className="text-blue-500 underline hover:text-blue-700"> WorkWagon </Link>{" "}and grab your next project.
         </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
