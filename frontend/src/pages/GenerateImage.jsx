import React, { useState } from "react";
import { motion } from "framer-motion";

const GenerateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return alert("Enter a prompt!");

    setLoading(true);
    setImage(null);

    try {
      const res = await fetch("http://localhost:4000/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!data.photo) return alert("Generation failed.");

      setImage(data.photo);
    } catch (err) {
      console.error(err);
      alert("Error generating image.");
    } finally  {

      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = `generated_${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen w-full bg-[#050507] text-white flex flex-col items-center p-6 relative overflow-hidden">

      {/* Background Lights */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-purple-700 blur-[140px] opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-blue-500 blur-[150px] opacity-20"></div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold mb-10 tracking-wide text-center drop-shadow-[0_0_15px_rgba(129,0,255,0.8)]"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">
          ToolHub AI
        </span>
        <br />
        Image Generator
      </motion.h1>

      {/* Input Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl p-6 rounded-2xl bg-[#0a0b10] border border-purple-700/30 shadow-[0_0_25px_rgba(129,0,255,0.2)]"
      >
        <input
          type="text"
          placeholder="Describe something magical, futuristic, anime, cinematic..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-4 text-lg text-white bg-black/40 rounded-xl border border-gray-600 outline-none focus:border-purple-500 transition"
        />

        <button
          onClick={generate}
          disabled={loading}
          className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 shadow-[0_0_20px_rgba(129,0,255,0.5)] hover:shadow-[0_0_40px_rgba(129,0,255,0.8)] transition-all font-bold"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </motion.div>

      {/* Preview */}
      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10 p-4 rounded-2xl bg-[#090a12] border border-purple-700/40 shadow-[0_0_35px_rgba(129,0,255,0.3)]"
        >
          <img
            src={image}
            className="max-w-xl rounded-xl shadow-[0_0_25px_rgba(129,0,255,0.4)]"
          />

          <button
            onClick={downloadImage}
            className="mt-6 w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl shadow-[0_0_20px_rgba(0,255,140,0.6)] transition-all font-semibold"
          >
            Download
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default GenerateImage;
