"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  ExternalLink,
  X,
  Loader2,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Certificate = ({ data, themes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [pdfStatus, setPdfStatus] = useState("loading");
  const [expandedStates, setExpandedStates] = useState({});

  // Toggle Read More
  const toggleReadMore = (index) => {
    setExpandedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Check PDF Validity
  useEffect(() => {
    if (isModalOpen && pdf) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPdfStatus("loading");
      fetch(pdf, { method: "HEAD" }) // Optimization: Use HEAD request if possible
        .then((res) => {
          if (res.ok) {
            setPdfStatus("valid");
          } else {
            // Fallback: sometimes HEAD fails on static files, try strict valid status
            setPdfStatus("valid");
          }
        })
        .catch(() => {
          // Network error or CORS, might still be viewable in iframe,
          // but we'll assume valid to let the browser handle the 404 in the iframe if needed,
          // or set to invalid if we want strict blocking.
          // For this UI, let's assume valid so the iframe attempts to load.
          setPdfStatus("valid");
        });
    }
  }, [isModalOpen, pdf]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [isModalOpen]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <section
        id="certificates"
        className={cn(
          "relative py-24 overflow-hidden transition-colors duration-700",
          !themes?.isGradient && "bg-gray-50 dark:bg-zinc-950",
          themes?.isGradient && themes?.sectionGradient,
        )}
      >
        {/* --- Background Effects --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* --- Header --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={cardVariants}>
              <span
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border",
                  themes?.isGradient
                    ? "border-white/30 text-white bg-white/10"
                    : "border-indigo-200 text-indigo-600 bg-indigo-50 dark:border-indigo-900 dark:text-indigo-400 dark:bg-indigo-900/20",
                )}
              >
                <BadgeCheck className="w-3 h-3" />
                {data?.superTitle || "Credentials"}
              </span>
            </motion.div>

            <motion.h2
              variants={cardVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              {data?.title || "Certifications"}
            </motion.h2>

            <motion.p
              variants={cardVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              {data?.description ||
                "Validations of my technical expertise and commitment to continuous professional growth."}
            </motion.p>
          </motion.div>

          {/* --- Grid --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data?.items?.map((cert, index) => {
              const isExpanded = expandedStates[index];
              const isLongDescription =
                cert.description && cert.description.length > 75;

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className={cn(
                    "flex flex-col relative overflow-hidden rounded-2xl border transition-all duration-300",
                    "bg-white dark:bg-zinc-900/80 backdrop-blur-xl",
                    "border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl",
                    "group",
                  )}
                >
                  {/* Card Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Top Row: Icon & Date */}
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
                          themes?.isGradient
                            ? themes?.primaryGradient
                            : "bg-gradient-to-br from-indigo-500 to-purple-600",
                        )}
                      >
                        <Award className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-md">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </div>
                    </div>

                    {/* Titles */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors">
                      {cert.title}
                    </h3>
                    <p
                      className={cn(
                        "text-sm font-medium mb-3 bg-clip-text text-transparent",
                        themes?.isGradient
                          ? themes?.primaryGradient
                          : "bg-gradient-to-br from-indigo-500 to-purple-600",
                      )}
                    >
                      {cert.issuer}
                    </p>

                    {/* Description */}
                    <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      <p>
                        {isExpanded || !isLongDescription
                          ? cert.description
                          : `${cert.description.slice(0, 75)}...`}
                      </p>
                      {isLongDescription && (
                        <button
                          onClick={() => toggleReadMore(index)}
                          className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none"
                        >
                          {isExpanded ? "Show Less" : "Read More"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Footer Button */}
                  <div className="p-6 pt-0 mt-auto">
                    <button
                      onClick={() => {
                        setPdf(cert.pdf);
                        setIsModalOpen(true);
                      }}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white transition-all duration-300",
                        "shadow-md hover:shadow-lg active:scale-95",
                        themes?.isGradient
                          ? themes?.primaryGradient
                          : "bg-gray-900 dark:bg-white dark:text-black hover:bg-indigo-600 dark:hover:bg-gray-200",
                      )}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Certificate
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* --- PDF Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  <FileText className="w-4 h-4" />
                  Certificate Viewer
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Viewer Body */}
              <div className="relative flex-1 bg-gray-100 dark:bg-gray-950/50 w-full h-full">
                {pdfStatus === "loading" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 gap-3">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                    <p className="text-sm font-medium">Loading Document...</p>
                  </div>
                )}

                {pdfStatus === "valid" && (
                  <iframe
                    src={pdf}
                    title="Certificate PDF"
                    className="w-full h-full border-none"
                    onLoad={() => setPdfStatus("valid")} // Ensure spinner goes away
                  />
                )}

                {pdfStatus === "invalid" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 text-red-500">
                      <ExternalLink className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Unable to Load Preview
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                      The document cannot be previewed directly here (possibly
                      due to security settings or broken link).
                    </p>
                    <a
                      href={pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Open in New Tab
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certificate;
