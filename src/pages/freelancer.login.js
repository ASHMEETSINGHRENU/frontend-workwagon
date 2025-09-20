// FreelancerLogin.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function FreelancerLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://backend-workwagon.onrender.com/freelancers/Frelogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify({ username: data.name || data.username }));
      alert(data.message);


      // Redirect to the dashboard after successful login 
      navigate("/Dashboard");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">WorkWagon for Freelancer</h1>
        <p className="text-gray-600 text-center mb-6">
          Your freelance success begins here—sign in to WorkWagon now!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-700">
          🚀 New to WorkWagon? {" "}
          <Link to="/freelancer-registration" className="text-blue-600 underline hover:font-semibold">
            Register as a Freelancer
          </Link>{" "}
          to start earning! <br /><br />
          🔍Looking for talent?{" "}
          <Link to="/login" className="text-blue-600 underline hover:font-semibold">
            Go to Client Login
          </Link>{" "}
          to hire skilled professionals.
        </div>
      </div>
    </div>
  );
}

export default FreelancerLogin;
