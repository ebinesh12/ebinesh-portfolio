import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Building2,
  User,
  Award,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to map DB icon strings to Lucide components
const getIconComponent = (iconName, className) => {
  const name = iconName?.toLowerCase() || "";
  if (name.includes("grad")) return <GraduationCap className={className} />;
  if (name.includes("award") || name.includes("cert"))
    return <Award className={className} />;
  if (name.includes("book")) return <BookOpen className={className} />;
  // Default fallback
  return <User className={className} />;
};

const About = ({ data, themes }) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
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
      id="about"
      className={cn(
        "relative py-24 overflow-hidden transition-colors duration-700",
        !themes?.isGradient && "bg-white dark:bg-zinc-950",
        themes?.isGradient && themes?.sectionGradient,
      )}
    >
      {/* --- Background Effects (Consistent with Hero) --- */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100/40 dark:bg-cyan-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- Header Section --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.div variants={itemVariants}>
            <span
              className={cn(
                "inline-block py-1 px-3 rounded-full text-sm font-semibold tracking-wider uppercase bg-opacity-10 mb-4",
                themes?.isGradient
                  ? "bg-white/20 text-white"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
              )}
            >
              {data?.superTitle || "Discover"}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {data?.title || "About Me"}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            {data?.description ||
              "A glimpse into my journey, education, and professional evolution."}
          </motion.p>
        </motion.div>

        {/* --- Main Content Split --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          {/* Left: Visual / Feature Card */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Abstract decorative shapes */}
              <div
                className={cn(
                  "absolute inset-0 rounded-[2rem] rotate-6 opacity-20",
                  themes?.isGradient
                    ? themes?.primaryGradient
                    : "bg-gradient-to-tr from-blue-500 to-cyan-400",
                )}
              />

              <div className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center p-8 border border-gray-100 dark:border-zinc-800">
                {/* Icon Container */}
                <div
                  className={cn(
                    "w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-lg",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-br from-blue-500 to-cyan-500",
                  )}
                >
                  {getIconComponent(data?.icon, "w-14 h-14 text-white")}
                </div>

                {/* Stats or Short Quote could go here */}
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {data?.experienceYear || new Date().getFullYear() - 2020}+
                  </div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Story Text */}
          <motion.div variants={itemVariants} className="lg:pl-8">
            <h3
              className={cn(
                "text-3xl font-bold mb-6 flex items-center gap-3",
                themes?.isGradient
                  ? "text-white"
                  : "text-gray-900 dark:text-white",
              )}
            >
              {/* Optional Decoration Line */}
              <span
                className={cn(
                  "w-12 h-1 rounded-full",
                  themes?.isGradient
                    ? "bg-white"
                    : "bg-blue-600 dark:bg-cyan-400",
                )}
              />
              {data?.story?.title || "My Story"}
            </h3>

            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-justify">
              {data?.story?.paragraphs?.map((paragraph, index) => (
                <p key={index} className="opacity-90">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* --- Education & Timeline Grid --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
            <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
              Education & Experience
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data?.education?.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={cn(
                  "group relative p-8 rounded-2xl transition-all duration-300 border",
                  "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm",
                  "hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/20",
                  themes?.border,
                  // "border-gray-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700",
                )}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-sm font-medium">
                        <Building2 className={cn("w-5 h-5", themes?.text)} />
                        <span
                          className={cn(
                            "font-medium mt-1 bg-clip-text text-transparent",
                            themes?.isGradient
                              ? themes?.primaryGradient
                              : "text-blue-600 dark:text-cyan-400",
                          )}
                        >
                          {edu.institution}
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="w-3 h-3" />
                      {edu.duration}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm text-justify leading-relaxed mt-auto">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
