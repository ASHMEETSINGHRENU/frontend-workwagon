import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ContactMe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
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
    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      await axios.post("http://localhost:5000/api/contact", data);
      alert("Message sent successfully!");
      navigate("/");
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
   <div>
    <Navbar /> 
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side Text */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-snug">
            <span className="text-black">Get in Touch with </span>
            <span className="text-blue-600">WorkWagon</span>
          </h1>
          <p className="text-gray-700 text-lg mb-3">
            Fill out the form below, and we’ll respond within 24 hours.
          </p>
          <p className="text-gray-700 text-lg">
            Whether it’s website development, branding, or SEO — we’re here to help.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 shadow-xl rounded-xl border border-gray-200"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none py-2"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none py-2"
          />

          <select
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none py-2"
          >
            <option value="" disabled>Select Service</option>
            <option value="Make Website">🖥️ Web Development</option>
            <option value="Make Logo">🎨 Logo Design</option>
            <option value="Make SEO">✏️ SEO Services</option>
          </select>

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none py-2"
          />

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Budget Range: 💲{formData.budget}
            </label>
            <input
              type="range"
              name="budget"
              min="50"
              max="5000"
              step="50"
              value={formData.budget}
              onChange={handleChange}
              className="w-full accent-blue-600"
            />
          </div>

          <textarea
            name="details"
            placeholder="Project Details"
            required
            value={formData.details}
            onChange={handleChange}
            rows="4"
            className="w-full border-b border-gray-300 focus:outline-none py-2"
          ></textarea>

         {formData.attachment ? (
      <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
        <p className="text-sm text-gray-700 truncate">{formData.attachment.name}</p>
         <button
         type="button"
         onClick={() => setFormData({ ...formData, attachment: null })}
          className="text-red-500 text-sm ml-2 hover:underline" > ❌ </button>
             </div>) : ( <input
          type="file"
          name="attachment"
          onChange={(e) => setFormData({ ...formData, attachment: e.target.files[0] })}
           className="block text-sm text-gray-600"/>
         )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>  
  );
};

export default ContactMe;
