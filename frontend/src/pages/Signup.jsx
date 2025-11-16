import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // added username
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // Save token + user to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update global auth
      login(data.user);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <form
        onSubmit={handleSignup}
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

      {/* Title */}
      <h2 className="text-lg font-semibold mb-1">Create Your Account</h2>
      <p className="text-gray-400 text-sm mb-4">Join ToolHub today</p>

      {/* Username */}
      <input
        className="w-full bg-black border border-gray-700 p-2 rounded-md mb-3 text-sm text-white placeholder-gray-400"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Email */}
      <input
        className="w-full bg-black border border-gray-700 p-2 rounded-md mb-3 text-sm text-white placeholder-gray-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        className="w-full bg-black border border-gray-700 p-2 rounded-md mb-4 text-sm text-white placeholder-gray-400"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Signup Button */}
      <button
        className="bg-purple-600 hover:bg-purple-700 w-full py-2 rounded-md font-medium"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      {/* Footer */}
      <p className="text-center text-gray-400 text-sm mt-3">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-purple-400 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </form>
  </div>
  );
};

export default Signup;
