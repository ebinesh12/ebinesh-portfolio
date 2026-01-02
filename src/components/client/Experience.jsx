import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Experience = ({ data, themes }) => {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="experience"
      className={cn(
        "relative py-24 overflow-hidden transition-colors duration-700",
        // Base Background
        !themes?.isGradient && "bg-white dark:bg-zinc-950",
        // Theme Gradient Override
        themes?.isGradient && themes?.sectionGradient,
      )}
    >
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />

        {/* Floating Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-900/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/20 dark:bg-cyan-900/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container max-w-5xl mx-auto px-6">
        {/* --- Section Header --- */}
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
              <Briefcase className="w-3 h-3" />
              {data?.superTitle || "Career Path"}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {data?.title || "Work Experience"}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {data?.description ||
              "A timeline of my professional roles, projects, and contributions to the tech industry."}
          </motion.p>
        </motion.div>

        {/* --- Timeline Structure --- */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className={cn(
              "absolute left-4 md:left-1/2 top-4 bottom-0 w-0.5  ml-[1px] md:ml-0",
              themes?.primaryGradient,
            )}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {data?.jobs?.map((job, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "relative flex flex-col md:flex-row gap-8 md:gap-0 group",
                  // Alternate alignment logic for desktop
                  index % 2 === 0 ? "md:flex-row-reverse" : "",
                )}
              >
                {/* 1. Spacer for the opposite side on desktop */}
                <div className="hidden md:block w-1/2" />

                {/* 2. Timeline Node (Dot) */}
                <div
                  className={cn(
                    "absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 z-20 mt-6 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]",
                    themes.primaryGradient,
                  )}
                >
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-red-500" />
                </div>

                {/* 3. Card Content */}
                <div
                  className={cn(
                    "flex-1 pl-12 md:pl-0", // Left padding for mobile line
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12",
                  )}
                >
                  <div
                    className={cn(
                      "relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                      "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md",
                      "border-gray-200 dark:border-white/10",
                      themes?.isGradient && "border-white/20 shadow-lg",
                    )}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {job.role}
                        </h3>
                        <div
                          className={cn(
                            "flex items-center gap-2 font-medium mt-1",
                          )}
                        >
                          <Building2 className={cn("w-5 h-5", themes?.text)} />
                          <span
                            className={cn(
                              "font-medium mt-1 bg-clip-text text-transparent",
                              themes?.isGradient
                                ? themes?.primaryGradient
                                : "text-blue-600 dark:text-cyan-400",
                            )}
                          >
                            {job.company}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full w-fit">
                        <Calendar className="w-3 h-3" />
                        {job.duration}
                      </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-100 dark:border-zinc-800 mb-4" />

                    {/* Responsibilities List */}
                    <ul className="space-y-3">
                      {job.responsibilities?.map((item, rIndex) => (
                        <li
                          key={rIndex}
                          className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                        >
                          <span className="mt-1 shrink-0">
                            {/* Animated Arrow/Check */}
                            <ArrowRight
                              className={cn(
                                "w-4 h-4",
                                themes?.isGradient
                                  ? "text-white"
                                  : "text-blue-500 dark:text-blue-400",
                              )}
                            />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
