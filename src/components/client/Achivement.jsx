import { cn } from "@/lib/utils";

const Achivement = ({ data, themes }) => {
  return (
    // <!-- Achievements Section -->
    <section
      id="achievements"
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
            {data?.superTitle ?? "My"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">
            {data?.title ?? "Achievements"}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-2 max-w-xl mx-auto">
            {data?.description ??
              "Awards and accomplishments that highlight my academic excellence and technical expertise"}
          </p>
        </div>

        {/* <!-- Achievements Grid --> */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* <!-- Achievement Card --> */}

          {data?.items?.map((achievement, index) => (
            <div
              key={index}
              className="bg-white/40 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 text-center p-6"
            >
              <div
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl", // Increased icon size for better visibility
                  themes?.isGradient
                    ? themes?.primaryGradient
                    : "bg-gradient-to-r from-indigo-500 to-purple-500", // Default gradient
                )}
              >
                <i className={achievement.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {achievement.title}
              </h3>
              <p className="text-gray-600 text-justify dark:text-gray-300 leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achivement;
