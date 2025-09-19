import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/userStore";

const Hero = ({ data, themes }) => {
  const { user } = useUserStore();

  return (
    // <!-- Hero Section -->
    <section
      id="home"
      className={cn(
        "relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:bg-gradient-to-br dark:from-blue-950 dark:via-gray-900 dark:to-black transition-colors duration-700",
        themes?.isGradient
          ? themes?.sectionGradient
          : "bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-blue-950 dark:via-gray-900 dark:to-black",
      )}
    >
      {/* <!-- Floating gradient effects with blue glow --> */}
      <div className="absolute inset-0 pointer-events-none">
        {/* <!-- Left Blob --> */}
        <div
          className={cn(
            "absolute top-0 left-0 w-[350px] h-[350px] opacity-20 rounded-full blur-3xl animate-pulse",
            themes?.isGradient
              ? themes?.primaryGradient
              : "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 dark:from-blue-500 dark:via-indigo-600 dark:to-cyan-500",
          )}
        ></div>
        {/* <!-- Right Blob --> */}
        <div
          className="absolute bottom-0 right-0 w-[350px] h-[350px]
                        bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500
                        dark:from-indigo-500 dark:via-blue-600 dark:to-cyan-500
                        opacity-20 rounded-full blur-3xl animate-pulse"
        ></div>
      </div>

      {/* <!-- Hero Content --> */}
      <div className="relative z-10 grid max-w-6xl mx-auto px-6 lg:grid-cols-2 gap-12 mt-6 items-center">
        {/* <!-- Text Section --> */}
        <div className="space-y-6 text-gray-800 dark:text-white transition-colors duration-700">
          <p className="text-lg opacity-90">
            {data?.personalInfo?.greeting || "👋 Hello, I'm"}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight ">
            {data?.personalInfo?.name ?? "Nick Franklin"}
          </h1>
          <p
            className={cn(
              "text-xl font-medium opacity-90 bg-clip-text text-transparent",
              themes?.isGradient ? themes?.primaryGradient : "",
            )}
          >
            {data?.personalInfo?.title ?? "Aspiring Developer"}
          </p>
          <p className="text-base text-justify md:text-lg opacity-80 leading-relaxed">
            {data?.about?.summary ??
              "Passionate and dedicated Software Developer with a solid foundation in software development, algorithms, data structures, and computer systems."}
          </p>

          <div className="flex gap-4 mt-6">
            {data?.actions?.map((action) => (
              <a
                key={action.id}
                href={
                  action.id === "resume"
                    ? `/api/v1/admin/${user.id}/res` || action.href
                    : action.href
                }
                target={action.id === "resume" ? "_blank" : "_self"}
                className={cn(
                  "px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
                  action.id === "contact"
                    ? themes?.isGradient
                      ? themes?.primaryGradient
                      : "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white"
                    : themes?.outlineBtn
                      ? themes?.outlineBtn
                      : "border border-gray-800 dark:border-white text-gray-800 dark:text-white",
                )}
                rel="noreferrer"
              >
                <i className={action.icon}></i> {action.text}
              </a>
            ))}
          </div>

          {/* <!-- Social Links --> */}
          <div className="flex gap-4 mt-6">
            {data?.socialLinks?.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-200 dark:bg-white/20
                                hover:bg-gradient-to-r hover:from-blue-500 hover:to-sky-500 hover:text-white
                                transition transform hover:-translate-y-1"
                rel="noreferrer"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* <!-- Profile Card --> */}
        <div className="flex justify-center">
          <div
            className="bg-white/40 dark:bg-white/15 backdrop-blur-lg p-8 rounded-2xl
                border border-gray-300 dark:border-white/30 text-center
                animate-[float_4s_ease-in-out_infinite] transition-colors duration-700"
          >
            <div
              className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400
                    dark:from-blue-500 dark:via-sky-500 dark:to-cyan-500
                    flex items-center justify-center mx-auto mb-4 text-6xl text-white shadow-lg animate-pulse overflow-hidden"
            >
              {/* <!-- Profile Image Component --> */}
              <img
                src={
                  `/api/v1/admin/${user?.id}/img` ||
                  data?.personalInfo?.image ||
                  "/images/profile.jpg"
                }
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-800 dark:text-white mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span
                className={cn(
                  "text-xl font-medium opacity-90 bg-clip-text text-transparent",
                  themes?.isGradient ? themes?.primaryGradient : "",
                )}
              >
                {data?.personalInfo?.availability ??
                  "Available for opportunities"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
