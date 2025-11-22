import { motion } from "framer-motion";

const FooterSection = () => {
  return (
    <footer className="w-full bg-[#0d0d0d] border-t border-orange-600 shadow-[0_-0_10px_#ff7f1a80] mt-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="max-w-6xl mx-auto px-6 py-10"
      >
        <h2 className="text-xl font-bold text-white">
          Tool<span className="text-orange-500">Hub</span>
        </h2>

        <p className="text-gray-400 text-sm mt-2 max-w-xl">
          Your trusted companion for everyday file utilities — fast, powerful, and secure.
        </p>

        <div className="mt-6 flex gap-6 text-gray-300">
          <a href="#" className="hover:text-orange-400">Terms</a>
          <a href="#" className="hover:text-orange-400">Privacy</a>
          <a href="#" className="hover:text-orange-400">Contact</a>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} ToolHub. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
