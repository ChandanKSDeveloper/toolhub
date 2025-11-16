import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Load user from token on refresh ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:4000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => logout());
    }
    setLoading(false);
  }, []);

  // --- Signup user ---
  const signup = async (details) => {
    try {
      const res = await axios.post("http://localhost:4000/api/user/register", details);

      localStorage.setItem("token", res.data.token);

      setUser(res.data.user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // --- Login user ---
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("http://localhost:4000/api/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      setUser(res.data.user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // --- Logout user ---
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
