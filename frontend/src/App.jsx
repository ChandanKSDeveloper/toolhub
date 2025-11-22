import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import GenerateImage from "./pages/GenerateImage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './App.css'
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import FooterSection from "./components/FooterSection"
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <AuthProvider>

      <BrowserRouter>
        <div className="min-h-screen bg-[#0d0d0d] text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/generate-image" element={<GenerateImage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutPage />} />

          </Routes>
<FooterSection />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
