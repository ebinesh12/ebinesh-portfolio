import { cn } from "@/lib/utils";

const Skills = ({ data, themes }) => {
  return (
    // <!-- Skills Section -->
    <section
      id="skills"
      className="relative py-20 bg-gradient-to-br from-blue-100 via-white to-cyan-100
            dark:bg-gradient-to-br dark:from-blue-950 dark:via-gray-900 dark:to-black transition-colors duration-700"
    >
      {/* <!-- Floating gradient blobs --> */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[300px] h-[300px]
                    bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500
                    dark:from-blue-500 dark:via-indigo-600 dark:to-cyan-500
                    opacity-20 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-[300px] h-[300px]
                    bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500
                    dark:from-indigo-500 dark:via-blue-600 dark:to-cyan-500
                    opacity-20 rounded-full blur-3xl animate-pulse"
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
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
            {data?.superTitle ?? "Explore My"}
          </p>
          <h2 className="text-4xl font-bold mb-4">
            {data?.title ?? "Skills & Technologies"}
          </h2>
          <p className="text-lg opacity-80 max-w-xl mx-auto">
            {data?.description ??
              "A comprehensive overview of my technical skills and expertise across different domains"}
          </p>
        </div>

        {/* <!-- Skills Grid --> */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {/* <!-- Map over skill categories --> */}
          {data?.categories?.map((category, index) => (
            <div
              key={index}
              className="bg-white/50 dark:bg-white/10 p-6 rounded-xl shadow-md backdrop-blur-md
                                hover:-translate-y-2 hover:shadow-xl transition border border-gray-200 dark:border-white/20"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <i
                  className={cn(
                    `${category.icon} text-2xl bg-clip-text text-transparent`,
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "text-indigo-600",
                  )}
                ></i>{" "}
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* <!-- Map over skills within a category --> */}
                {category.items?.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={cn(
                      "skill-item bg-gray-900/12 hover:bg-gray-900/15 dark:bg-white/2  dark:hover:bg-white/7 border border-gray-200 dark:border-white/5 p-4 rounded-lg text-center text-gray-800 hover:dark:text-white  hover:shadow-lg transition flex flex-col items-center justify-center gap-1",
                      `hover:${skill?.color}`,
                    )}
                  >
                    <i className={`${skill.icon} text-2xl transition`}></i>
                    <div className="font-semibold  dark:text-gray-200">
                      {skill.name}
                    </div>
                    <div className="text-sm opacity-70 text-gray-500 dark:text-gray-400">
                      {skill.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
