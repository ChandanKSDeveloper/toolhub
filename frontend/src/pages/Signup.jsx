import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Save user credentials (dummy system)
    localStorage.setItem("credentials", JSON.stringify({ email, password }));
    login(email);
    navigate("/");
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl mb-4 font-bold">Sign Up</h2>
      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-purple-600 text-white w-full p-2 rounded">Sign Up</button>
    </form>
  );
};

export default Signup;
