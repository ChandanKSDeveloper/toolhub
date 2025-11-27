import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UploadModal = ({ feature, onClose }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveHistory = (action, fileNames) => {
    const prev = JSON.parse(localStorage.getItem("apiHistory")) || []
    const newEntry = {
      action,
      fileNames,
      time: new Date().toLocaleString(),
    };

    const updatedHistory = [newEntry, ...prev];

    localStorage.setItem("apiHistory", JSON.stringify(updatedHistory))
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please select at least one file!");

    const featureMap = {
      merge: {
        endpoint: "api/merge",
        allowMultiple: true,
        allowedFormats: ["pdf"],
      },
      compress: {
        endpoint: "api/compress",
        allowMultiple: false,
        allowedFormats: ["pdf"],
      },
      imagepdf: {
        endpoint: "api/image-to-pdf",
        allowMultiple: true,
        allowedFormats: ["jpg", "jpeg", "png", "webp"],
      },
      upscale: {
        endpoint: "api/upscale",
        allowMultiple: false,
        allowedFormats: ["jpg", "jpeg", "png", "webp"],
      },
      webp2png: {
        endpoint: "api/convert_webp_to_png",
        allowMultiple: false,
        allowedFormats: ["jpg", "jpeg", "png", "webp"],
      }
    };

    const config = featureMap[feature.type];
    if (!config) return alert("unknown feature");

    for (const file of files) {
      const ext = file.name.split('.').pop().toLowerCase();

      if (!config.allowedFormats.includes(ext)) {
        return alert(`Invalid file : ${file.name}. 
            Allowed formats : ${config.allowedFormats.join(", ")}
          `);
      }
    }

    setLoading(true);

    const formData = new FormData();

    if (config.allowMultiple) {
      files.forEach((file) => formData.append("files", file));
    } else {
      formData.append("file", files[0])
    }

    try {
      const res = await fetch(`http://localhost:4000/${config.endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "processing failed")
        return
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      let downloadName = (() => {
        const base = files[0].name.split(".")[0];

        switch (feature.type) {
          case "merge":
            return "merged.pdf";
          case "compress":
            return `${base}_compressed.pdf`;
          case "imagepdf":
            return "converted.pdf";
          case "upscale":
            return `${base}_upscaled.jpg`;
          case "webp2png":
            return `${base}.png`;
          default:
            return "download";
        }
      })();


      a.href = url;
      a.download = downloadName
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      const token = localStorage.getItem("token");
      await fetch("http://localhost:4000/api/user/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          {
            operation: feature.type,
            fileNames: files.map(f => f.name),
            fileSize: files.reduce((t, f) => t + f.size, 0),
            details: {
              count: files.length,
              feature: feature.name,
              names: files.map(f => f.name),
              sizes: files.map(f => f.size)
            }
          },
        )
      })

      saveHistory(feature.type, files.map(f => f.name));


    } catch (error) {
      console.error(error)
      alert("upload failed")
    } finally {
      setLoading(false);
      onClose();

    }
  };

  const labelText = {
    merge: "Select PDF files to merge:",
    compress: "Select a PDF to compress:",
    imagepdf: "Select image files to convert to PDF:",
    upscale: "Select an image to upscale:",
    webp2png: "Select a WebP image to convert to PNG:",

  }[feature.type];

const acceptTypes =
  feature.type === "merge" || feature.type === "compress"
    ? ".pdf"
    : feature.type === "webp2png"
    ? ".webp"
    : "image/*";


  const buttonText = {
    merge: "Merge PDF",
    compress: "Compress PDF",
    imagepdf: "Convert to PDF",
    upscale: "Upscale Image",
    toPng: "To png",
    pdfSplitter: "Split pdf",
    webp2png: "Convert to PNG",

  }[feature.type];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/10 border border-white/20 shadow-2xl p-6 rounded-2xl max-w-md w-full text-white relative overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          {/* Glow Border Animation */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent [mask-image:linear-gradient(white,transparent)] animate-border-glow"></div>

          <h2 className="text-3xl font-bold text-center mb-4">{feature.name}</h2>

          {loading ? (
            <div className="flex flex-col items-center py-10 space-y-3">
              {/* Loader Ring Animation */}
              <div className="loader-ring"></div>

              <p className="text-lg font-medium animate-pulse">
                Processing your file…
              </p>
            </div>
          ) : (
            <form onSubmit={handleUpload} className="space-y-4">
              <label className="block text-sm font-semibold">{labelText}</label>

              <input
                type="file"
                accept={acceptTypes}
                multiple={feature.type === "merge" || feature.type === "imagepdf"}
                onChange={(e) => setFiles(Array.from(e.target.files))}
                className="w-full bg-white/20 border border-white/30 p-2 rounded-lg outline-none"
              />


              {/* File Selected Preview */}
              {files.length > 0 && (
                <div className="bg-white/10 p-3 rounded-md max-h-28 overflow-y-auto border border-white/20">
                  {files.map((f, idx) => (
                    <p key={idx} className="text-sm opacity-90">
                      • {f.name}
                    </p>
                  ))}
                </div>
              )}

              <div className="flex space-x-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition text-white font-semibold"
                >
                  {buttonText}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition font-semibold"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UploadModal;
