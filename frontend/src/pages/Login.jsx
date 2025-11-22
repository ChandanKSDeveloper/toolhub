import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      login({ email, password });
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-sm bg-[#0d0d0d] text-white p-7 rounded-2xl border border-white/10 shadow-[0_0_35px_rgba(0,0,0,0.8)]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-extrabold flex items-center gap-1">
            <span className="text-white">Tool</span>
            <span className="bg-[#ff9000] px-2 py-0.5 rounded text-black">
              hub
            </span>
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-1 text-center">
          Member Log In
        </h2>
        <p className="text-gray-400 text-center text-sm mb-5">
          Access your ToolHub account
        </p>

        {/* Social Login */}
        <div className="flex gap-3 mb-5">
          <button
            type="button"
            className="flex-1 flex items-center justify-center bg-white text-black py-2 rounded-md text-sm font-medium"
          >
            <FaGoogle size={18} />
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center bg-white text-black py-2 rounded-md text-sm font-medium"
          >
            <FaXTwitter size={18} />
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center bg-white text-black py-2 rounded-md text-sm font-medium"
          >
            <FaDiscord size={18} />
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <span className="flex-1 h-px bg-gray-700"></span>
          <span className="text-gray-400 text-sm">OR</span>
          <span className="flex-1 h-px bg-gray-700"></span>
        </div>

        {/* Email */}
        <input
          className="w-full bg-[#111] border border-gray-700 p-3 rounded-md mb-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#ff9000]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          className="w-full bg-[#111] border border-gray-700 p-3 rounded-md mb-5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#ff9000]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Login Button */}
        <button
          className="bg-[#ff9000] hover:bg-[#e58300] w-full py-2.5 rounded-md font-semibold text-black transition-colors"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#ff9000] cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
