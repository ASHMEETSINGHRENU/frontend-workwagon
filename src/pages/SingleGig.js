import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const SingleLogoGig = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedGigs = localStorage.getItem("websiteGigs");
    if (savedGigs) {
      const gigs = JSON.parse(savedGigs);
      const foundGig = gigs.find(g => g.id.toString() === id);
      setGig(foundGig);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          <div className="text-center mt-20 text-red-500 text-xl font-semibold">
            Gig not found!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
          {gig.title}
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              {gig.img && (
                <img
                  src={gig.img}
                  alt="Gig"
                  className="w-full h-auto rounded-lg shadow"
                />
              )}
            </div>

            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">{gig.name}</h2>
              <p className="text-yellow-500 text-lg font-medium">
                ⭐ {gig.rating} <span className="text-gray-600">({gig.reviews} reviews)</span>
              </p>
              <p className="text-sm text-gray-600">{gig.level}</p>
              <div className="text-xl text-green-600 font-bold mt-4">{gig.price}</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">About this Gig</h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{gig.about}</p>
          </div>

          <div className="mt-10 flex justify-center flex-wrap gap-4">
            <a
              href="/contact_me"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition duration-300"
            >
              Connect With Us
            </a>
            <button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold shadow-md hover:from-green-600 hover:to-green-500 transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleLogoGig;