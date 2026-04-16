import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Mail, Sun, Moon, ExternalLink, ArrowUpRight } from "lucide-react";
import BackgroundParticles from "./components/BackgroundParticles";

// ─── DATA ────────────────────────────────────────────────────────────────────

const STACK = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"] },
  { category: "Backend", items: ["Node.js", "Express", "REST APIs"] },
  { category: "Database", items: ["Oracle", "SQL", "PostgreSQL"] },
  { category: "Tools", items: ["Git", "Docker", "GitHub Actions"] },
];

const PROJECTS = [
  {
    title: "Document Management System",
    description: "Internal system for document tracking and workflow automation integrated with Oracle databases. Built for enterprise-level usage with role-based access control.",
    tags: ["React", "TypeScript", "Node.js", "Oracle"],
    github: "https://github.com/IvanDR1",
    demo: null,
    year: "2024",
  },
  {
    title: "HR Dashboard",
    description: "Dashboard for HR teams to visualize employee documentation and status tracking. Real-time data with interactive charts and filterable tables.",
    tags: ["React", "TypeScript", "Recharts", "REST API"],
    github: "https://github.com/IvanDR1",
    demo: null,
    year: "2024",
  },
  {
    title: "API Automation Tool",
    description: "Tool for automating API workflows and data processing pipelines. Reduces manual intervention and speeds up repetitive integration tasks.",
    tags: ["Node.js", "Express", "REST APIs"],
    github: "https://github.com/IvanDR1",
    demo: null,
    year: "2023",
  },
  {
    title: "Portfolio",
    description: "This portfolio. Built with React, TypeScript, Framer Motion and Tailwind CSS. Fully responsive with dark/light mode toggle.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/IvanDR1/IvanDR1.github.io",
    demo: "https://IvanDR1.github.io",
    year: "2025",
  },
];

// ─── ANIMATION HELPERS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-mono uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500 mb-8">
      {children}
    </span>
  );
}

function StackSection({ dark }: { dark: boolean }) {
  return (
    <section id="stack" className="py-28 border-t border-zinc-100 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Stack</SectionLabel>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-2">
          {STACK.map((group, gi) => (
            <FadeIn key={group.category} delay={gi * 1}>
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-4 uppercase tracking-wider">
                {group.category}
              </p>
              <ul className="space-y-2">
                {group.items.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 flex-shrink-0" />
                    {tech}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <FadeIn delay={index}>
      <div className="group relative flex flex-col h-full border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-mono text-zinc-400">{project.year}</span>
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-base font-medium text-zinc-900 dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1 mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">

      <BackgroundParticles />

      {/* HEADER */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-100 dark:border-zinc-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-sm font-medium tracking-tight">Iván Díaz</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-500 dark:text-zinc-400">
            {["about", "stack", "projects", "contact"].map((s) => (
              <a key={s} href={`#${s}`} className="hover:text-zinc-900 dark:hover:text-white transition-colors capitalize">
                {s}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/IvanDR1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>
            <button
              onClick={() => setDark(!dark)}
              className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for work
          </span>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6">
            Full Stack<br />
            <span className="text-zinc-400 dark:text-zinc-500">Developer</span>
          </h1>

          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed mb-10">
            I build scalable web applications with React, TypeScript and Node.js.
            Clean architecture, real performance, maintainable code.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition"
            >
              View projects <ArrowUpRight size={14} />
            </a>
            <a
              href="https://github.com/IvanDR1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:border-zinc-400 dark:hover:border-zinc-500 transition"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:border-zinc-400 dark:hover:border-zinc-500 transition"
            >
              <Mail size={14} /> Contact
            </a>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>About</SectionLabel>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeIn delay={0}>
              <h2 className="text-3xl font-semibold leading-snug">
                Building things for the web, focused on quality.
              </h2>
            </FadeIn>
            <FadeIn delay={1}>
              <div className="space-y-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
                <p>
                  I'm a Full Stack Developer with a strong focus on frontend engineering
                  and modern JavaScript ecosystems. I enjoy building interfaces that are
                  both performant and intuitive.
                </p>
                <p>
                  My experience spans React, TypeScript, Node.js and REST APIs, including
                  backend services, databases and authentication systems.
                </p>
                <p>
                  Currently focused on system design and building production-ready
                  applications with clean, scalable architecture.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* STACK */}
      <StackSection dark={dark} />

      {/* PROJECTS */}
      <section id="projects" className="py-28 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>Projects</SectionLabel>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5 mt-2">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>Contact</SectionLabel>
          </FadeIn>
          <FadeIn delay={0}>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Let's work<br />together.
            </h2>
          </FadeIn>
          <FadeIn delay={1}>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed mb-10">
              Available for freelance and full-time opportunities. If you're looking
              for a developer who cares about quality, reach out.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:email@example.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition"
              >
                <Mail size={14} /> email@example.com
              </a>
              <a
                href="https://github.com/IvanDR1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:border-zinc-400 dark:hover:border-zinc-500 transition"
              >
                <Github size={14} /> IvanDR1
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-100 dark:border-zinc-800 py-8">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-xs text-zinc-400">
          <span>© {new Date().getFullYear()} Iván Díaz</span>
          <span className="font-mono">Full Stack Developer</span>
        </div>
      </footer>

    </div>
  );
}
