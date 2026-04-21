import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, FaPhone, FaEnvelope, FaDollarSign, FaPaperclip, 
  FaPaperPlane, FaCheckCircle, FaSpinner, FaArrowRight,
  FaLaptopCode, FaPaintBrush, FaChartLine, FaStar, FaClock,
  FaHeadset, FaRocket, FaSmile, FaThumbsUp
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from './chatbot';

const ContactMe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    title: "",
    budget: "1000",
    service: "",
    details: "",
    attachment: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "attachment") {
      setFormData({ ...formData, attachment: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = new FormData();
      for (let key in formData) {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      }

      await axios.post("https://backend-workwagon.onrender.com/api/contact", data);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring", stiffness: 100 } }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring", stiffness: 100, delay: 0.2 } }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.4 } }
  };

  const serviceOptions = [
    { value: "Make Website", label: "Web Development", icon: <FaLaptopCode />, color: "from-blue-500 to-cyan-500", bg: "bg-blue-50" },
    { value: "Make Logo", label: "Logo Design", icon: <FaPaintBrush />, color: "from-purple-500 to-pink-500", bg: "bg-purple-50" },
    { value: "Make SEO", label: "SEO Services", icon: <FaChartLine />, color: "from-green-500 to-emerald-500", bg: "bg-green-50" }
  ];

  const stats = [
    { icon: <FaClock />, value: "24h", label: "Response Time", color: "from-blue-500 to-cyan-500" },
    { icon: <FaHeadset />, value: "24/7", label: "Support", color: "from-purple-500 to-pink-500" },
    { icon: <FaSmile />, value: "100%", label: "Satisfaction", color: "from-green-500 to-emerald-500" },
    { icon: <FaThumbsUp />, value: "500+", label: "Happy Clients", color: "from-orange-500 to-red-500" }
  ];

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ x: [0, -120, 0], y: [0, 70, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ x: [0, 80, 0], y: [0, -100, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-300 rounded-full filter blur-3xl opacity-10"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          >
            {/* Left Side - Content */}
            <motion.div variants={leftVariants} className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/50 w-fit"
              >
                <FaStar className="text-yellow-500 text-sm" />
                <span className="text-sm font-medium text-gray-700">Let's Work Together</span>
              </motion.div>

              {/* Heading */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-800">Get in Touch with </span>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    WorkWagon
                  </span>
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
              </div>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                Fill out the form below, and we'll respond within 24 hours. Whether it's website development, branding, or SEO — we're here to help bring your vision to life.
              </p>

              {/* Stats Section */}
              <motion.div
                variants={statsVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
              >
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="text-center p-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 shadow-sm"
                  >
                    <div className={`text-2xl mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.icon}
                    </div>
                    <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Features List */}
              <div className="space-y-3 pt-4">
                {[
                  { text: "Free consultation to understand your needs", icon: "✓" },
                  { text: "No hidden fees, transparent pricing", icon: "✓" },
                  { text: "Dedicated project manager assigned", icon: "✓" },
                  { text: "Post-delivery support & maintenance", icon: "✓" }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div variants={rightVariants}>
              <div className="bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white/50 p-6 border-b border-gray-200/50">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaPaperPlane className="text-blue-500" />
                    Start Your Project
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Fill in the details and we'll get back to you</p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {/* Name */}
                  <motion.div variants={fieldVariants} className="relative group">
                    <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
                      focusedField === 'name' ? 'text-blue-500' : 'text-gray-400'
                    }`}>
                      <FaUser className="text-sm" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <motion.div variants={fieldVariants} className="relative group">
                      <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
                        focusedField === 'phone' ? 'text-blue-500' : 'text-gray-400'
                      }`}>
                        <FaPhone className="text-sm" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={fieldVariants} className="relative group">
                      <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
                        focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                      }`}>
                        <FaEnvelope className="text-sm" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                      />
                    </motion.div>
                  </div>

                  {/* Service Selection */}
                  <motion.div variants={fieldVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Service</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {serviceOptions.map((service) => (
                        <motion.div
                          key={service.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, service: service.value })}
                          className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 ${
                            formData.service === service.value
                              ? `border-blue-500 ${service.bg} shadow-md`
                              : 'border-gray-200 bg-white/40 hover:border-blue-300'
                          }`}
                        >
                          <div className={`text-2xl mb-1 ${formData.service === service.value ? service.color.split(' ')[1] : 'text-gray-400'}`}>
                            {service.icon}
                          </div>
                          <p className={`text-sm font-medium ${formData.service === service.value ? 'text-gray-800' : 'text-gray-600'}`}>
                            {service.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Project Title */}
                  <motion.div variants={fieldVariants} className="relative group">
                    <input
                      type="text"
                      name="title"
                      placeholder="Project Title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                    />
                  </motion.div>

                  {/* Budget Slider */}
                  <motion.div variants={fieldVariants}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FaDollarSign className="text-green-500" />
                        Budget Range
                      </label>
                      <span className="text-lg font-bold text-blue-600">${formData.budget}</span>
                    </div>
                    <input
                      type="range"
                      name="budget"
                      min="50"
                      max="5000"
                      step="50"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$50</span>
                      <span>$1000</span>
                      <span>$2000</span>
                      <span>$3000</span>
                      <span>$5000</span>
                    </div>
                  </motion.div>

                  {/* Project Details */}
                  <motion.div variants={fieldVariants}>
                    <textarea
                      name="details"
                      placeholder="Tell us about your project..."
                      required
                      value={formData.details}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 text-gray-700 resize-none"
                    />
                  </motion.div>

                  {/* File Attachment */}
                  <motion.div variants={fieldVariants}>
                    {formData.attachment ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                        <div className="flex items-center gap-3">
                          <FaPaperclip className="text-blue-500" />
                          <p className="text-sm text-gray-700 truncate max-w-[200px]">{formData.attachment.name}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, attachment: null })}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-white/40 backdrop-blur-sm">
                        <div className="flex flex-col items-center">
                          <FaPaperclip className="text-gray-400 text-xl mb-2" />
                          <p className="text-sm text-gray-500">Click to upload a file (optional)</p>
                          <p className="text-xs text-gray-400">Max file size: 10MB</p>
                        </div>
                        <input
                          type="file"
                          name="attachment"
                          onChange={handleChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </motion.div>

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
                          : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-lg"
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
                            <span>Sending Message...</span>
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
                            <span>Sent Successfully!</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="send"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <FaPaperPlane />
                            <span>Send Message</span>
                            <FaArrowRight className="text-sm" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>

                  {/* Trust Badge */}
                  <motion.p 
                    variants={fieldVariants}
                    className="text-xs text-center text-gray-400 pt-2 flex items-center justify-center gap-1"
                  >
                    <FaRocket className="text-xs" />
                    We respect your privacy. Your information is safe with us.
                  </motion.p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
};

export default ContactMe;