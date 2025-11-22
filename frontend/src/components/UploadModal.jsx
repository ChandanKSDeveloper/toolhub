import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UploadModal = ({ feature, onClose }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveHistory = () => {};

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please select at least one file!");

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 2500);
  };

  const labelText = {
    merge: "Select PDF files to merge:",
    compress: "Select a PDF to compress:",
    imagepdf: "Select image files to convert to PDF:",
    upscale: "Select an image to upscale:",
  }[feature.type];

  const acceptTypes =
    feature.type === "merge" || feature.type === "compress"
      ? ".pdf"
      : "image/*";

  const buttonText = {
    merge: "Merge PDF",
    compress: "Compress PDF",
    imagepdf: "Convert to PDF",
    upscale: "Upscale Image",
    toPng : "To png",
    pdfSplitter : "Split pdf"
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
