// src/pages/freelancerLogo.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FreelancerNavbar from "../components/freelancerNavbar";

function FreelancerLogo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    rating: "",
    reviews: "",
    image: "",
    level: "",
    price: "",
    about: ""
  });
  const [logoGigs, setLogoGigs] = useState([]);

  // Load saved gigs from localStorage on component mount
  useEffect(() => {
    const savedGigs = localStorage.getItem("logoGigs");
    if (savedGigs) {
      setLogoGigs(JSON.parse(savedGigs));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


    const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleClear = () => {
    setFormData({
      title: "",
      name: "",
      rating: "",
      reviews: "",
      image: "",
      level: "",
      price: "",
      about: ""
    });
  };


// Update the handleUpload function in freelancerLogo.js
const handleUpload = () => {
  // Validate all fields are filled
  if (
    !formData.title ||
    !formData.name ||
    !formData.rating ||
    !formData.reviews ||
    !formData.image ||
    !formData.level ||
    !formData.price ||
    !formData.about
  ) {
    alert("All fields are required. Please complete the logo design submission form.");
    return;
  }

  // Validate numeric fields
  if (isNaN(formData.rating) || formData.rating < 1 || formData.rating > 5) {
    alert("Please enter a valid rating between 1 and 5 stars");
    return;
  }

  if (isNaN(formData.reviews) || formData.reviews < 0) {
    alert("Number of reviews must be a positive number");
    return;
  }

  if (isNaN(formData.price) || formData.price <= 0) {
    alert("Price must be a positive amount");
    return;
  }

  // Validate image is uploaded (not just empty string)
  if (!formData.image.startsWith('data:image')) {
    alert("Please upload a valid logo image file");
    return;
  }

  // Create new logo gig
  const newGig = {
    id: Date.now(),
    img: formData.image, 
    name: formData.name, 
    level: formData.level, 
    title: formData.title,
    rating: parseFloat(formData.rating),
    reviews: parseInt(formData.reviews),
    price: `${parseFloat(formData.price).toFixed(2)}`,
    about: formData.about
  };

  try {
    const updatedGigs = [...logoGigs, newGig];
    setLogoGigs(updatedGigs);
    localStorage.setItem("logoGigs", JSON.stringify(updatedGigs));
    handleClear();
    alert("Logo design service successfully published!");
    navigate("/dashboard");
  } catch (error) {
    console.error("Failed to save logo gig:", error);
    alert("Failed to publish logo service. Please check your data and try again.");
  }
};



  const handleDelete = (id) => {
    const updatedGigs = logoGigs.filter(gig => gig.id !== id);
    setLogoGigs(updatedGigs);
    localStorage.setItem("logoGigs", JSON.stringify(updatedGigs));
    alert("Logo gig deleted successfully!");
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(FreelancerNavbar, null),
    React.createElement(
      "div",
      { className: "min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" },
      React.createElement(
        "div",
        { className: "max-w-3xl mx-auto" },
        // Form Header
        React.createElement(
          "div",
          { className: "text-center mb-8" },
          React.createElement(
    "div",
    { className: "min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" },



    
    React.createElement(
      "div",
      { className: "max-w-3xl mx-auto pt-12" },
      // Form Header
      React.createElement(
        "div",
        { className: "text-center mb-8" },
        React.createElement(
          "h1",
          { className: "text-3xl font-bold text-gray-900 mb-2" },
          "Logo Gigs Form"
        ),
        React.createElement(
          "p",
          { className: "text-gray-600" },
          "Create your logo design service offering"
        )
      ),
      
      // Main Form
      React.createElement(
        "div",
        { className: "bg-white shadow rounded-lg p-6 mb-8" },
        React.createElement(
          "div",
          { className: "grid grid-cols-1 gap-6 sm:grid-cols-2" },
          // Title
          React.createElement(
            "div",
            { className: "sm:col-span-2" },
            React.createElement(
              "label",
              { htmlFor: "title", className: "block text-sm font-medium text-gray-700 mb-1" },
              "Title*"
            ),
            React.createElement("input", {
              type: "text",
              id: "title",
              name: "title",
              value: formData.title,
              onChange: handleChange,
              className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              required: true
            })
          ),
          
          // Freelancer Name
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-1" },
              "Your Name"
            ),
            React.createElement("input", {
              type: "text",
              id: "name",
              name: "name",
              value: formData.name,
              onChange: handleChange,
              className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            })
          ),
          
          // Rating
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { htmlFor: "rating", className: "block text-sm font-medium text-gray-700 mb-1" },
              "Rating"
            ),
            React.createElement("input", {
              type: "number",
              id: "rating",
              name: "rating",
              min: "0",
              max: "5",
              step: "0.1",
              value: formData.rating,
              onChange: handleChange,
              className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            })
          ),
          
          // Reviews
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { htmlFor: "reviews", className: "block text-sm font-medium text-gray-700 mb-1" },
              "Number of Reviews"
            ),
            React.createElement("input", {
              type: "number",
              id: "reviews",
              name: "reviews",
              min: "0",
              value: formData.reviews,
              onChange: handleChange,
              className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            })
          ),
          
          // Image Upload
          React.createElement(
            "div",
            { className: "sm:col-span-2" },
            React.createElement(
              "label",
              { htmlFor: "image", className: "block text-sm font-medium text-gray-700 mb-1" },
              "Logo Image"
            ),
            React.createElement("input", {
              type: "file",
              id: "image",
              name: "image",
              accept: "image/*",
              onChange: handleImageUpload,
              className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }),
            formData.image && React.createElement(
              "div",
              { className: "mt-2" },
              React.createElement("img", {
                src: formData.image,
                alt: "Preview",
                className: "h-32 object-contain border rounded"
              })
            )
          ),
          
          // Level
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { htmlFor: "level", className: "block text-sm font-medium text-gray-700 mb-1" },
              "Experience Level"
            ),
            React.createElement("select", {
              id: "level",
              name: "level",
              value: formData.level,
              onChange: handleChange,
              className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            },
              React.createElement("option", { value: "" }, "Select level"),
              React.createElement("option", { value: "Beginner" }, "Beginner"),
              React.createElement("option", { value: "Intermediate" }, "Intermediate"),
              React.createElement("option", { value: "Expert" }, "Expert")
            )
          ),
          
          // Price
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { htmlFor: "price", className: "block text-sm font-medium text-gray-700 mb-1" },
              "Price*"
            ),
            React.createElement("input", {
              type: "number",
              id: "price",
              name: "price",
              min: "0",
              step: "0.01",
              value: formData.price,
              onChange: handleChange,
              className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              required: true
            })
          ),
          
          // About
          React.createElement(
            "div",
            { className: "sm:col-span-2" },
            React.createElement(
              "label",
              { htmlFor: "about", className: "block text-sm font-medium text-gray-700 mb-1" },
              "About Your Logo Service"
            ),
            React.createElement("textarea", {
              id: "about",
              name: "about",
              rows: "4",
              value: formData.about,
              onChange: handleChange,
              className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            })
          )
        ),
        
        // Action Buttons
        React.createElement(
          "div",
          { className: "mt-6 flex justify-end space-x-3" },
          React.createElement(
            "button",
            {
              onClick: handleClear,
              className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            },
            "Clear"
          ),
          React.createElement(
            "button",
            {
              onClick: handleUpload,
              className: "px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
            },
            "Upload"
          )
        )
      ),
      
      // Existing Gigs List
      logoGigs.length > 0 && React.createElement(
        "div",
        { className: "bg-white shadow rounded-lg p-6" },
        React.createElement(
          "h2",
          { className: "text-lg font-medium text-gray-900 mb-4" },
          "Your Logo Gigs"
        ),
        React.createElement(
          "div",
          { className: "space-y-4" },
          logoGigs.map(gig => React.createElement(
            "div",
            { key: gig.id, className: "border rounded-lg p-4 flex justify-between items-start" },
            React.createElement(
              "div",
              { className: "flex space-x-4" },
              gig.image && React.createElement(
                "div",
                { className: "flex-shrink-0" },
                React.createElement("img", {
                  src: gig.image,
                  alt: gig.title,
                  className: "h-16 w-16 object-contain"
                })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "h3",
                  { className: "font-medium text-gray-900" },
                  gig.title
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-gray-500" },
                  gig.name && `By ${gig.name}`
                ),
                gig.rating && React.createElement(
                  "p",
                  { className: "text-sm" },
                  `⭐ ${gig.rating}${gig.reviews ? ` (${gig.reviews} reviews)` : ''}`
                ),
                React.createElement(
                  "p",
                  { className: "text-sm" },
                  gig.level && `Level: ${gig.level}`
                ),
                React.createElement(
                  "p",
                  { className: "font-medium" },
                  gig.price && `$${parseFloat(gig.price).toFixed(2)}`
                )
              )
            ),
            React.createElement(
              "button",
              {
                onClick: () => handleDelete(gig.id),
                className: "text-red-600 hover:text-red-800 text-sm font-medium"
              },
              "Delete"
            )
          ))
        )
      )
    )

  )
)  
)   
)
  );
}

export default FreelancerLogo;