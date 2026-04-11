import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUser, FaEnvelope, FaCalendarAlt, FaVenusMars, FaMapMarkerAlt, 
  FaLock, FaCamera, FaSave, FaSpinner, FaCheckCircle, FaArrowLeft,
  FaUserCircle, FaShieldAlt, FaClock, FaIdCard
} from "react-icons/fa";
//FaEdit
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();
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
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [memberSince, setMemberSince] = useState("");

  // Load user data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

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

      // Set member since date from createdAt or current date
      if (user.createdAt) {
        const date = new Date(user.createdAt);
        setMemberSince(date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
      } else {
        setMemberSince("January 2024");
      }
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    setSuccess(false);

    try {
      const formData = new FormData();
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
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setSuccess(true);
      
      // Dispatch custom event for navbar to update
      window.dispatchEvent(new Event("profileUpdated"));
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.3 } }
  };

  return (
    <>
      <Navbar />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 pt-8 px-4 pb-20"
      >
        {/* Enhanced Animated Background Blobs with more colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 150, 0], y: [0, -80, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ x: [0, -120, 0], y: [0, 70, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ x: [0, 80, 0], y: [0, -100, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-300 rounded-full filter blur-3xl opacity-10"
          />
          <motion.div
            animate={{ x: [0, -60, 0], y: [0, 120, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-40 right-20 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          />
        </div>

        {/* Main Container */}
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-200 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Home</span>
          </motion.button>

          {/* Stats Cards */}
          <motion.div
            variants={statsVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { icon: <FaIdCard />, label: "Member Since", value: memberSince, color: "from-blue-500 to-cyan-500" },
              { icon: <FaClock />, label: "Last Updated", value: "Today", color: "from-green-500 to-emerald-500" },
              { icon: <FaShieldAlt />, label: "Security Level", value: "High", color: "from-purple-500 to-pink-500" },
              { icon: <FaUserCircle />, label: "Profile Status", value: "Active", color: "from-orange-500 to-red-500" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-white/30 backdrop-blur-md rounded-2xl p-4 text-center border border-white/50 shadow-lg`}
              >
                <div className={`text-2xl mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
      
          {/* Profile Card */}
          <motion.div
            variants={cardVariants}
            className="relative bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/50"
          >
            {/* Decorative Top Bar with gradient */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-bl-3xl" />
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent rounded-br-3xl" />

            {/* Header */}
            <div className="relative pt-8 pb-6 px-6 text-center bg-gradient-to-br from-white/40 to-transparent">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                  My Profile
                </h2>
                <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
              </motion.div>
            </div>

            {/* Profile Image Section */}
            <motion.div 
              variants={fieldVariants}
              className="flex justify-center -mt-8 mb-4"
            >
              <div 
                className="relative cursor-pointer group"
                onMouseEnter={() => setImageHover(true)}
                onMouseLeave={() => setImageHover(false)}
                onClick={() => document.getElementById("profileImageInput").click()}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  {/* Animated ring around profile picture */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-sm"
                  />
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="relative w-28 h-28 rounded-full object-cover ring-4 ring-white shadow-xl"
                    />
                  ) : (
                    <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center ring-4 ring-white shadow-xl">
                      <FaUserCircle className="text-5xl text-gray-500" />
                    </div>
                  )}
                  <div className={`absolute inset-0 rounded-full bg-black/50 flex items-center justify-center transition-opacity duration-300 ${imageHover ? 'opacity-100' : 'opacity-0'}`}>
                    <FaCamera className="text-white text-2xl" />
                  </div>
                </motion.div>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  Change Photo
                </span>
              </div>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Username */}
                <motion.div variants={fieldVariants} className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors z-10">
                    <FaUser className="text-sm" />
                  </div>
                  <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={fieldVariants} className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                  />
                </motion.div>

                {/* Age */}
                <motion.div variants={fieldVariants} className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors">
                    <FaCalendarAlt className="text-sm" />
                  </div>
                  <input
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age"
                    type="number"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                  />
                </motion.div>

                {/* Gender */}
                <motion.div variants={fieldVariants} className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors z-10">
                    <FaVenusMars className="text-sm" />
                  </div>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>

                {/* Address - Full Width */}
                <motion.div variants={fieldVariants} className="relative group md:col-span-2">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors">
                    <FaMapMarkerAlt className="text-sm" />
                  </div>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                  />
                </motion.div>

                {/* Password */}
                <motion.div variants={fieldVariants} className="relative group md:col-span-2">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors">
                    <FaLock className="text-sm" />
                  </div>
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="New Password (leave blank to keep same)"
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.div variants={fieldVariants}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 overflow-hidden ${
                    loading 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-gradient-to-r from-gray-700 to-gray-900 hover:shadow-lg hover:from-gray-800 hover:to-gray-950"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <FaSpinner className="animate-spin" />
                        <span>Updating Profile...</span>
                      </motion.div>
                    ) : success ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <FaCheckCircle />
                        <span>Updated Successfully!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="save"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <FaSave />
                        <span>Save Changes</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>

              {/* Info Note */}
              <motion.p 
                variants={fieldVariants}
                className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1"
              >
                <FaShieldAlt className="text-xs" />
                * Your profile information is securely stored and only visible to you
              </motion.p>
            </form>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </>
  );
}

export default Profile;