import React, { useState } from "react";
import UploadModal from "../components/UploadModal";
import { useNavigate } from "react-router-dom";
import ToolSection from "../components/ToolSection";
import mergeIcon from "../assets/merge.png"
import jpgPdfIcon from "../assets/jpg-to-pdf.png"
import compressIcon from "../assets/compress-pdf.png"
import aiGenIcon from "../assets/ai-generate.webp"
import upscaleImg from "../assets/upscale-img.png"

// ✅ Placeholders — you will add icons later
const tools = [
  {
    id: 1,
    name: "Merge PDF",
    desc: "Combine PDFs in your preferred order.",
    type: "merge",
    category: "pdf",
    icon: mergeIcon
  },
  {
    id: 2,
    name: "JPG to PDF",
    desc: "Convert JPG images to PDF instantly.",
    type: "imagepdf",
    category: "pdf",
    icon: jpgPdfIcon
  },
  {
    id: 3,
    name: "Compress PDF",
    desc: "Reduce PDF file size while retaining quality.",
    type: "compress",
    category: "pdf",
    icon: compressIcon
  },
  {
    id: 4,
    name: "Upscale Image",
    desc: "Enhance and upscale image resolution.",
    type: "upscale",
    category: "image",
    badge: "New!",
    icon: upscaleImg
  },
  {
    id: 5,
    name: "Generate AI Image",
    desc: "Create beautiful images with AI prompts.",
    route: "/generate-image",
    category: "ai",
    icon: aiGenIcon
  },
  {
    id: 6,
    name: "Webp to Png",
    desc: "Convert webp to png with simple click.",
    route: "/convert_webp_to_png",
    category: "image",
    type: "webp2png",
    icon: aiGenIcon
  },
];

const Dashboard = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const handleToolClick = (tool) => {
    // If it has a route → navigate
    if (tool.route) {
      navigate(tool.route);
      return;
    }

    // Otherwise → open modal (upload feature)
    setActiveFeature(tool);
  };

  const filteredTools = filter === "all" ? tools : tools.filter(t => t.category === filter);


  return (
    <div className="bg-black min-h-screen">

    <section className="w-full max-w-6xl mx-auto px-4 py-12 text-center">
       {/* Headings */}
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        Smarter tools for your files and creativity.
      </h2>
      <p className="text-gray-300 mt-3 max-w-3xl mx-auto text-sm md:text-base">
        Work with PDFs, edit photos, or generate new images — all inside your browser.
      </p>
    </section>

      <div className="flex gap-4 justify-center mb-6">
        {
          ["all", "pdf", "image", "ai"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full border transition-all ${filter === cat
                  ? " bg-orange-400 border-orange-600 shadow-[0_0_10px_#ff751a]"
                  : "border-orange-500 hover:border-orange-400 hover:text-orange-300"
                }`}
            >
 {cat.toUpperCase()}
            </button>
          ))
        }
      </div>

      <ToolSection tools={filteredTools} onSelect={handleToolClick} />

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
