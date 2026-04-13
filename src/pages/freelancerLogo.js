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

  // Load gigs
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

  const handleUpload = () => {
    // Required validation
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
      alert("All fields are required.");
      return;
    }

    // Numeric validation
    if (isNaN(formData.rating) || formData.rating < 1 || formData.rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }

    if (isNaN(formData.reviews) || formData.reviews < 0) {
      alert("Reviews must be valid");
      return;
    }

    if (isNaN(formData.price) || formData.price <= 0) {
      alert("Price must be valid");
      return;
    }

    // Safe image validation
    if (!formData.image || !formData.image.startsWith("data:image")) {
      alert("Upload a valid image");
      return;
    }

    const newGig = {
      id: Date.now(),
      img: formData.image,   // ✅ STANDARD KEY
      name: formData.name,
      level: formData.level,
      title: formData.title,
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
      price: `${parseFloat(formData.price).toFixed(2)}`,
      about: formData.about
    };

    try {
      const updated = [...logoGigs, newGig];
      localStorage.setItem("logoGigs", JSON.stringify(updated));
      setLogoGigs(updated);
      handleClear();
      alert("Logo gig uploaded!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error saving gig");
    }
  };

  const handleDelete = (id) => {
    const updated = logoGigs.filter(g => g.id !== id);
    setLogoGigs(updated);
    localStorage.setItem("logoGigs", JSON.stringify(updated));
  };

  return (
    <>
      <FreelancerNavbar />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">

          <h1 className="text-2xl font-bold mb-4 text-center">
            Logo Gigs Form
          </h1>

          {/* FORM */}
          <div className="bg-white p-6 rounded shadow">
            <input name="title" placeholder="Title"
              value={formData.title} onChange={handleChange} />

            <input name="name" placeholder="Name"
              value={formData.name} onChange={handleChange} />

            <input name="rating" placeholder="Rating"
              value={formData.rating} onChange={handleChange} />

            <input name="reviews" placeholder="Reviews"
              value={formData.reviews} onChange={handleChange} />

            <input type="file" onChange={handleImageUpload} />

            {formData.image && (
              <img
  src={formData.image}
  alt="Logo preview"
  className="h-20 mt-2"
/>
            )}

            <select name="level" value={formData.level} onChange={handleChange}>
              <option value="">Select Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>

            <input name="price" placeholder="Price"
              value={formData.price} onChange={handleChange} />

            <textarea name="about"
              value={formData.about} onChange={handleChange} />

            <div className="mt-4">
              <button onClick={handleUpload}>Upload</button>
              <button onClick={handleClear}>Clear</button>
            </div>
          </div>

          {/* LIST */}
          <div className="mt-6">
            {logoGigs.map(gig => (
              <div key={gig.id} className="border p-3 mb-3 flex justify-between">

                <div className="flex gap-3">
                  {(gig.img || gig.image) && (
                    <img
                      src={gig.img || gig.image}
                      className="h-16 w-16 object-contain"
                      alt=""
                    />
                  )}

                  <div>
                    <h3>{gig.title}</h3>
                    <p>{gig.name}</p>
                    <p>⭐ {gig.rating} ({gig.reviews})</p>
                    <p>{gig.level}</p>
                    <p>${gig.price}</p>
                  </div>
                </div>

                <button onClick={() => handleDelete(gig.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default FreelancerLogo;