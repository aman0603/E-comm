import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx"; // Import Footer
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore"; // Adjust the import path as necessary
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
function App() {
  const { user,checkAuth,checkingAuth } = useUserStore(); // Get user from store
  useEffect(() => { 
    checkAuth();
  }, [checkAuth]); // Check authentication on app load

  if(checkingAuth){
    return <LoadingSpinner />; // Show loading spinner while checking auth
  }
  return (
   <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/2 w-full h-full -translate-x-1/2"
            style={{
              background: "linear-gradient(to right, #1f4037, #99f2c8)",
            }}
          ></div>
        </div>
      </div>
      <div className="relative z-10">
        <Navbar />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={<HomePage />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
