"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const Certificate = ({ data, themes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdf, setPdf] = useState(null);
  // State to manage expanded state for each certificate individually
  const [expandedStates, setExpandedStates] = useState({});

  // Toggles the read more state for a specific certificate by its index
  const toggleReadMore = (index) => {
    setExpandedStates((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the boolean value
    }));
  };

  return (
    <>
      {/* <!-- Certificates Section --> */}
      <section
        id="certificates"
        className="py-16 bg-gray-100 dark:bg-gradient-to-br dark:from-blue-950 dark:via-gray-900 dark:to-black transition-colors duration-700"
      >
        <div className="container mx-auto px-4">
          {/* <!-- Section Title --> */}
          <div className="text-center mb-12">
            <p
              className={cn(
                "bg-clip-text text-transparent font-semibold uppercase tracking-widest mb-2",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "text-blue-600 dark:text-cyan-400",
              )}
            >
              {data?.superTitle ?? "Certificates"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              {data?.title ?? "Certificates"}
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mt-2 max-w-xl mx-auto">
              {data?.description ??
                "Professional certifications and courses that have enhanced my technical skills"}
            </p>
          </div>

          {/* <!-- Certificates Grid --> */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data?.items?.map((cert, index) => {
              const isExpanded = expandedStates[index];
              const isLongDescription = cert.description.length > 75;

              return (
                <div
                  key={index}
                  className="bg-white/40 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 p-6 text-center flex flex-col"
                >
                  <div className="flex-grow">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl",
                        themes?.isGradient
                          ? themes?.primaryGradient
                          : "bg-gradient-to-r from-indigo-500 to-purple-500",
                      )}
                    >
                      <i className="fa-solid fa-award"></i>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {cert.title ?? ""}
                    </h3>
                    <p
                      className={cn(
                        "font-medium mb-1 bg-clip-text text-transparent",
                        themes?.isGradient
                          ? themes?.primaryGradient
                          : "text-indigo-600 dark:text-indigo-400",
                      )}
                    >
                      Issued by: {cert.issuer}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2 leading-relaxed text-justify">
                      {isExpanded
                        ? cert.description
                        : cert.description.slice(0, 75) +
                          (isLongDescription ? "..." : "")}
                    </p>
                    {isLongDescription && (
                      <button
                        onClick={() => toggleReadMore(index)}
                        className="text-blue-500 hover:underline text-sm mb-4"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                    <p className="text-gray-400 text-sm flex items-center justify-center gap-2 mb-4">
                      <i className="far fa-calendar-alt"></i> {cert.date}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setPdf(cert.pdf);
                      setIsModalOpen(true);
                    }}
                    className={cn(
                      "inline-block mt-auto px-5 py-2 rounded-full font-semibold text-white shadow-md hover:scale-105 hover:shadow-2xl transition transform duration-300",
                      themes?.isGradient
                        ? themes?.primaryGradient
                        : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
                    )}
                  >
                    <i className="fas fa-eye"></i> View Certificate
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* <!-- Modal --> */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-4xl w-full h-[90vh] p-4 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-lg z-10"
            >
              &times;
            </button>

            {/* PDF Viewer */}
            <iframe
              src={pdf}
              title="Certificate PDF"
              className="w-full h-full rounded-lg border-none"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificate;
