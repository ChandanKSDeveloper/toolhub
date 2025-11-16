import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("email : ", email);
      

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Save JWT + User
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-[#111] text-white p-6 rounded-xl shadow-lg border border-white/10"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold flex items-center gap-1">
            <span className="text-white">Tool</span>
            <span className="bg-yellow-500 px-2 py-0.5 rounded text-black">hub</span>
          </h1>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-gray-300 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-1">Member Log In</h2>
        <p className="text-gray-400 text-sm mb-4">Access your ToolHub account</p>

        {/* Social Login Buttons */}
        <div className="flex gap-3 mb-4">
          <button type="button" className="flex-1 bg-white text-black py-2 rounded-md text-sm font-medium">
            Google
          </button>
          <button type="button" className="flex-1 bg-white text-black py-2 rounded-md text-sm font-medium">
            X
          </button>
          <button type="button" className="flex-1 bg-white text-black py-2 rounded-md text-sm font-medium">
            Discord
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="flex-1 h-px bg-gray-700"></span>
          <span className="text-gray-400 text-sm">OR</span>
          <span className="flex-1 h-px bg-gray-700"></span>
        </div>

        {/* Email Input */}
        <input
          className="w-full bg-black border border-gray-700 p-2 rounded-md mb-3 text-sm text-white placeholder-gray-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          className="w-full bg-black border border-gray-700 p-2 rounded-md mb-4 text-sm text-white placeholder-gray-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          className="bg-purple-600 hover:bg-purple-700 w-full py-2 rounded-md font-medium"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-3">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
