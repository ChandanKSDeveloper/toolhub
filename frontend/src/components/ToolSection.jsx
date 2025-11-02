import React from "react";

const ToolSection = ({ tools, onSelect }) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 text-center">
     
      {/* Cards Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onSelect(tool)}
            className="bg-[#111] border border-gray-700 hover:border-orange-400 transition cursor-pointer p-5 rounded-lg text-left flex flex-col gap-3"
          >
            {/* ICON — replace `tool.icon` with your SVG later */}
            <div className="w-12 h-12 rounded bg-gray-800 flex items-center justify-center">
              {tool.icon ? (
                <img src={tool.icon} alt={tool.name} className="w-8 h-8" />
              ) : (
                <span className="text-gray-400 text-sm">ICON</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold text-lg">{tool.name}</h3>
              {tool.badge && (
                <span className="text-xs bg-orange-400 text-black px-1.5 py-0.5 rounded">
                  {tool.badge}
                </span>
              )}
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">{tool.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToolSection;
