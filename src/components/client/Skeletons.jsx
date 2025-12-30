import { Skeleton } from "@/components/ui/skeleton";

const Skeletons = () => {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-700 overflow-hidden">
      {/* --- Navigation Skeleton --- */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
          {/* Logo */}
          <Skeleton className="h-8 w-32 rounded-lg" />

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-20 rounded-full" />
            ))}
          </div>

          {/* Theme Toggle / Mobile Menu Placeholder */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="md:hidden h-9 w-9 rounded-md" />
          </div>
        </div>
      </nav>

      {/* --- Hero Section Skeleton --- */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <Skeleton className="h-8 w-40 rounded-full" /> {/* Greeting Pill */}
            <div className="space-y-4">
              <Skeleton className="h-16 w-3/4 rounded-xl" /> {/* Name */}
              <Skeleton className="h-10 w-2/3 rounded-lg" /> {/* Title */}
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-5/6 rounded-full" />
              <Skeleton className="h-4 w-4/6 rounded-full" />
            </div>
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-36 rounded-full" /> {/* Button 1 */}
              <Skeleton className="h-12 w-36 rounded-full" /> {/* Button 2 */}
            </div>
            <div className="flex gap-4 pt-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </div>

          {/* Right: Image Card */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              <Skeleton className="w-full h-full rounded-[2rem] rotate-6 opacity-50" />
              <Skeleton className="absolute inset-0 w-full h-full rounded-[2rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* --- About Section Skeleton --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col items-center mb-16 space-y-4">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-12 w-64 rounded-xl" />
            <Skeleton className="h-5 w-96 max-w-full rounded-full" />
          </div>

          {/* Content Split */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <Skeleton className="w-full aspect-square max-w-md rounded-[2rem] mx-auto lg:mx-0" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-48 rounded-lg" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full rounded-full" />
                ))}
              </div>
              <div className="space-y-3 pt-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-11/12 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Education Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-gray-200 dark:border-white/10 space-y-4"
              >
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/3 rounded-md" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <Skeleton className="h-5 w-1/2 rounded-md" />
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-3/4 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Experience (Timeline) Skeleton --- */}
      <section className="py-24">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16 space-y-4">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-12 w-64 rounded-xl" />
          </div>

          <div className="space-y-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8">
                {/* Timeline Node Mockup */}
                <div className="hidden md:flex w-1/2 justify-end pr-8 items-center">
                  {/* Alternating logic simulation */}
                  {i % 2 !== 0 && (
                    <Skeleton className="h-40 w-full rounded-2xl" />
                  )}
                </div>

                <div className="md:w-1/2 pl-8 border-l-2 border-gray-200 dark:border-white/10 relative">
                  <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-gray-200 dark:bg-white/10" />
                  {i % 2 === 0 ? (
                    <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 space-y-4 bg-white dark:bg-zinc-900">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-40 rounded-md" />
                          <Skeleton className="h-4 w-32 rounded-md" />
                        </div>
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-full rounded-full" />
                        <Skeleton className="h-3 w-5/6 rounded-full" />
                        <Skeleton className="h-3 w-4/6 rounded-full" />
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:block" /> // Spacer for alternating
                  )}
                  {/* Mobile View */}
                  <div className="md:hidden p-6 rounded-2xl border border-gray-200 dark:border-white/10 space-y-4">
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Skills Grid Skeleton --- */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16 space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-12 w-72 rounded-xl" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="h-6 w-32 rounded-md" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(6)].map((_, j) => (
                    <div
                      key={j}
                      className="h-24 rounded-lg border border-gray-100 dark:border-white/5 p-3 flex flex-col items-center justify-center gap-2"
                    >
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="w-16 h-3 rounded-full" />
                      <Skeleton className="w-full h-1 mt-auto rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Projects/Certificates Grid Skeleton --- */}
      <section className="py-24 bg-gray-50/50 dark:bg-zinc-900/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 space-y-4">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-12 w-80 rounded-xl" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-full" />
                    <Skeleton className="h-4 w-full rounded-full" />
                    <Skeleton className="h-4 w-2/3 rounded-full" />
                  </div>
                  <div className="pt-4 flex gap-3">
                    <Skeleton className="h-10 flex-1 rounded-lg" />
                    <Skeleton className="h-10 flex-1 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact Section Skeleton --- */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <Skeleton className="h-8 w-48 rounded-lg mb-6" />
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 p-5 rounded-2xl border border-gray-200 dark:border-white/10"
                >
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32 rounded-md" />
                    <Skeleton className="h-4 w-48 rounded-md" />
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900">
              <Skeleton className="h-8 w-48 rounded-lg mb-8" />
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                ))}
                <Skeleton className="h-32 w-full rounded-xl" /> {/* Textarea */}
                <Skeleton className="h-12 w-full rounded-xl" /> {/* Button */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer Skeleton --- */}
      <footer className="py-12 border-t border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-10 h-10 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-5 w-64 rounded-full" />
        </div>
      </footer>
    </div>
  );
};

export default Skeletons;
