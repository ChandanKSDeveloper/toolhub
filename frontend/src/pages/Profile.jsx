import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEdit,
} from "react-icons/fa";

const fallbackBanner =
  "https://res.cloudinary.com/dummyimage/banner-default.jpg";
const fallbackAvatar =
  "https://res.cloudinary.com/dummyimage/avatar-default.png";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userRes = await axios.get(
        "http://localhost:4000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const historyRes = await axios.get(
        "http://localhost:4000/api/user/history",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(userRes.data.user);
      setHistory(historyRes.data.history);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Upload Avatar / Banner
  const uploadImage = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(type, file);

    try {
      const res = await axios.put(
        `http://localhost:4000/api/user/${type}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update user state
      setUser((prev) => ({
        ...prev,
        [type === "avatar" ? "avatar" : "coverImage"]:
          type === "avatar" ? res.data.avatar : res.data.coverImage,
      }));
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    }
  };

  if (loading) return <p className="text-center p-10 text-white">Loading...</p>;

  if (!user)
    return (
      <p className="text-center p-10 text-gray-300">
        Could not load profile.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">

      {/* ================= COVER IMAGE ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <img
          src={user.coverImage || fallbackBanner}
          className="w-full h-56 md:h-64 object-cover rounded-xl shadow-[0_0_15px_#ff7f1a70]"
        />

        {/* Change Banner Button */}
        <label className="absolute top-3 right-3 bg-orange-500 px-4 py-2 rounded-lg cursor-pointer text-black font-semibold flex items-center gap-2 shadow-lg hover:bg-orange-600 transition">
          <FaEdit /> Change Cover
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => uploadImage(e, "cover")}
          />
        </label>
      </motion.div>

      {/* ================= PROFILE INFO ================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-center gap-6 mt-6"
      >
        <div className="relative w-fit">
          <img
            src={user.avatar || fallbackAvatar}
            className="w-28 h-28 rounded-full border-4 border-orange-500 shadow-[0_0_20px_#ff7f1a90] object-cover"
          />

          {/* Change Avatar Button */}
          <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer shadow-lg hover:bg-orange-600 transition">
            <FaEdit className="text-black" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => uploadImage(e, "avatar")}
            />
          </label>
        </div>

        <div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-400">{user.email}</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-3 text-orange-400 text-xl">
            <a href="#" className="hover:text-orange-500">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-orange-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-orange-500">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-orange-500">
              <FaGithub />
            </a>
          </div>
        </div>
      </motion.div>

      {/* ================= HISTORY ================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-10"
      >
        <h3 className="text-xl font-semibold mb-3">API Usage History</h3>

        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-orange-600 shadow-[0_0_20px_#ff7f1a40]">
          {history.length === 0 ? (
            <p className="text-gray-400 text-sm">No API calls yet.</p>
          ) : (
            <ul className="space-y-4">
              {history.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-b border-gray-700 pb-3"
                >
                  <p className="font-semibold text-orange-400">
                    {item.operation.toUpperCase()}
                  </p>

                  <p className="text-gray-300 text-sm">
                    Files: {Array.isArray(item.fileName) ? item.fileName.join(", ") : item.fileName}
                    <br />
                    Size: {(item.fileSize / 1024).toFixed(2)} KB
                  </p>


                  <p className="text-gray-500 text-xs">
                    {new Date(item.uploadDate).toLocaleString()}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
