import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const Skeletons = () => {
  return (
    <div>
      {/* Header Section Skeleton */}
      <nav className="fixed pt-1 top-0 left-0 w-full bg-gray-100 dark:bg-gray-900 shadow-md z-40">
        {/* Progress Bar Skeleton */}
        <Skeleton className="h-1 w-0" />

        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo Skeleton */}
          <Skeleton className="h-6 w-32" />

          {/* Desktop Menu Skeleton */}
          <ul className="hidden md:flex space-x-6">
            {[...Array(6)].map((_, i) => (
              <li key={i}>
                <Skeleton className="h-6 w-20" />
              </li>
            ))}
          </ul>

          {/* Mobile Toggle Skeleton */}
          <div className="md:hidden">
            <Skeleton className="h-6 w-6" />
          </div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden bg-gray-100 dark:bg-gray-900"
      >
        <div className="relative z-10 grid max-w-6xl mx-auto px-6 lg:grid-cols-2 gap-12 mt-6 items-center">
          {/* Text Section Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-4 mt-6">
              <Skeleton className="h-12 w-32 rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>
            <div className="flex gap-4 mt-6">
              <Skeleton className="h-11 w-11 rounded-full" />
              <Skeleton className="h-11 w-11 rounded-full" />
              <Skeleton className="h-11 w-11 rounded-full" />
            </div>
          </div>

          {/* Profile Card Skeleton */}
          <div className="flex justify-center">
            <div className="bg-white/40 dark:bg-white/15 p-8 rounded-2xl border border-gray-300 dark:border-white/30 text-center">
              <Skeleton className="w-48 h-48 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-center gap-2 mt-2">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="h-6 w-48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-1/4 mx-auto" />
            <Skeleton className="h-10 w-1/2 mx-auto mt-4" />
            <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Skeleton className="w-72 h-80 rounded-2xl mx-auto" />
            <div>
              <Skeleton className="h-8 w-1/2 mb-4" />
              <Skeleton className="h-5 w-full mb-4" />
              <Skeleton className="h-5 w-full mb-4" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>
          <div className="md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="bg-white dark:bg-white/10 p-6 rounded-lg shadow-md">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-4" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="bg-white dark:bg-white/10 p-6 rounded-lg shadow-md">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-4" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section Skeleton */}
      <section
        id="experience"
        className="py-16 relative bg-gray-100 dark:bg-gray-900"
      >
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-1/4 mx-auto" />
            <Skeleton className="h-10 w-1/3 mx-auto mt-2" />
            <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
          </div>
          <div className="space-y-8">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="bg-white/40 dark:bg-white/10 p-6 rounded-xl shadow-md"
              >
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-5 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section Skeleton */}
      <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-1/5 mx-auto" />
            <Skeleton className="h-10 w-1/2 mx-auto mt-4" />
            <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white/50 dark:bg-white/10 p-6 rounded-xl shadow-md"
              >
                <Skeleton className="h-8 w-3/4 mb-6" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="p-4 rounded-lg text-center"
                    >
                      <Skeleton className="w-10 h-10 rounded-full mx-auto" />
                      <Skeleton className="h-5 w-3/4 mx-auto mt-2" />
                      <Skeleton className="h-4 w-1/2 mx-auto mt-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section Skeleton */}
      <section id="projects" className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 z-10">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-1/4 mx-auto" />
            <Skeleton className="h-10 w-1/3 mx-auto mt-2" />
            <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white/40 dark:bg-white/10 rounded-xl shadow-md"
              >
                <Skeleton className="h-48 rounded-t-xl" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex gap-4 mt-4">
                    <Skeleton className="h-10 w-24 rounded-full" />
                    <Skeleton className="h-10 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section Skeleton */}
      <section id="achievements" className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-1/6 mx-auto" />
            <Skeleton className="h-10 w-1/3 mx-auto mt-2" />
            <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white/40 dark:bg-white/10 p-6 rounded-xl shadow-md text-center"
              >
                <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-16 w-full mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section Skeleton */}
      <section id="certificates" className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-1/6 mx-auto" />
            <Skeleton className="h-10 w-1/3 mx-auto mt-2" />
            <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white/40 dark:bg-white/10 p-6 rounded-xl shadow-md text-center flex flex-col"
              >
                <div className="flex-grow">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-1" />
                  <Skeleton className="h-5 w-1/2 mx-auto mb-2" />
                  <Skeleton className="h-12 w-full mx-auto mb-4" />
                </div>
                <Skeleton className="h-12 w-full mt-auto rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section id="contact" className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-1/5 mx-auto" />
            <Skeleton className="h-10 w-1/3 mx-auto mt-2" />
            <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Skeleton className="h-8 w-1/2 mb-6" />
              <div className="space-y-8">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center gap-4 p-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-grow">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-5 w-3/4 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-8 w-1/2 mb-6" />
              <form className="space-y-4">
                <div>
                  <Skeleton className="h-6 w-1/4 mb-1" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-6 w-1/4 mb-1" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-6 w-1/4 mb-1" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-6 w-1/4 mb-1" />
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-12 w-40 rounded-xl" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section Skeleton */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          {/* Social Links Skeleton */}
          <div className="flex justify-center space-x-6 mb-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-full" />
            ))}
          </div>

          {/* Footer Navigation Skeleton */}
          <div className="mb-4">
            <ul className="flex flex-wrap justify-center gap-4">
              {[...Array(6)].map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-5 w-24" />
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright Skeleton */}
          <Skeleton className="h-5 w-1/3 mx-auto" />
        </div>
      </footer>
    </div>
  );
};

export default Skeletons;
