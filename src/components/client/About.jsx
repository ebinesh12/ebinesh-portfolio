import { cn } from "@/lib/utils";

const About = ({ data, themes }) => {
  return (
    // <!-- About Section -->
    <section
      id="about"
      className="py-20 transition-colors duration-700
            bg-gradient-to-br from-blue-100 via-white to-cyan-100
            dark:bg-gradient-to-br dark:from-blue-950 dark:via-gray-900 dark:to-black"
    >
      <div className="max-w-6xl mx-auto px-6">
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
            {data?.superTitle ?? "Get To Know More"}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {data?.title ?? "About Me"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {data?.description ??
              "Discover my journey, education, and passion for technology and quality assurance"}
          </p>
        </div>

        {/* <!-- About Content --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* <!-- About Image --> */}
          <div className="text-center">
            <div
              className={cn(
                "w-72 h-80 rounded-2xl flex items-center justify-center text-white text-6xl mx-auto relative shadow-xl overflow-hidden",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 dark:from-blue-600 dark:via-indigo-600 dark:to-cyan-500",
              )}
            >
              <i className={data?.icon ?? "fas fa-graduation-cap"}></i>
              <div className="absolute top-0 left-0 w-full h-full bg-white/10 dark:bg-white/5 animate-spin-slow"></div>
            </div>
          </div>

          {/* <!-- About Text --> */}
          <div>
            <h3
              className={cn(
                "text-2xl font-bold bg-clip-text text-transparent mb-4",
                themes?.isGradient
                  ? themes?.primaryGradient
                  : "text-gray-900 dark:text-white",
              )}
            >
              {data?.story?.title ?? "My Story & Background"}
            </h3>

            {data?.story?.paragraphs?.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg text-justify"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* <!-- Education Timeline --> */}
        <div className="md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {data?.education?.map((edu, index) => (
            <div
              key={index}
              className={cn(
                "bg-white dark:bg-white/10 p-6 rounded-lg shadow-md border-l-4 border-transparent hover:translate-x-2 transition-all duration-300",
                themes?.isGradient
                  ? themes?.border
                  : "hover:border-blue-600 dark:hover:border-cyan-400",
              )}
            >
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {edu.degree}
              </h4>
              <p
                className={cn(
                  "font-semibold mb-1 bg-clip-text text-transparent",
                  themes?.isGradient
                    ? themes?.primaryGradient
                    : "text-blue-600 dark:text-cyan-400",
                )}
              >
                {edu.institution}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">
                {edu.duration}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-justify">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
