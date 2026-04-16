import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import BackgroundParticles from "./components/BackgroundParticles";

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });

    const onScroll = () => setScrolled(window.scrollY > 20);

    const elements = document.querySelectorAll("a, button");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", () => setHover(true));
      el.addEventListener("mouseleave", () => setHover(false));
    });

    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen text-[#1d1d1f]">

      {/* BACKGROUND */}
      <BackgroundParticles />

      {/* CURSOR */}
      <div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: mouse.x,
          top: mouse.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className={`transition-all duration-200 ${hover ? "scale-150 rotate-45" : ""}`}>
          <div
            className={`w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px]
            border-l-transparent border-r-transparent
            ${hover ? "border-b-white" : "border-b-black"}`}
          />
        </div>
      </div>

      {/* HEADER */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-2xl bg-white/70 border-b border-black/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-semibold">
              Iván Díaz
            </span>
            <span className="text-xs text-zinc-500 uppercase tracking-widest">
              Full Stack Developer
            </span>
          </div>

          <nav className="flex gap-8 text-sm text-zinc-600">
            {["about", "projects", "contact"].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-black">
                {item.toUpperCase()}
              </a>
            ))}
          </nav>

        </div>
      </header>

      {/* HERO */}
      <motion.section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24">

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
          Full Stack Developer focused on scalable web applications
        </h1>

        <p className="mt-6 text-lg text-zinc-600 max-w-2xl leading-relaxed">
          I build modern web applications using React, TypeScript and Node.js.
          Focused on performance, clean architecture and maintainable code.
          I enjoy creating systems that scale and provide real business value.
        </p>

        <motion.a
          href="#projects"
          className="mt-10 px-6 py-3 rounded-full bg-black text-white hover:scale-105 transition"
        >
          View selected work
        </motion.a>

      </motion.section>

      {/* ABOUT */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-32">

        <h2 className="text-3xl font-semibold">About</h2>

        <p className="mt-6 text-zinc-600 text-lg leading-relaxed">
          I am a Full Stack Developer with a strong focus on frontend engineering
          and modern JavaScript ecosystems. I enjoy building user interfaces that
          are both performant and intuitive.
        </p>

        <p className="mt-4 text-zinc-600 text-lg leading-relaxed">
          My experience includes working with React, TypeScript, Node.js and REST APIs.
          I also have experience integrating backend services, databases and authentication systems.
        </p>

        <p className="mt-4 text-zinc-600 text-lg leading-relaxed">
          I am currently focused on improving my system design skills and building
          production-ready applications with clean and scalable architecture.
        </p>

      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-32">

        <h2 className="text-3xl font-semibold">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          {[
            {
              title: "Document Management System",
              desc: "Internal system for document tracking and workflow automation integrated with Oracle databases."
            },
            {
              title: "Portfolio Platform",
              desc: "Personal portfolio built with React, TypeScript and animated UI components."
            },
            {
              title: "API Automation Tool",
              desc: "Tool for automating API workflows and data processing pipelines."
            },
            {
              title: "HR Dashboard",
              desc: "Dashboard for HR teams to visualize employee documentation and status tracking."
            },
          ].map((p, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/70 backdrop-blur border border-black/5 hover:shadow-2xl hover:scale-[1.02] transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{p.title}</h3>
                <ExternalLink size={18} />
              </div>

              <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-32 text-center">

        <h2 className="text-3xl font-semibold">Let’s work together</h2>

        <p className="mt-4 text-zinc-600 text-lg leading-relaxed">
          I am available for freelance and full-time opportunities.
          If you are looking for a developer who focuses on quality and performance,
          feel free to contact me.
        </p>

        <a
          href="mailto:email@example.com"
          className="inline-block mt-8 px-6 py-3 rounded-full bg-black text-white hover:scale-105 transition"
        >
          Get in touch
        </a>

      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-zinc-400 py-10">
        © {new Date().getFullYear()} Iván Díaz — Full Stack Developer
      </footer>

    </div>
  );
}