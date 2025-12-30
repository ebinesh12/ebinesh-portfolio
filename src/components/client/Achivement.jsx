import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  Star,
  Medal,
  Crown,
  Zap,
  BadgeCheck,
  ScrollText,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to map DB strings to Lucide Icons
const getIconComponent = (iconString, className) => {
  const name = iconString?.toLowerCase() || "";
  if (name.includes("trophy") || name.includes("cup"))
    return <Trophy className={className} />;
  if (name.includes("medal")) return <Medal className={className} />;
  if (name.includes("star")) return <Star className={className} />;
  if (name.includes("crown")) return <Crown className={className} />;
  if (name.includes("zap") || name.includes("bolt"))
    return <Zap className={className} />;
  if (name.includes("check") || name.includes("badge"))
    return <BadgeCheck className={className} />;
  if (name.includes("cert") || name.includes("scroll"))
    return <ScrollText className={className} />;
  if (name.includes("mark")) return <Bookmark className={className} />;
  // Default
  return <Award className={className} />;
};

const Achievement = ({ data, themes }) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  return (
    <section
      id="achievements"
      className={cn(
        "relative py-24 overflow-hidden transition-colors duration-700",
        // Background Base
        !themes?.isGradient && "bg-gray-50 dark:bg-zinc-950",
        // Theme Override
        themes?.isGradient && themes?.sectionGradient,
      )}
    >
      {/* --- Background Texture (Matches Hero/About) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        {/* Soft Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* --- Section Header --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span
              className={cn(
                "inline-block mb-3 text-sm font-bold tracking-[0.2em] uppercase bg-clip-text text-transparent",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-cyan-300",
              )}
            >
              {data?.superTitle || "Honors & Awards"}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            {data?.title || "My Achievements"}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            {data?.description ||
              "Recognitions that reflect my dedication to excellence and continuous learning."}
          </motion.p>
        </motion.div>

        {/* --- Achievement Cards Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data?.items?.map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group h-full"
            >
              {/* Card Container */}
              <div
                className={cn(
                  "h-full p-8 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center shadow-sm",
                  "bg-white dark:bg-zinc-900/60 backdrop-blur-xl",
                  "border-gray-200 dark:border-white/10",
                  "group-hover:shadow-2xl group-hover:border-transparent dark:group-hover:border-white/20",
                )}
              >
                {/* Gradient Border Glow (Optional effect) */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-br from-blue-500/30 to-purple-500/30",
                  )}
                />

                {/* Icon Circle */}
                <div
                  className={cn(
                    "relative w-20 h-20 mb-6 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-500 dark:to-purple-500",
                  )}
                >
                  {getIconComponent(achievement.icon, "w-9 h-9")}

                  {/* Inner Glow Ring */}
                  <div className="absolute inset-0 rounded-full border border-white/30" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {achievement.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  {achievement.description}
                </p>

                {/* Decorative Bottom Line */}
                <div
                  className={cn(
                    "w-12 h-1 rounded-full mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100",
                    themes?.isGradient
                      ? "bg-gray-400"
                      : "bg-gray-200 dark:bg-gray-700",
                  )}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievement;
