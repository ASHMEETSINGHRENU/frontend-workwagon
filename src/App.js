import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import WebsiteGigs from "./pages/WebsiteGigs";
import SingleGig from "./pages/SingleGig";
import ContactMe from "./pages/ContactMe";
import LogoGigs from "./pages/LogoGigs";
import SEOGigs from "./pages/SEOGigs";
import SingleLogoGig from "./pages/SingleLogoGig";
import SingleSEOGig from "./pages/SingleSEOGig";
import Freelancer from "./pages/freelancer";
import FreelancerRegistration from "./pages/freelancer.registration";
import FreelancerLogin from "./pages/freelancer.login";

import FreelancerLogo from './pages/freelancerLogo';
import Dashboards from './pages/Dashboards';

import FreelancerWebsite from './pages/freelancerWebsite';

import FreelancerSEO from './pages/FreelancerSEO';

import Analysis from "./pages/Analysis";


const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

const ProtectedRouteFreelancer = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/freelancer-login" />;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/website"
          element={
            <ProtectedRoute>
              <WebsiteGigs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/websitegigs/:id"
          element={
            <ProtectedRoute>
              <SingleGig />
            </ProtectedRoute>
          }
        />
      
<Route 
  path="/contact_me" 
  element={
    <ProtectedRoute>
      <ContactMe />
    </ProtectedRoute>
  }
/>

<Route 
  path="/logogigs" 
  element={
    <ProtectedRoute>
      <LogoGigs />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/SEO" 
  element={
    <ProtectedRoute>
      <SEOGigs />
    </ProtectedRoute>
  }
/>

<Route 
  path="/logogigs/:id" 
  element={
    <ProtectedRoute>
      <SingleLogoGig />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/SEO/:id" 
  element={
    <ProtectedRoute>
      <SingleSEOGig />
    </ProtectedRoute>
  }
/>


        <Route path="/freelancer" element={ <ProtectedRouteFreelancer><Freelancer /></ProtectedRouteFreelancer>} />
        <Route path="/freelancer-registration" element={ <FreelancerRegistration />} />
        <Route path="/freelancer-login" element={<FreelancerLogin />} />
        <Route path="/dashboard" element={ <ProtectedRouteFreelancer><Dashboards /></ProtectedRouteFreelancer>} />
        <Route path="/freelancerLogo" element={  <ProtectedRouteFreelancer><FreelancerLogo /></ProtectedRouteFreelancer>} />
        <Route path="/freelancerWebsite" element={<ProtectedRouteFreelancer><FreelancerWebsite /></ProtectedRouteFreelancer>} />
        <Route path="/freelancerSEO" element={<ProtectedRouteFreelancer><FreelancerSEO /></ProtectedRouteFreelancer>} />
        <Route path="/analysis" element={<ProtectedRouteFreelancer><Analysis /></ProtectedRouteFreelancer>} />




      </Routes>
    </Router>
  );
}

export default App;
