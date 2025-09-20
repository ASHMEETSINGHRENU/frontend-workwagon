import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    username: "", email: "", age: "", gender: "", address: "", password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://backend-workwagon.onrender.com/api/auth/register", form);
      alert("Registered successfully! Now login.");
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Try again.";
      alert("Error: " + message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Register to WorkWagon
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
            type="number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Gender Select */}
<div className="relative">
  <select
    name="gender"
    value={form.gender}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 pr-10 border rounded-md bg-white text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
    <svg
      className="w-4 h-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 underline hover:text-green-800">
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
}


export default Register;
