import { cn } from "@/lib/utils";

const Experience = ({data, themes }) => {
  return (
    // <!-- Experience Section -->
    <section
      id="experience"
      className="py-16 relative
                bg-gradient-to-br from-blue-100 via-white to-cyan-100
                dark:bg-gradient-to-br dark:from-blue-950 dark:via-gray-900 dark:to-black
                transition-colors duration-700 overflow-hidden"
    >
      {/* <!-- Floating Gradient Blobs --> */}
      <div className="absolute inset-0 pointer-events-none">
        {/* <!-- Left Blob --> */}
        <div
          className="absolute top-0 left-0 w-[300px] h-[300px]
                        bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500
                        dark:from-blue-500 dark:via-indigo-600 dark:to-cyan-500
                        opacity-20 rounded-full blur-3xl animate-pulse"
        ></div>
        {/* <!-- Right Blob --> */}
        <div
          className="absolute bottom-0 right-0 w-[300px] h-[300px]
                        bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500
                        dark:from-indigo-500 dark:via-blue-600 dark:to-cyan-500
                        opacity-20 rounded-full blur-3xl animate-pulse"
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
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
            {data?.superTitle ?? "Professional Journey"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              {data?.title ?? "Work Experience"}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-2 max-w-xl mx-auto">
            {data?.description ?? "My professional roles and contributions in the tech industry"}
          </p>
        </div>

        {/* <!-- Experience Timeline --> */}
        <div className="space-y-8">

           {data?.jobs?.map((job, index) => (
            <div
              key={index}
              className="bg-white/40 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20
                            rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1
                            transition duration-300 p-6"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {job.role}
                </h3>
                <p
                  className={cn(
                    "font-medium bg-clip-text text-transparent",
                    themes?.isGradient
                      ? themes?.primaryGradient
                      : "text-blue-600 dark:text-cyan-400",
                  )}
                >
                  {job.company}
                </p>
                <p className="text-gray-400 dark:text-gray-300 text-sm flex items-center gap-2 mt-1">
                  <i className="far fa-calendar-alt"></i> {job.duration}
                </p>
              </div>

              <ul className="list-none space-y-2 text-gray-600 dark:text-gray-300">
                {job.responsibilities?.map((responsibility, rIndex) => (
                  <li key={rIndex} className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
