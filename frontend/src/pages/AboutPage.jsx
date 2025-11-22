import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaStar, FaCloud, FaBolt, FaShieldAlt } from "react-icons/fa";

/*
  Note: I used your uploaded file as the hero image path below.
  Runtime will convert the local path into a URL: /mnt/data/login.png
*/
const heroImg = "https://unsplash.com/photos/black-and-white-robot-illustration-fv1EFjgIb94"; // <- local file you uploaded
const section1 =
  "https://plus.unsplash.com/premium_photo-1661881801573-6506e682cbd6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlnaXRhbCUyMHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D";
const section2 =
  "https://plus.unsplash.com/premium_photo-1661881801573-6506e682cbd6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlnaXRhbCUyMHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D";
const section3 =
  "https://plus.unsplash.com/premium_photo-1661881801573-6506e682cbd6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlnaXRhbCUyMHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D";

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 0.6], [0, -140]);
  const yAccent = useTransform(scrollYProgress, [0, 1], [0, -260]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0b0b0b] text-white selection:bg-orange-500 selection:text-black">
      {/* HERO */}
      <section className="relative h-[88vh] md:h-screen overflow-hidden">
        <motion.img
          src={heroImg}
          alt="ToolHub Hero"
          style={{ y: yHero }}
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale-[10%] mix-blend-overlay"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            >
              Tool<span className="text-[#ff9000]">Hub</span> — All your file tools,
              unified.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="mt-6 text-gray-300 text-base md:text-lg max-w-3xl mx-auto"
            >
              Fast conversions, secure uploads, and a clean dashboard — built for
              creators and power users. Welcome to the hybrid dark-neon productivity hub.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <a
                href="/dashboard"
                className="inline-flex items-center gap-3 bg-[#ff9000] hover:bg-[#ff7f00] text-black px-6 py-3 rounded-full font-semibold shadow-lg"
              >
                Go to Dashboard
              </a>

              <a
                href="#why"
                className="inline-flex items-center gap-2 border border-gray-700 px-4 py-2 rounded-full text-gray-300 hover:border-[#ff9000]"
              >
                Learn more
              </a>
            </motion.div>
          </div>

          {/* Accent floating stats */}
          <motion.div
            style={{ y: yAccent }}
            className="mt-12 flex gap-6 justify-center flex-wrap"
          >
            <div className="bg-[#0f1114] border border-[#222] rounded-2xl px-5 py-3 flex items-center gap-3 shadow-[0_8px_30px_rgb(255,144,0,0.06)]">
              <div className="p-2 rounded-md bg-[#ff9000] text-black">
                <FaBolt />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-300 font-semibold">120K+</div>
                <div className="text-xs text-gray-400">Files processed</div>
              </div>
            </div>

            <div className="bg-[#0f1114] border border-[#222] rounded-2xl px-5 py-3 flex items-center gap-3">
              <div className="p-2 rounded-md bg-[#0ea5ff] text-black">
                <FaCloud />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-300 font-semibold">Cloud</div>
                <div className="text-xs text-gray-400">Integrated backups</div>
              </div>
            </div>

            <div className="bg-[#0f1114] border border-[#222] rounded-2xl px-5 py-3 flex items-center gap-3">
              <div className="p-2 rounded-md bg-[#34d399] text-black">
                <FaShieldAlt />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-300 font-semibold">Private</div>
                <div className="text-xs text-gray-400">Files are ephemeral</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STORY / MISSION */}
      <section id="why" className="relative py-20 md:py-32 px-6 md:px-12 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img src={section1} alt="mission" className="w-full h-[420px] object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold">
              Mission — Simplify creative workflows.
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg max-w-xl">
              ToolHub brings trusted utilities together with a minimal, fast, and secure approach.
              We focus on building tools that do one thing and do it extremely well — from PDF
              conversions to image enhancement and AI powerups.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-[#0f1114] p-4 rounded-xl border border-[#222]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#ff9000] rounded text-black"><FaStar /></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-200">Quality</div>
                    <div className="text-xs text-gray-400">Reliable results every time</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f1114] p-4 rounded-xl border border-[#222]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#0ea5ff] rounded text-black"><FaCloud /></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-200">Cloud</div>
                    <div className="text-xs text-gray-400">Safe & synced operations</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">Our Journey</h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#222] h-full" />
            <div className="space-y-24">
              {[
                {
                  year: "2022",
                  title: "Seed Idea",
                  desc: "A tiny idea to make file tasks simple for everyone."
                },
                {
                  year: "2023",
                  title: "MVP",
                  desc: "Shipped first tools: merge, convert, compress."
                },
                {
                  year: "2024",
                  title: "Growth",
                  desc: "Added AI features and prepared cloud integration."
                },
                {
                  year: "2025",
                  title: "Scale",
                  desc: "Built team features, history, and secure uploads."
                }
              ].map((it, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  className="relative md:max-w-3xl mx-auto"
                >
                  <div className={`md:flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-1/2">
                      <div className="bg-[#111213] border border-[#222] rounded-2xl p-6 shadow-xl">
                        <div className="text-[#ff9000] font-bold text-lg">{it.year}</div>
                        <div className="text-2xl font-extrabold mt-2">{it.title}</div>
                        <p className="text-gray-300 mt-2">{it.desc}</p>
                      </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#0f1114] border-4 border-[#111] flex items-center justify-center shadow-[0_8px_30px_rgba(255,144,0,0.08)]">
                        <div className="w-8 h-8 rounded-full bg-[#ff9000]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f1012]" aria-labelledby="features">
        <div className="max-w-7xl mx-auto">
          <h3 id="features" className="text-4xl md:text-5xl font-extrabold text-center mb-12">Why creators love ToolHub</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Fast conversions", desc: "Blazing throughput for heavy files", accent: "#ff9000" },
              { title: "AI tools", desc: "Smart enhancements & upscales", accent: "#7c3aed" },
              { title: "Private by default", desc: "Files auto-delete after processing", accent: "#06b6d4" },
              { title: "No ads", desc: "Cleaner workspace & faster UI", accent: "#facc15" },
              { title: "Integrations", desc: "Cloud + API ready", accent: "#06b6d4" },
              { title: "Responsive UI", desc: "Works seamlessly across devices", accent: "#34d399" }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="p-6 rounded-2xl bg-[#0f1114] border border-[#222] hover:shadow-[0_20px_60px_rgba(255,144,0,0.06)] transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xl font-bold" style={{ color: f.accent }}>{f.title}</div>
                    <div className="text-sm text-gray-300 mt-2">{f.desc}</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <FaStar className="text-[#ff9000]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-t from-[#071017] to-[#0b0b0b]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6">Ready to boost your workflow?</h3>
          <p className="text-gray-300 mb-8">Join ToolHub and process files faster, smarter and safer.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/dashboard" className="px-6 py-3 rounded-full bg-[#ff9000] text-black font-semibold hover:bg-[#ff7f00]">Get Started</a>
            <a href="/signup" className="px-6 py-3 rounded-full border border-gray-700 text-gray-300 hover:border-[#ff9000]">Create account</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 md:px-12 bg-[#080808] border-t border-[#111]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold">Tool<span className="text-[#ff9000]">Hub</span></div>
            <div className="text-xs text-gray-400">Made for creators • © {new Date().getFullYear()}</div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-300">
            <a className="hover:text-[#ff9000]" href="#">Privacy</a>
            <a className="hover:text-[#ff9000]" href="#">Terms</a>
            <a className="hover:text-[#ff9000]" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
