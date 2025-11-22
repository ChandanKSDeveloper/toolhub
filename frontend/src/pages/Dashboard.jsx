import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UploadModal from "../components/UploadModal";

import mergeIcon from "../assets/merge.png";
import jpgPdfIcon from "../assets/jpg-to-pdf.png";
import compressIcon from "../assets/compress-pdf.png";
import aiGenIcon from "../assets/ai-generate.webp";
import upscaleImg from "../assets/upscale-img.png";

// 🎃 PornHub + ToolHub theme colors
const neon = {
  glow: "shadow-[0_0_20px_#ff7a1a]",
  orange: "from-orange-500 to-yellow-400",
};

const tools = [
  { id: 1, name: "Merge PDF", desc: "Combine PDFs quickly.", type: "merge", category: "pdf", icon: mergeIcon },
  { id: 2, name: "JPG to PDF", desc: "Convert JPG to PDF instantly.", type: "imagepdf", category: "pdf", icon: jpgPdfIcon },
  { id: 3, name: "Compress PDF", desc: "Reduce size without losing quality.", type: "compress", category: "pdf", icon: compressIcon, badge: "Updated" },
  { id: 4, name: "Upscale Image", desc: "Improve resolution with AI.", type: "upscale", category: "image", icon: upscaleImg, badge: "New" },
  { id: 5, name: "AI Image Generator", desc: "Create images using prompts.", route: "/generate-image", category: "ai", icon: aiGenIcon },
  { id: 6, name: "WEBP → PNG", desc: "Convert webp to png.", type: "webp2png", category: "image", icon: aiGenIcon },

  // ⭐ Extra Tools (Filling your dashboard)
  { id: 7, name: "Remove Background", desc: "Erase background using AI.", type: "remove-bg", category: "ai", badge: "Upcoming", icon: aiGenIcon },
  { id: 8, name: "PDF Splitter", desc: "Split large PDFs into smaller files.", type: "split", category: "pdf", badge: "Upcoming", icon: mergeIcon },
  { id: 9, name: "Colorize Image", desc: "Turn B&W photos into color.", type: "colorize", category: "ai", icon: upscaleImg, badge: "New" },
  { id: 10, name: "Image Sharpener", desc: "Fix blurry images.", type: "sharp", category: "image", badge: "Upcoming", icon: upscaleImg },
];

const Dashboard = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const handleToolClick = (tool) => {
    if (tool.route) {
      navigate(tool.route);
      return;
    }
    setActiveFeature(tool);
  };

  const filteredTools =
    filter === "all" ? tools : tools.filter((t) => t.category === filter);

  return (
    <div className="bg-black min-h-screen text-white px-4 pb-20 relative overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-600 blur-[150px] opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-500 blur-[160px] opacity-10"></div>

      {/* HEADER */}
      <section className="pt-16 text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Your Digital <span className="text-orange-400">ToolHub</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 mt-4 text-lg"
        >
          File tools. AI tools. Creative tools.  
          <br />
          All inside your browser — fast, private, modern.
        </motion.p>
      </section>

      {/* FILTER BUTTONS */}
      <div className="flex gap-4 justify-center mt-12">
        {["all", "pdf", "image", "ai"].map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.9 }}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full transition-all border
              ${
                filter === cat
                  ? "bg-orange-400 border-orange-600 text-black shadow-[0_0_12px_#ff7a1a]"
                  : "border-orange-500 text-orange-300 hover:text-orange-400"
              }`}
          >
            {cat.toUpperCase()}
          </motion.button>
        ))}
      </div>

      {/* TOOL GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
        {filteredTools.map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ scale: 1.04, translateY: -4 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => handleToolClick(tool)}
            className="cursor-pointer p-6 rounded-xl bg-[#0d0d0d] border border-orange-700/20 hover:border-orange-500 transition-all shadow-lg hover:shadow-[0_0_18px_#ff7a1a]"
          >
            <div className="flex items-center gap-4">
              <img src={tool.icon} className="w-14 h-14 rounded-md" />

              <div>
                <h3 className="text-xl font-bold">{tool.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{tool.desc}</p>
              </div>
            </div>

            {/* BADGE */}
            {tool.badge && (
              <span
                className={`inline-block mt-4 px-3 py-1 text-xs rounded-full font-semibold
                ${
                  tool.badge === "Upcoming"
                    ? "bg-gray-700 text-gray-200"
                    : tool.badge === "New"
                    ? "bg-green-600"
                    : "bg-blue-600"
                }`}
              >
                {tool.badge}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      {activeFeature && (
        <UploadModal
          feature={activeFeature}
          onClose={() => setActiveFeature(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
