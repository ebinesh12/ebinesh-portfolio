import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import TypingAnimation from "@/components/ui/typing-animation";

// Helper to map string icon names from DB to Lucide components
const getIconComponent = (iconName) => {
  const normalized = iconName?.toLowerCase() || "";
  if (normalized.includes("github")) return <Github className="w-5 h-5" />;
  if (normalized.includes("linkedin")) return <Linkedin className="w-5 h-5" />;
  if (normalized.includes("twitter") || normalized.includes("x"))
    return <Twitter className="w-5 h-5" />;
  if (normalized.includes("mail") || normalized.includes("envelope"))
    return <Mail className="w-5 h-5" />;
  if (normalized.includes("resume") || normalized.includes("file"))
    return <FileText className="w-5 h-5" />;
  return <ExternalLink className="w-5 h-5" />;
};

const Hero = ({ data, themes }) => {
  const user = useSelector((state) => state.userInfo.user);
  const [resume, setResume] = useState(null);
  const [profile, setProfile] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        // Optimized: Parallel fetching
        const [resResponse, imgResponse] = await Promise.allSettled([
          axios.get("/api/v1/admin/res"),
          axios.get("/api/v1/admin/img"),
        ]);

        if (
          resResponse.status === "fulfilled" &&
          resResponse.value.status === 200
        ) {
          setResume("/api/v1/admin/res");
        }
        if (
          imgResponse.status === "fulfilled" &&
          imgResponse.value.status === 200
        ) {
          setProfile("/api/v1/admin/img");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchAboutData();
  }, [user]);

  // Determine Profile Image Source
  const profileImageSrc =
    (user ? `/api/v1/admin/${user?.id}/img` : profile) ||
    data?.personalInfo?.image ||
    "/images/profile.jpg";

  // Determine Resume Link
  const getActionLink = (action) => {
    if (action.id === "resume") {
      return (
        (user != null ? `/api/v1/admin/${user?.id}/res` : resume) || action.href
      );
    }
    return action.href;
  };

  return (
    <section
      id="home"
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 pt-20 pb-10",
        // Default Background
        !themes?.isGradient && "bg-gray-50 dark:bg-zinc-950",
        // Theme Gradient Override
        themes?.isGradient && themes?.sectionGradient,
      )}
    >
      {/* --- Background Effects --- */}

      {/* 1. Dot Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />

      {/* 2. Ambient Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-purple-400/30 dark:bg-purple-900/20 blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-blue-400/30 dark:bg-blue-900/20 blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* --- Main Content Grid --- */}
      <div className="relative z-10 container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            {/* Greeting Pill */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur-sm">
                {/* <span className="animate-wave text-lg">👋</span> */}
                {data?.personalInfo?.greeting || "Hello, I'm"}
              </span>
            </motion.div>

            {/* Name with Typing Effect */}
            <motion.div
              variants={itemVariants}
              className="min-h-[80px] lg:min-h-[90px]"
            >
              <TypingAnimation
                text={data?.personalInfo?.name || "Developer"}
                duration={500}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white"
              />
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className={cn(
                "text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400",
              )}
            >
              {data?.personalInfo?.title || "Full Stack Developer"}
            </motion.h2>

            {/* Summary */}
            <motion.p
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-300 text-base text-justify sm:text-lg max-w-2xl leading-relaxed"
            >
              {data?.about?.summary ||
                "Building digital experiences with modern technologies."}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4"
            >
              {data?.actions?.map((action) => (
                <a
                  key={action.id}
                  href={getActionLink(action)}
                  target={action.id === "resume" ? "_blank" : "_self"}
                  rel="noreferrer"
                  className={cn(
                    "group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 active:scale-95",
                    // Primary Button (Contact)
                    action.id === "contact"
                      ? cn(
                          "text-white shadow-lg hover:shadow-xl hover:-translate-y-1",
                          themes?.isGradient
                            ? themes?.primaryGradient
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
                        )
                      : // Secondary Button (Resume/Outline)
                        cn(
                          "backdrop-blur-sm hover:-translate-y-1",
                          themes?.outlineBtn
                            ? `${themes.outlineBtn} hover:text-white border-2`
                            : "bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10",
                        ),
                  )}
                >
                  {getIconComponent(
                    action.icon || (action.id === "resume" ? "resume" : "mail"),
                  )}
                  <span>{action.text}</span>
                  {action.id !== "resume" && (
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                </a>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              {data?.socialLinks?.map((social) => (
                social?.show && <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "p-3 rounded-full transition-all duration-300 border border-transparent",
                    "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
                    "hover:scale-110 hover:shadow-lg hover:text-white hover:border-white/20",
                    themes?.isGradient
                      ? `hover:${themes?.primaryGradient}`
                      : "hover:bg-blue-600 dark:hover:bg-blue-600",
                  )}
                  aria-label={social.name}
                >
                  {getIconComponent(social.name)}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Visual/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center relative"
          >
            {/* Rotating border effect */}
            <div
              className={cn(
                "absolute inset-0 rounded-full blur-3xl opacity-20 animate-spin-slow",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "bg-gradient-to-tr from-cyan-500 to-purple-600",
              )}
            />

            <div className="relative group w-72 h-72 sm:w-96 sm:h-96">
              {/* Glassmorphism Card */}
              <div className="absolute inset-0 bg-white/30 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] rotate-6 transition-transform group-hover:rotate-3 border border-white/20 dark:border-white/10 shadow-2xl" />
              <div className="absolute inset-0 bg-white/30 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] -rotate-3 transition-transform group-hover:-rotate-1 border border-white/20 dark:border-white/10 shadow-2xl" />

              {/* Image Container */}
              <div className="absolute inset-2 rounded-[1.8rem] overflow-hidden bg-gray-200 dark:bg-gray-800 border-2 border-white/50 dark:border-white/10 shadow-inner z-20">
                <img
                  src={profileImageSrc}
                  alt={data?.personalInfo?.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-4 right-8 z-30 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow-xl border border-gray-100 dark:border-gray-800">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                  Open to work
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
