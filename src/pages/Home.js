import React from "react";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom"; 
import Footer from '../components/Footer';
import Chatbot from './chatbot';
import websiteImg from "../photos/Websitegigs.png";
import logoImg from "../photos/LOGOgigs.png";
import seoImg from "../photos/SEOgigs.png";




function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
     const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };


    const navigateToLogo = () => navigate("/logogigs");
    const navigateToWebsite = () => navigate("/website");
    const navigateToSEO = () => navigate("/SEO");




  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-sans">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-blue-600">
        <h1 className="text-2xl font-bold text-white">WorkWagon</h1>
        <div className="flex items-center gap-4">
          <span>Hello, {user?.username || "User"}</span>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition flex items-center gap-1"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-blue-600 text-white text-center py-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-4"
        >
          Welcome to WorkWagon 🚀
        </motion.h2>
            <h2 className="text-xl text-black h-16 mb-8">
          <Typewriter
            words={[
              "Make Your Brand Unforgettable",
              "Get Seen First with Our SEO",
              "Designed for Humans, Not Robots",
              "Everything Your Business Needs",
              "Quality Work. Lightning Fast",
              "Premium Services, Pocket-Friendly",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={40}
            delaySpeed={2000}
          />
          </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="text"
            placeholder="Search for gigs"
            className="px-4 py-2 rounded text-black"
          />
          <button className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded">
            Browse Gigs
          </button>
        </div>
      </div>



{/* Banner Images */}
<div className="w-full px-4 mt-10 flex flex-col gap-4 items-center">

  {/* Top Row - 2 Images */}
  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
    <img
      src={require("../photos/banner-1.png")}
      alt="Banner 1"
      className="w-full sm:w-1/2 h-auto rounded-lg shadow"
    />
    <img
      src={require("../photos/banner-2.png")}
      alt="Banner 2"
      className="w-full sm:w-1/2 h-auto rounded-lg shadow"
    />
  </div>

  {/* Bottom Row - Single Image Full Width */}
  {/* <img
    src={require("../photos/banner-3.png")}
    alt="Banner 3"
    className="w-full sm:w-1/2 h-auto rounded-lg shadow"
  /> */}

</div>







{/* Gigs Section */}

  <div className="py-10 px-4">
        <h3 className="text-2xl font-semibold text-center mb-6">
          Popular Categories
        </h3>
      <section className="px-6 md:px-10 lg:px-20 py-2 ">
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
              <h3 className="text-lg font-semibold text-gray-800">WEBSITE</h3>
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
              <h3 className="text-lg font-semibold text-gray-800"> LOGO </h3>
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
              <h3 className="text-lg font-semibold text-gray-800">SEO </h3>
            </div>
          </div>
        </div>
      </section>
      </div>










      {/* Categories
  <div className="py-10 px-4">
        <h3 className="text-2xl font-semibold text-center mb-6">
          Popular Categories
        </h3>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center items-center max-w-5xl mx-auto">
          {["Logo Design", "Web Development", "Search Engine Optimization"].map((cat, index) => (
         <div
                  key={index}
                  onClick={() => {
          // Redirect based on category name
                  if (cat === "Web Development") navigate("/website");
                  else if (cat === "Logo Design") navigate("/logogigs");
                  else if (cat === "Search Engine Optimization") navigate("/SEO");
          // Add more conditions for other categories...
          }}
           className="bg-white p-4 rounded shadow flex flex-col items-center cursor-pointer hover:bg-gray-100 transition">
           <div className="text-4xl mb-2">📦</div>
          <span>{cat}</span>
        </div>
            ))}
     </div>
  </div>
 */}








    <div className="bg-white py-10 px-4">
      <h3 className="text-2xl font-semibold text-center mb-6">Client Feedback</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Testimonial 1 */}
        <div className="bg-gray-100 p-6 rounded shadow hover:shadow-lg transition h-full flex flex-col">
          <div className="flex items-center mb-4">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Sarah Johnson" 
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div>
              <p className="font-medium">Sarah Johnson</p>
              <p className="text-sm text-gray-600">Marketing Director</p>
            </div>
          </div>
          <p className="text-gray-700">
            "Workwagon helped us find the perfect freelancer for our rebranding project. 
            The platform made it so easy to connect with talented designers, and the results 
            exceeded all our expectations. Workwagon is now our go-to solution for all creative needs!"
          </p>
          <div className="flex mt-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-gray-100 p-6 rounded shadow hover:shadow-lg transition h-full flex flex-col">
          <div className="flex items-center mb-4">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Michael Chen" 
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div>
              <p className="font-medium">Michael Chen</p>
              <p className="text-sm text-gray-600">Startup Founder</p>
            </div>
          </div>
          <p className="text-gray-700">
            "I was struggling to find reliable developers until I discovered Workwagon. 
            Their platform connected me with a web developer who built our eCommerce site 
            in record time. Workwagon's vetting process really shows in the quality of their freelancers!"
          </p>
          <div className="flex mt-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-gray-100 p-6 rounded shadow hover:shadow-lg transition h-full flex flex-col">
          <div className="flex items-center mb-4">
            <img 
              src="https://randomuser.me/api/portraits/women/68.jpg" 
              alt="Emily Rodriguez" 
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div>
              <p className="font-medium">Emily Rodriguez</p>
              <p className="text-sm text-gray-600">Content Manager</p>
            </div>
          </div>
          <p className="text-gray-700">
            "Workwagon saved us so much time and money! Their SEO content writers helped 
            boost our organic traffic by 150% in just 3 months. The Workwagon platform 
            makes managing projects and payments completely hassle-free. Can't recommend enough!"
          </p>
          <div className="flex mt-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>







      {/* How It Works */}
      <div className="py-10 px-4 bg-gray-50">
        <h3 className="text-2xl font-semibold text-center mb-6">
          How It Works
        </h3>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-center">
          <div>
            <div className="text-3xl mb-2">📣</div>
            <p>Post a job / Find a gig</p>
          </div>
          <div>
            <Link to="/freelancer-login">
            <div className="text-3xl mb-2">👨‍💻</div>
            <p>freelancer</p>
            </Link>
          </div>
          <div>
            <div className="text-3xl mb-2">📦</div>
            <p>Get your work delivered</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div> <Chatbot /></div>
      <div><Footer /></div>
            

    </div>
  );
}

  

export default Home;
