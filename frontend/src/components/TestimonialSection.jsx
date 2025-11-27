import React from "react";

const testimonials = [
  {
    id: 1,
    // name: "Aarav Sharma",
    name: "Janni Shuddh Sanskari",
    // image: "https://i.pravatar.cc/150?img=32",
    image: "./js.jpg",
    // review:
    //   "ToolHub made PDF merging and image conversion insanely simple. Everything loads fast and works perfectly!",
    review:
      "ToolHub makes PDF merging and image conversion ridiculously easy. Everything loads fast, runs smoothly, and hits all the right spots—just like I do!",
  },
  {
    id: 2,
    name: "Nikhil",
    // image: "https://i.pravatar.cc/150?img=47",
    image: "./ni.jpg",
    // review:
    //   "The UI feels clean and modern. The image-to-PDF tool has become a part of my daily workflow.",
    review:
      "The UI’s sleek and modern, and that image-to-PDF tool? It's become a daily must-have in my routine. Smooth, fast, and always gets the job done—just the way I like it.",
  },
  {
    id: 3,
    name: "Savita",
    // image: "https://i.pravatar.cc/150?img=12",
    image: "sb.jpg",
    // review:
    //   "Super smooth experience. The tools work better than most paid apps. Highly recommended!",
    review:
      "Super smooth experience—these tools work better than most paid apps. I’m hooked. You’ll be too. Highly recommended, if you know what I mean!",
  },
];

const TestimonialSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20" id="testimonials">
      {/* Title */}
      <h2 className="text-4xl font-bold text-white text-center">
        What Our Users Say
      </h2>
      <p className="text-gray-300 text-center mt-2 mb-12">
        Trusted by creators, students, and professionals.
      </p>

      {/* Testimonials Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-orange-600 
                       shadow-[0_0_12px_#ff751a40] hover:shadow-[0_0_20px_#ff751a70]
                       transition-all"
          >
            {/* User Image */}
            <div className="flex justify-center mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full border-2 border-orange-500 shadow-lg object-cover"
              />
            </div>

            {/* Review Text */}
            <p className="text-gray-200 text-sm leading-relaxed text-center px-2">
              “{t.review}”
            </p>

            {/* Name */}
            <p className="mt-4 font-semibold text-orange-400 text-center">
              — {t.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
