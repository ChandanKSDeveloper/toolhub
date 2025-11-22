import { motion } from "framer-motion";

const FeaturesOverview = () => {
  const features = [
    { title: "Merge PDFs", desc: "Combine multiple PDFs with ease." },
    { title: "Compress PDF", desc: "Reduce file size without losing quality." },
    { title: "Image to PDF", desc: "Convert images into clean PDFs instantly." },
    { title: "Upscale Images", desc: "Enhance image resolution using AI." },
    { title: "PNG/WebP Tools", desc: "Convert seamlessly across formats." },
    { title: "AI Tools", desc: "More AI features coming soon..." },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
        Explore Our <span className="text-orange-500">Features</span>
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="bg-[#1a1a1a] p-6 rounded-xl border border-orange-600 shadow-[0_0_12px_#ff7f1a50] hover:shadow-[0_0_20px_#ff7f1a80] transition-all"
          >
            <h3 className="text-xl font-bold text-orange-400">{f.title}</h3>
            <p className="text-gray-300 text-sm mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesOverview;
