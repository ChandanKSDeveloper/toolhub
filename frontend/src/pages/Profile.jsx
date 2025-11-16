import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  // token from login
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserData();
    fetchHistory();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/user/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHistory(res.data.history);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/user/upload-${type}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser({ ...user, [type]: res.data.url });
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Banner */}
      <div className="relative">
        <img
          src={user.banner || "https://via.placeholder.com/800x200"}
          className="w-full h-48 object-cover rounded-xl"
        />

        <label className="absolute top-3 right-3 bg-white px-3 py-1 rounded cursor-pointer shadow">
          Edit Banner
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => uploadImage(e, "banner")}
          />
        </label>
      </div>

      {/* Profile Section */}
      <div className="flex items-center mt-6 space-x-4">
        <label className="cursor-pointer relative">
          <img
            src={user.avatar || "https://via.placeholder.com/100"}
            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
          />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => uploadImage(e, "avatar")}
          />
        </label>

        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* History */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">API Usage History</h3>

        <div className="bg-white rounded-lg p-4 shadow">
          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">No API calls yet.</p>
          ) : (
            <ul className="space-y-3">
              {history.map((item, index) => (
                <li key={index} className="border-b pb-2">
                  <p className="font-semibold">{item.operation.toUpperCase()}</p>

                  <p className="text-sm text-gray-600">
  File: {item.fileName} ({item.fileSize} KB)
</p>

<p className="text-xs text-gray-500">
  {new Date(item.uploadDate).toLocaleString()}
</p>


                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
