import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="w-full px-6 md:px-12 py-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

        {/* Left Content */}
        <div className="max-w-xl text-center md:text-left flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-snug text-white">
            Your All-in-One{" "}
            <span className="text-orange-500 drop-shadow-[0_0_10px_#ff8c1a]">
              File Hub
            </span>
          </h1>

          <p className="text-gray-300 text-lg mt-4 max-w-md mx-auto md:mx-0">
            Convert, merge, compress & optimize your files instantly — fast,
            secure, and directly in your browser.
          </p>

          <Link
            to="/dashboard"
            className="inline-block mt-6 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-full shadow-[0_0_12px_#ff8c1a] hover:shadow-[0_0_18px_#ff8c1a] transition-all"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Right Logo Section */}
        <div className="flex justify-center md:justify-end flex-1">
          <Link
            to="/"
            className="text-white text-5xl md:text-6xl font-extrabold tracking-tight flex items-center gap-2 select-none"
          >
            Tool
            <span className="bg-orange-500 text-black px-3 py-1 rounded-md font-bold">
              hub
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
