"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Code2,
  Smartphone,
  Globe,
  Monitor,
  Layout,
  Terminal,
  FolderGit,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Helper: Map legacy icon strings (e.g. "fas fa-mobile") to Lucide components
const getProjectIcon = (iconString) => {
  const s = iconString?.toLowerCase() || "";
  if (s.includes("mobile") || s.includes("app"))
    return <Smartphone className="w-12 h-12" />;
  if (s.includes("web") || s.includes("globe"))
    return <Globe className="w-12 h-12" />;
  if (s.includes("monitor") || s.includes("desktop"))
    return <Monitor className="w-12 h-12" />;
  if (s.includes("game") || s.includes("play"))
    return <Layout className="w-12 h-12" />;
  if (s.includes("term") || s.includes("console"))
    return <Terminal className="w-12 h-12" />;
  // Default
  return <Code2 className="w-12 h-12" />;
};

const Projects = ({ data, themes }) => {
  const [expandedStates, setExpandedStates] = useState({});

  const toggleReadMore = (index) => {
    setExpandedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="projects"
      className={cn(
        "relative py-24 overflow-hidden transition-colors duration-700",
        !themes?.isGradient && "bg-gray-50 dark:bg-zinc-950",
        themes?.isGradient && themes?.sectionGradient,
      )}
    >
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-900/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/20 dark:bg-cyan-900/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative container mx-auto px-6 z-10">
        {/* --- Header --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border",
                themes?.isGradient
                  ? "border-white/30 text-white bg-white/10"
                  : "border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:bg-blue-900/20",
              )}
            >
              <FolderGit className="w-3 h-3" />
              {data?.superTitle || "Portfolio"}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {data?.title || "Featured Projects"}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {data?.description ||
              "A selection of my latest work, featuring modern web applications and technical solutions."}
          </motion.p>
        </motion.div>

        {/* --- Projects Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data?.items?.map((project, index) => {
            const isExpanded = expandedStates[index];
            const isLongDescription =
              project.description && project.description.length > 90;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={cn(
                  "group flex flex-col relative overflow-hidden rounded-2xl border transition-all duration-300",
                  "bg-white dark:bg-zinc-900/80 backdrop-blur-xl",
                  "border-gray-200 dark:border-white/10 shadow-sm hover:shadow-2xl",
                )}
              >
                {/* 1. Thumbnail / Visual Area */}
                <div
                  className={cn(
                    "relative h-52 flex items-center justify-center overflow-hidden",
                    project.gradient
                      ? project.gradient
                      : "bg-gradient-to-br from-blue-500 to-indigo-600",
                  )}
                >
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-black/10"></div>

                  {/* Floating Icon */}
                  <div className="relative z-10 text-white transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-lg">
                    {getProjectIcon(project.icon)}
                  </div>

                  {/* Tech Overlay (Optional visual polish) */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* 2. Content Area */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex-1">
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-justify">
                      {isExpanded || !isLongDescription
                        ? project.description
                        : `${project.description.slice(0, 90)}...`}
                    </p>

                    {isLongDescription && (
                      <button
                        onClick={() => toggleReadMore(index)}
                        className={cn(
                          "mt-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline",
                          themes?.isGradient
                            ? "text-white"
                            : "text-blue-600 dark:text-cyan-400",
                        )}
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </div>

                  {/* 3. Action Buttons */}
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300",
                        "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300",
                        "hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black",
                      )}
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>

                    {project.demo && project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg",
                          themes?.isGradient
                            ? themes?.primaryGradient
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
                        )}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
