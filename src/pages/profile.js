import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [form, setForm] = useState({
    username: "",
    age: "",
    gender: "",
    address: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        age: user.age || "",
        gender: user.gender || "",
        address: user.address || "",
      });

      if (user.profilePic) {
        setPreview(`https://backend-workwagon.onrender.com/${user.profilePic}`);
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
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

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Profile updated successfully!");
    } catch (err) {
      alert("Update failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            )}
            <input type="file" onChange={handleFileChange} />
          </div>

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            type="number"
            className="w-full px-4 py-2 border rounded-md"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;