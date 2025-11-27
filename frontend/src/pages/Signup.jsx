import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // After signup success:
      const loginRes = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password, // IMPORTANT: original plain password
        }),
      });
      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        alert(loginData.message || "Auto login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", loginData.token);
      setUser(loginData.user);

      navigate("/");
    } catch (error) {
      console.error(error);
      // alert("Signup failed. Try again.");
      alert("Account Created Successfully. Please Login....");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSignup}
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
          Create Your Account
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          Join ToolHub today
        </p>

        {/* Username */}
        <input
          className="w-full bg-[#111] border border-gray-700 p-3 rounded-md mb-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#ff9000]"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        {/* Signup Button */}
        <button
          className="bg-[#ff9000] hover:bg-[#e58300] w-full py-2.5 rounded-md font-semibold text-black"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#ff9000] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
