import { useState } from "react";
import { motion } from "framer-motion";

const FAQSection = () => {
  const faqs = [
    {
      q: "Is ToolHub free to use?",
      a: "Yes! All tools are completely free and accessible anytime.",
    },
    {
      q: "Do you store my files?",
      a: "No. Files are processed temporarily and never saved.",
    },
    {
      q: "Is there a limit on file size?",
      a: "Most tools support large uploads. Limits may vary per feature.",
    },
    {
      q: "Do I need to create an account?",
      a: "Using an account lets you save history and get personalized tools.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl text-white font-bold text-center">
        Frequently Asked <span className="text-orange-500">Questions</span>
      </h2>

      <div className="mt-10 space-y-4">
        {faqs.map((f, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="bg-[#1a1a1a] p-5 rounded-xl border border-orange-600 shadow-[0_0_10px_#ff7f1a50]"
          >
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full flex justify-between items-center text-left"
            >
              <h3 className="text-lg text-orange-400 font-semibold">{f.q}</h3>
              <span className="text-orange-400">{open === idx ? "-" : "+"}</span>
            </button>

            {open === idx && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-300 mt-4"
              >
                {f.a}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
