import React, { useState } from "react";
import { FiMenu, FiX, FiLogIn, FiUser, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full bg-black text-white px-4 py-3 flex items-center justify-between shadow-md">

        {/* Hamburger (Mobile Only) */}
        <button
          className="text-orange-400 text-3xl md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <FiMenu />
        </button>

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold select-none cursor-pointer">
          Tool
          <span className="bg-orange-400 text-black px-2 py-1 rounded ml-1">
            hub
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
          <li><Link to="/generate-image" className="hover:text-orange-400 transition">Generate Image</Link></li>
        </ul>

        {/* Auth Section (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 hover:text-orange-400">
                <FiUser className="text-lg" /> {user.name || "Profile"}
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 hover:text-orange-400">
                <FiLogOut className="text-lg" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-orange-400">Login</Link>
              <Link
                to="/signup"
                className="bg-orange-400 text-black px-3 py-1 rounded hover:bg-orange-500 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Login Icon */}
        {!user && (
          <Link to="/login" className="md:hidden text-orange-400 text-2xl">
            <FiLogIn />
          </Link>
        )}
      </nav>

      {/* SIDEBAR (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full bg-black text-white w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-600">
          <Link to="/" onClick={() => setSidebarOpen(false)} className="text-xl font-bold">
            Tool<span className="bg-orange-400 text-black px-1 py-0.5 ml-1 rounded">hub</span>
          </Link>
          <button className="text-orange-400 text-3xl" onClick={() => setSidebarOpen(false)}>
            <FiX />
          </button>
        </div>

        {/* Menu Items */}
        <ul className="mt-4 space-y-4 px-4 text-lg">
          <li><Link to="/" onClick={() => setSidebarOpen(false)} className="hover:text-orange-400">Home</Link></li>
          <li><Link to="/generate-image" onClick={() => setSidebarOpen(false)} className="hover:text-orange-400">Generate Image</Link></li>

          {user ? (
            <>
              <li className="flex items-center gap-2 hover:text-orange-400">
                <FiUser />
                <Link to="/profile" onClick={() => setSidebarOpen(false)}>{user.name || "Profile"}</Link>
              </li>
              <li onClick={handleLogout} className="flex items-center gap-2 hover:text-orange-400 cursor-pointer">
                <FiLogOut /> Logout
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-2 hover:text-orange-400">
                <FiLogIn />
                <Link to="/login" onClick={() => setSidebarOpen(false)}>Login</Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  onClick={() => setSidebarOpen(false)}
                  className="block bg-orange-400 text-black px-3 py-1 rounded hover:bg-orange-500 transition w-fit"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
