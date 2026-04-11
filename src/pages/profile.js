import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    username: "",
    email: "",
    age: "",
    gender: "",
    address: "",
    password: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Load user data
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        age: user.age || "",
        gender: user.gender || "",
        address: user.address || "",
        password: "",
      });

      if (user.profilePic) {
        setPreview(`https://backend-workwagon.onrender.com/${user.profilePic}`);
      }
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append all fields
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const res = await axios.put(
        `https://backend-workwagon.onrender.com/api/auth/update/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          My Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            {preview && (
              <img
                src={preview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-3 border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm"
            />
          </div>

          {/* Username */}
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Email */}
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Age */}
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            type="number"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Gender */}
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Address */}
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Password */}
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="New Password (leave blank to keep same)"
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Profile;