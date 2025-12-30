import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Layout,
  Server,
  Smartphone,
  Terminal,
  Cpu,
  Globe,
  GitBranch,
  Layers,
  Box,
  Atom,
  FileType,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. Helper: Map Category Titles to Lucide Icons ---
const getCategoryIcon = (title) => {
  const t = title?.toLowerCase() || "";
  if (t.includes("front")) return <Layout className="w-6 h-6" />;
  if (t.includes("back")) return <Server className="w-6 h-6" />;
  if (t.includes("data")) return <Database className="w-6 h-6" />;
  if (t.includes("mobile") || t.includes("app"))
    return <Smartphone className="w-6 h-6" />;
  if (t.includes("tool") || t.includes("devops"))
    return <Terminal className="w-6 h-6" />;
  return <Layers className="w-6 h-6" />;
};

// --- 2. Helper: Map Specific Tech Names to Semantic Lucide Icons ---
// Note: Lucide is a generic icon set. For brand logos, consider 'react-icons' or 'simple-icons'.
const getTechIcon = (name) => {
  const n = name?.toLowerCase() || "";
  if (n.includes("react") || n.includes("atom")) return <Atom />;
  if (n.includes("git")) return <GitBranch />;
  if (n.includes("html") || n.includes("xml")) return <Code2 />;
  if (n.includes("css") || n.includes("design")) return <FileType />;
  if (n.includes("node") || n.includes("js")) return <Box />;
  if (n.includes("python") || n.includes("java")) return <FileType />;
  if (n.includes("docker") || n.includes("container")) return <Box />;
  if (n.includes("cloud") || n.includes("aws")) return <Globe />;
  if (n.includes("sql") || n.includes("mongo")) return <Database />;
  return <Workflow />; // Default fallback
};

const Skills = ({ data, themes }) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Helper to determine progress bar width based on text level
  const getLevelWidth = (level) => {
    const l = level?.toLowerCase() || "";
    if (l.includes("adv") || l.includes("expert")) return "w-full";
    if (l.includes("inter")) return "w-3/4";
    if (l.includes("beg") || l.includes("novice")) return "w-1/3";
    return "w-1/2";
  };

  return (
    <section
      id="skills"
      className={cn(
        "relative py-24 overflow-hidden transition-colors duration-700",
        !themes?.isGradient && "bg-gray-50 dark:bg-zinc-950",
        themes?.isGradient && themes?.sectionGradient,
      )}
    >
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/20 dark:bg-purple-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 dark:bg-blue-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto px-6">
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
                  : "border-indigo-200 text-indigo-600 bg-indigo-50 dark:border-indigo-900 dark:text-indigo-400 dark:bg-indigo-900/20",
              )}
            >
              <Cpu className="w-3 h-3" />
              {data?.superTitle || "Competencies"}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {data?.title || "Skills & Technologies"}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {data?.description ||
              "A technical overview of the tools and technologies I use to build scalable solutions."}
          </motion.p>
        </motion.div>

        {/* --- Categories Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data?.categories?.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={cn(
                "flex flex-col h-full rounded-2xl p-6 border transition-all duration-300",
                "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl",
                "border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl",
                "group",
              )}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
                <div
                  className={cn(
                    "p-2.5 rounded-lg text-white shadow-md",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-br from-indigo-500 to-purple-600",
                  )}
                >
                  {/* If category.icon is a string (e.g. fontawesome class), we ignore it and use Lucide mapper */}
                  {getCategoryIcon(category.title)}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {category.title}
                </h3>
              </div>

              {/* Skills List Grid */}
              <div className="grid grid-cols-2 gap-3">
                {category.items?.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={cn(
                      "relative overflow-hidden rounded-lg p-3 transition-all duration-300",
                      "bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10",
                      "border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20",
                      "group/skill",
                    )}
                  >
                    <div className="flex flex-col items-center text-center gap-2 relative z-10">
                      {/* Icon */}
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          // Use the color class from DB if available, otherwise default
                          skill.color
                            ? `text-gray-400 dark:text-gray-500 group-hover/skill:${skill.color}`
                            : "text-gray-400 dark:text-gray-500 group-hover/skill:text-indigo-500",
                        )}
                      >
                        {/* 
                           We clone the element to pass the classNames. 
                           In a real generic component we might render the component function. 
                        */}
                        {React.cloneElement(getTechIcon(skill.name), {
                          className: "w-8 h-8",
                        })}
                      </span>

                      {/* Name */}
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        {skill.name}
                      </span>

                      {/* Level Indicator (Optional text) */}
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        {skill.level}
                      </span>
                    </div>

                    {/* Progress Bar Background (Visual Flair) */}
                    <div className="absolute bottom-0 left-0 h-1 bg-gray-200 dark:bg-white/10 w-full mt-2">
                      <div
                        className={cn(
                          "h-full transition-all duration-500 ease-out opacity-0 group-hover/skill:opacity-100",
                          skill.color
                            ? skill.color.replace("text-", "bg-")
                            : "bg-indigo-500",
                          getLevelWidth(skill.level),
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
