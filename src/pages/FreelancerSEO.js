import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FreelancerNavbar from "../components/freelancerNavbar";

function FreelancerSEO() {
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
  const [seoGigs, setSeoGigs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Load saved gigs from localStorage on component mount
  useEffect(() => {
    try {
      const savedGigs = localStorage.getItem("seoGigs");
      if (savedGigs) {
        const parsedGigs = JSON.parse(savedGigs);
        console.log(`Loaded ${parsedGigs.length} SEO gigs`);
        setSeoGigs(parsedGigs);
      }
    } catch (error) {
      console.error("Error loading SEO gigs:", error);
      localStorage.removeItem("seoGigs");
      setSeoGigs([]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Compress image before storing
  const compressImage = (dataUrl, maxSizeKB = 100) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions (max 300px width/height for thumbnails)
        const maxDimension = 300;
        if (width > height && width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        } else if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Try different quality levels
        let quality = 0.7;
        let resultDataUrl = canvas.toDataURL('image/jpeg', quality);
        
        // Reduce quality until size is under limit or quality is too low
        while (resultDataUrl.length > maxSizeKB * 1024 && quality > 0.3) {
          quality -= 0.1;
          resultDataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        
        resolve(resultDataUrl);
      };
      img.src = dataUrl;
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert("Please upload a valid image file (JPEG, PNG, GIF, etc.)");
        return;
      }
      
      // Validate file size (max 2MB before compression)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          // Compress the image
          const compressedImage = await compressImage(reader.result, 80);
          setFormData(prev => ({ ...prev, image: compressedImage }));
          alert("Image uploaded and compressed successfully!");
        } catch (error) {
          console.error("Failed to compress image:", error);
          alert("Failed to process image. Please try a different image.");
        } finally {
          setIsUploading(false);
        }
      };
      reader.onerror = () => {
        alert("Failed to read image file. Please try again.");
        setIsUploading(false);
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
      alert("All fields are required. Please complete the form.");
      return;
    }

    // Validate numeric fields
    const ratingNum = parseFloat(formData.rating);
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      alert("Please enter a valid rating between 0 and 5");
      return;
    }

    const reviewsNum = parseInt(formData.reviews);
    if (isNaN(reviewsNum) || reviewsNum < 0) {
      alert("Reviews must be a positive number");
      return;
    }

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Price must be a positive number");
      return;
    }

    if (!formData.image) {
      alert("Please upload a service image");
      return;
    }

    // Check current storage usage
    let currentGigs = [];
    try {
      const currentStorage = localStorage.getItem("seoGigs");
      if (currentStorage) {
        currentGigs = JSON.parse(currentStorage);
      }
    } catch (error) {
      console.error("Error reading storage:", error);
      currentGigs = [];
    }
    
    // Create new SEO gig
    const newGig = {
      id: Date.now(),
      img: formData.image,
      name: formData.name,
      level: formData.level,
      title: formData.title,
      rating: ratingNum,
      reviews: reviewsNum,
      price: priceNum.toFixed(2),
      about: formData.about
    };
    
    const updatedGigs = [...currentGigs, newGig];
    const newDataStr = JSON.stringify(updatedGigs);
    const sizeInKB = newDataStr.length / 1024;
    
    // localStorage limit is typically 5MB (5120 KB)
    if (sizeInKB > 4500) {
      alert(`Storage limit reached! Your data size is ${sizeInKB.toFixed(2)} KB. Please delete some existing gigs before adding new ones.`);
      return;
    }

    try {
      localStorage.setItem("seoGigs", JSON.stringify(updatedGigs));
      setSeoGigs(updatedGigs);
      handleClear();
      alert(`SEO service has been successfully listed! (Size: ${sizeInKB.toFixed(2)} KB)`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to save SEO gig:", error);
      if (error.name === "QuotaExceededError") {
        alert("Storage quota exceeded! Please delete some existing gigs or use smaller images.");
      } else {
        alert("Failed to save SEO gig: " + error.message);
      }
    }
  };

  const handleDelete = (id) => {
    const updatedGigs = seoGigs.filter(gig => gig.id !== id);
    try {
      localStorage.setItem("seoGigs", JSON.stringify(updatedGigs));
      setSeoGigs(updatedGigs);
      alert("SEO gig deleted successfully!");
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Failed to delete gig");
    }
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
            "h1",
            { className: "text-3xl font-bold text-gray-900 mb-2" },
            "SEO Gigs Form"
          ),
          React.createElement(
            "p",
            { className: "text-gray-600" },
            "Create your SEO service offering"
          ),
          seoGigs.length > 0 && React.createElement(
            "p",
            { className: "text-sm text-gray-500 mt-2" },
            `Current gigs: ${seoGigs.length} | Storage used: ${(JSON.stringify(seoGigs).length / 1024).toFixed(2)} KB / ~5000 KB`
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
                "Service Image (Max 2MB, will be compressed)"
              ),
              React.createElement("input", {
                type: "file",
                id: "image",
                name: "image",
                accept: "image/*",
                onChange: handleImageUpload,
                disabled: isUploading,
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              }),
              isUploading && React.createElement(
                "p",
                { className: "text-sm text-blue-600 mt-1" },
                "Processing image..."
              ),
              formData.image && React.createElement(
                "div",
                { className: "mt-2" },
                React.createElement("img", {
                  src: formData.image,
                  alt: "Preview",
                  className: "h-32 object-contain border rounded"
                }),
                React.createElement(
                  "p",
                  { className: "text-xs text-gray-500 mt-1" },
                  `Image size: ${(formData.image.length / 1024).toFixed(2)} KB`
                )
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
              React.createElement(
                "select",
                {
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
                "About Your SEO Service"
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
                disabled: isUploading,
                className: "px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
              },
              isUploading ? "Processing..." : "Upload"
            )
          )
        ),
        // Existing Gigs List
        seoGigs.length > 0 &&
          React.createElement(
            "div",
            { className: "bg-white shadow rounded-lg p-6" },
            React.createElement(
              "h2",
              { className: "text-lg font-medium text-gray-900 mb-4" },
              "Your SEO Gigs"
            ),
            React.createElement(
              "div",
              { className: "space-y-4" },
              seoGigs.map((gig) =>
                React.createElement(
                  "div",
                  { key: gig.id, className: "border rounded-lg p-4 flex justify-between items-start" },
                  React.createElement(
                    "div",
                    { className: "flex space-x-4" },
                    gig.img &&
                      React.createElement(
                        "div",
                        { className: "flex-shrink-0" },
                        React.createElement("img", {
                          src: gig.img,
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
                      gig.rating &&
                        React.createElement(
                          "p",
                          { className: "text-sm" },
                          `⭐ ${gig.rating}${gig.reviews ? ` (${gig.reviews} reviews)` : ""}`
                        ),
                      React.createElement(
                        "p",
                        { className: "text-sm" },
                        gig.level && `Level: ${gig.level}`
                      ),
                      React.createElement(
                        "p",
                        { className: "font-medium" },
                        gig.price && `$${gig.price}`
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
                )
              )
            )
          )
      )
    )
  );
}

export default FreelancerSEO;