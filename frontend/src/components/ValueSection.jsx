import { motion } from "framer-motion";

const ValueSection = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-20 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-extrabold text-white"
      >
        Why Choose <span className="text-orange-500">ToolHub?</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-gray-300 mt-3 max-w-2xl mx-auto"
      >
        Powerful tools. Instant results. A smooth and seamless experience.
      </motion.p>

      {/* Value Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-14">
        {[
          {
            title: "Fast & Reliable",
            desc: "Every tool works instantly with optimized performance.",
          },
          {
            title: "Secure & Private",
            desc: "Your files are processed safely with no unwanted storage.",
          },
          {
            title: "All Tools in One Place",
            desc: "PDF, images, AI utilities — all in one simple dashboard.",
          },
        ].map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.2,
              type: "spring",
              stiffness: 120,
            }}
            className="bg-[#1a1a1a] rounded-xl p-6 border border-orange-600 shadow-[0_0_15px_#ff7f1a60] hover:shadow-[0_0_25px_#ff7f1ac0] transition-all"
          >
            <h3 className="text-xl font-bold text-orange-400">{v.title}</h3>
            <p className="text-gray-300 mt-3">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ValueSection;
