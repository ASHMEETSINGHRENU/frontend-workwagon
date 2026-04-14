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
  const [isUploading, setIsUploading] = useState(false);
  const [useHighQuality, setUseHighQuality] = useState(true); // High quality mode for logos

  // Load saved gigs from localStorage on component mount
  useEffect(() => {
    try {
      const savedGigs = localStorage.getItem("logoGigs");
      if (savedGigs) {
        const parsedGigs = JSON.parse(savedGigs);
        console.log(`Loaded ${parsedGigs.length} logo gigs`);
        setLogoGigs(parsedGigs);
      }
    } catch (error) {
      console.error("Error loading logo gigs:", error);
      localStorage.removeItem("logoGigs");
      setLogoGigs([]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Improved compressImage with better quality for logos
  const compressImage = (dataUrl, options = {}) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // For logos, we want to preserve quality - use larger max dimension
        const maxDimension = options.maxDimension || 1200; // 1200px for logos (better quality)
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
        
        // Logos need PNG format for transparency and sharp text
        let resultDataUrl;
        if (options.usePNG || options.isLogo) {
          // Use PNG for logos (no quality loss, supports transparency)
          resultDataUrl = canvas.toDataURL('image/png');
        } else {
          // Use JPEG with very high quality for other images
          const quality = options.quality || 0.95; // 95% quality for logos
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
      
      // Increased max file size to 10MB for logos
      if (file.size > 10 * 1024 * 1024) {
        alert("Logo image size should be less than 10MB");
        return;
      }
      
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          // For logos, always use high quality and PNG format if possible
          const isPNG = file.type === 'image/png';
          const usePNG = isPNG || useHighQuality;
          
          const compressedImage = await compressImage(reader.result, {
            maxDimension: 1200,  // 1200px max for logos (better quality)
            quality: 0.95,       // 95% quality for JPEGs
            usePNG: usePNG,      // Use PNG for logos (preserves quality)
            isLogo: true         // Flag for logo optimization
          });
          
          const sizeInKB = (compressedImage.length / 1024).toFixed(2);
          const format = usePNG ? 'PNG' : 'JPEG';
          alert(`✅ Logo uploaded!\n📏 Size: ${sizeInKB} KB\n🎨 Format: ${format} (High Quality)`);
          
          setFormData(prev => ({ ...prev, image: compressedImage }));
        } catch (error) {
          console.error("Failed to compress logo:", error);
          alert("Failed to process logo image. Please try a different image.");
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
      alert("All fields are required. Please complete the logo design submission form.");
      return;
    }

    // Validate numeric fields
    const ratingNum = parseFloat(formData.rating);
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      alert("Please enter a valid rating between 0 and 5 stars");
      return;
    }

    const reviewsNum = parseInt(formData.reviews);
    if (isNaN(reviewsNum) || reviewsNum < 0) {
      alert("Number of reviews must be a positive number");
      return;
    }

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Price must be a positive amount");
      return;
    }

    if (!formData.image) {
      alert("Please upload a logo image");
      return;
    }

    // Check current storage usage
    let currentGigs = [];
    try {
      const currentStorage = localStorage.getItem("logoGigs");
      if (currentStorage) {
        currentGigs = JSON.parse(currentStorage);
      }
    } catch (error) {
      console.error("Error reading storage:", error);
      currentGigs = [];
    }
    
    // Create new logo gig
    const newGig = {
      id: Date.now(),
      image: formData.image,
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
    
    // Check storage limit (5MB total)
    if (sizeInKB > 4500) {
      alert(`⚠️ Storage limit warning!\n📊 Data size: ${sizeInKB.toFixed(2)} KB\n💡 Please delete some existing logos before adding new ones.`);
      return;
    }

    try {
      localStorage.setItem("logoGigs", JSON.stringify(updatedGigs));
      setLogoGigs(updatedGigs);
      handleClear();
      alert(`✅ Logo design service successfully published!\n📊 Storage used: ${sizeInKB.toFixed(2)} KB`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to save logo gig:", error);
      if (error.name === "QuotaExceededError") {
        alert("❌ Storage quota exceeded!\n\n💡 Solutions:\n1. Delete some existing logos\n2. Disable 'High Quality Mode'\n3. Use smaller logo images\n4. Clear browser cache");
      } else {
        alert("Failed to publish logo service: " + error.message);
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this logo gig?")) {
      const updatedGigs = logoGigs.filter(gig => gig.id !== id);
      try {
        localStorage.setItem("logoGigs", JSON.stringify(updatedGigs));
        setLogoGigs(updatedGigs);
        alert("✅ Logo gig deleted successfully!");
      } catch (error) {
        console.error("Failed to delete:", error);
        alert("Failed to delete gig");
      }
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
            "Logo Gigs Form"
          ),
          React.createElement(
            "p",
            { className: "text-gray-600" },
            "Create your logo design service offering"
          ),
          // Quality toggle for logos
          React.createElement(
            "div",
            { className: "mt-4 flex items-center justify-center gap-4" },
            React.createElement(
              "label",
              { className: "flex items-center gap-2" },
              React.createElement("input", {
                type: "checkbox",
                checked: useHighQuality,
                onChange: (e) => setUseHighQuality(e.target.checked),
                className: "w-4 h-4 text-blue-600"
              }),
              React.createElement(
                "span",
                { className: "text-sm text-gray-700" },
                "🎨 High Quality Mode (PNG format - Best for logos)"
              )
            )
          ),
          logoGigs.length > 0 && React.createElement(
            "p",
            { className: "text-sm text-gray-500 mt-2" },
            `📦 Current logos: ${logoGigs.length} | 💾 Storage: ${(JSON.stringify(logoGigs).length / 1024).toFixed(2)} KB / 5000 KB`
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
                "Logo Title*"
              ),
              React.createElement("input", {
                type: "text",
                id: "title",
                name: "title",
                value: formData.title,
                onChange: handleChange,
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                required: true,
                placeholder: "e.g., Modern Logo Design, Minimalist Logo, etc."
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
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "Your freelance name"
              })
            ),
            // Rating
            React.createElement(
              "div",
              null,
              React.createElement(
                "label",
                { htmlFor: "rating", className: "block text-sm font-medium text-gray-700 mb-1" },
                "Rating (0-5 stars)"
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
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "4.8"
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
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "127"
              })
            ),
            // Image Upload
            React.createElement(
              "div",
              { className: "sm:col-span-2" },
              React.createElement(
                "label",
                { htmlFor: "image", className: "block text-sm font-medium text-gray-700 mb-1" },
                "Logo Image (Max 10MB - PNG recommended for best quality)"
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
                "⏳ Processing logo image... (preserving quality)"
              ),
              formData.image && React.createElement(
                "div",
                { className: "mt-2" },
                React.createElement("img", {
                  src: formData.image,
                  alt: "Logo Preview",
                  className: "h-48 object-contain border rounded", // Larger preview for logos
                  style: { maxWidth: '100%' }
                }),
                React.createElement(
                  "p",
                  { className: "text-xs text-gray-500 mt-1" },
                  `📏 Size: ${(formData.image.length / 1024).toFixed(2)} KB | ${useHighQuality ? '🎨 High Quality (PNG)' : '📸 Standard Quality'}`
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
                "Price ($)*"
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
                required: true,
                placeholder: "99.99"
              })
            ),
            // About
            React.createElement(
              "div",
              { className: "sm:col-span-2" },
              React.createElement(
                "label",
                { htmlFor: "about", className: "block text-sm font-medium text-gray-700 mb-1" },
                "About Your Logo Design Service"
              ),
              React.createElement("textarea", {
                id: "about",
                name: "about",
                rows: "4",
                value: formData.about,
                onChange: handleChange,
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "Describe your logo design style, process, and what clients can expect..."
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
              "Clear Form"
            ),
            React.createElement(
              "button",
              {
                onClick: handleUpload,
                disabled: isUploading,
                className: "px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
              },
              isUploading ? "Processing..." : "Upload Logo Service"
            )
          )
        ),
        // Existing Gigs List
        logoGigs.length > 0 &&
          React.createElement(
            "div",
            { className: "bg-white shadow rounded-lg p-6" },
            React.createElement(
              "h2",
              { className: "text-lg font-medium text-gray-900 mb-4" },
              `Your Logo Design Gigs (${logoGigs.length})`
            ),
            React.createElement(
              "div",
              { className: "space-y-4" },
              logoGigs.map((gig) =>
                React.createElement(
                  "div",
                  { key: gig.id, className: "border rounded-lg p-4 flex justify-between items-start hover:shadow-md transition-shadow" },
                  React.createElement(
                    "div",
                    { className: "flex space-x-4" },
                    gig.image &&
                      React.createElement(
                        "div",
                        { className: "flex-shrink-0" },
                        React.createElement("img", {
                          src: gig.image,
                          alt: gig.title,
                          className: "h-24 w-24 object-contain border rounded", // Larger preview for logos
                        })
                      ),
                    React.createElement(
                      "div",
                      null,
                      React.createElement(
                        "h3",
                        { className: "font-medium text-gray-900 text-lg" },
                        gig.title
                      ),
                      React.createElement(
                        "p",
                        { className: "text-sm text-gray-500" },
                        gig.name && `🎨 By ${gig.name}`
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
                        gig.level && `📊 Level: ${gig.level}`
                      ),
                      React.createElement(
                        "p",
                        { className: "font-medium text-xl text-blue-600 mt-1" },
                        gig.price && `$${gig.price}`
                      ),
                      gig.about && React.createElement(
                        "p",
                        { className: "text-sm text-gray-600 mt-2 line-clamp-2" },
                        gig.about.substring(0, 100) + (gig.about.length > 100 ? "..." : "")
                      )
                    )
                  ),
                  React.createElement(
                    "button",
                    {
                      onClick: () => handleDelete(gig.id),
                      className: "text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded hover:bg-red-50"
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

export default FreelancerLogo;