"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const Projects = ({ data, themes }) => {
  const [expandedStates, setExpandedStates] = useState({});

  const toggleReadMore = (index) => {
    setExpandedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    // <!-- Projects Section -->
    <section
      id="projects"
      className="relative py-16 bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:bg-gradient-to-br dark:from-blue-950 dark:via-gray-900 dark:to-black transition-colors duration-700"
    >
      {/* <!-- Gradient Blobs for Background --> */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 dark:from-blue-500 dark:via-indigo-600 dark:to-cyan-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500 dark:from-indigo-500 dark:via-blue-600 dark:to-cyan-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        {/* <!-- Section Title --> */}
        <div className="text-center mb-12 text-gray-800 dark:text-white">
          <p
            className={cn(
              "bg-clip-text text-transparent font-semibold uppercase tracking-widest mb-2",
              themes?.isGradient
                ? themes?.primaryGradient
                : "text-blue-600 dark:text-cyan-400",
            )}
          >
            {data?.superTitle ?? "Browse My Recent"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            {data?.title ?? "Featured Projects"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto">
            {data?.description ??
              "Showcasing my latest work and development projects with modern technologies"}
          </p>
        </div>

        {/* <!-- Project Cards Grid --> */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data?.items?.map((project, index) => {
            const isExpanded = expandedStates[index];
            const isLongDescription = project.description.length > 75;

            return (
              <div
                key={index}
                className="bg-white/40 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition transform duration-300"
              >
                <div
                  className={cn(
                    "h-48 flex items-center justify-center text-white text-5xl rounded-t-xl",
                    project.gradient, // Use gradient from data
                  )}
                >
                  <i className={project.icon}></i>
                </div>
                <div className="p-6 text-gray-800 dark:text-white">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-justify dark:text-gray-300 mb-4">
                    {isExpanded
                      ? project.description
                      : project.description.slice(0, 75) +
                        (isLongDescription ? "..." : "")}
                  </p>
                  {isLongDescription && (
                    <button
                      onClick={() => toggleReadMore(index)} // Pass index to toggle
                      className={cn(
                        "hover:underline text-sm mb-4 bg-clip-text text-transparent",
                        themes?.isGradient
                          ? themes?.primaryGradient
                          : "text-blue-600 dark:text-cyan-400",
                      )}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                  <div className="flex gap-4 mt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      className={cn(
                        "px-4 py-2 rounded-full font-medium bg-gray-200 dark:bg-white/10 transition",
                        themes?.isGradient
                          ? themes?.bgHover
                          : "hover:bg-gradient-to-r hover:from-blue-500 hover:to-sky-500 hover:text-white",
                      )}
                      rel="noreferrer"
                    >
                      <i className="fab fa-github"></i> GitHub
                    </a>
                    {project.demo && project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        className={cn(
                          "px-4 py-2 rounded-full font-medium bg-gray-200 dark:bg-white/10 transition",
                          themes?.isGradient
                            ? themes?.bgHover
                            : "hover:bg-gradient-to-r hover:from-blue-500 hover:to-sky-500 hover:text-white",
                        )}
                        rel="noreferrer"
                      >
                        <i className="fas fa-external-link-alt"></i> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
