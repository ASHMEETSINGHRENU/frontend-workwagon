import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from '../components/Footer';

export default function SEOGigs() {
  const [gigs, setGigs] = useState([]);

  // Load gigs from localStorage
  useEffect(() => {
    const savedGigs = localStorage.getItem("seoGigs");
    if (savedGigs) {
      setGigs(JSON.parse(savedGigs));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="p-4 sm:p-8 flex-grow">
        <h2 className="text-2xl font-bold text-center mb-6">
          Top Freelancers for SEO Gigs
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 mb-12 px-4">
          {gigs.map((gig) => (
            <div key={gig.id} className="relative">
              <Link to={`/SEO/${gig.id}`}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  {gig.img && (
                    <img
                      src={gig.img}
                      alt={gig.name}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">{gig.name}</span>
                      <span className="text-sm text-gray-600">{gig.level}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{gig.title}</p>
                    <div className="text-sm text-gray-600 flex justify-between items-center">
                      <span>
                        ⭐ {gig.rating} ({gig.reviews})
                      </span>
                      <span className="font-semibold">{gig.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}