import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import websiteImg from "../photos/flwebsite.png";
import logoImg from "../photos/logo.png";
import seoImg from "../photos/sec.png";
import FreelancerNavbar from "../components/freelancerNavbar";





// ... (imports remain the same)

function Dashboard() {
  const navigate = useNavigate();
  const navigateToLogo = () => navigate("/freelancerLogo");
  const navigateToWebsite = () => navigate("/freelancerWebsite");
  const navigateToSEO = () => navigate("/freelancerSeo");

  return (
    <div className="min-h-screen bg-gray-50 ">
      <FreelancerNavbar />
      


      {/* Typewriter Heading Section */}
      <div className="text-center pt-40 pb-2 px-14">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-bold mb-4 leading-tight">
            <span className="text-black text-xl sm:text-2xl md:text-3xl">My </span>
            <span className="text-blue-600 text-4xl sm:text-5xl md:text-6xl">WorkWagon </span>
            <span className="text-black text-xl sm:text-2xl md:text-3xl">Projects</span>
          </h1>
        </motion.div>

        <h2 className="text-base sm:text-lg md:text-xl text-black h-16 mb-8">
          <Typewriter
            words={[
              "Your Success Starts Here",
              "Work with Clients Worldwide",
              "Manage. Grow. Repeat",
              "Get Paid Faster",
              "Showcase What You Offer",
              "Your Schedule, Your Rules",
              "Land Your Dream Projects",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h2>
      </div>

      {/* Gigs Section */}
      <section className="px-6 md:px-10 lg:px-20 py-2 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Website Gig */}
          <div
            onClick={navigateToWebsite}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300 cursor-pointer"
          >
            <img
              src={websiteImg}
              alt="Website Gig"
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Website Design</h3>
            </div>
          </div>

          {/* Logo Gig */}
          <div
            onClick={navigateToLogo}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300 cursor-pointer"
          >
            <img
              src={logoImg}
              alt="Logo Gig"
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Logo Design</h3>
            </div>
          </div>

          {/* SEO Gig */}
          <div
            onClick={navigateToSEO}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300 cursor-pointer"
          >
            <img
              src={seoImg}
              alt="SEO Gig"
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Search Engine Optimization</h3>
            </div>
          </div>
        </div>

<footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 mt-20">
  <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
    
    {/* Message Section */}
    <a href="/messages" className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-blue-100 rounded-lg mr-3">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Messages</h2>
      </div>
      <div className="space-y-3">
        <p className="text-gray-600">Connect with your clients through our messaging system</p>
        <div className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
          View Messages
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>

    {/* Analysis Section */}
    <a href="/analysis" className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-green-100 rounded-lg mr-3">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Performance Analysis</h2>
      </div>
      <div className="space-y-3">
        <p className="text-gray-600">Track your project performance and growth metrics</p>
        <div className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center">
          View Analytics
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>

  </div>
  <div className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} WorkWagon. All rights reserved.
  </div>
</footer>


      </section>

    </div>
  );
}




export default Dashboard;
