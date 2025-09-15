"use client";
import EditHero from "@/components/admin/EditHero";
import EditAbout from "@/components/admin/EditAbout";
import EditSkill from "@/components/admin/EditSkill";
import EditProject from "@/components/admin/EditProject";
import EditExperience from "@/components/admin/EditExperience";
import EditCertificate from "@/components/admin/EditCertificate";
import EditAchievement from "@/components/admin/EditAchievement";
import EditContact from "@/components/admin/EditContact";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTheme } from "@/utils/ThemeProvider";

export default function AdminDashboardPage() {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "relative min-h-screen p-6 md:p-10 overflow-hidden transition-colors duration-300",
        theme?.isGradient
          ? theme?.sectionGradient
          : "bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-blue-950 dark:via-gray-900 dark:to-black",
      )}
    >
      {/* Floating gradient effects with blue glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Blob */}
        <div
          className={cn(
            "absolute top-0 right-0 w-[350px] h-[350px] opacity-20 rounded-full blur-3xl animate-pulse",
            theme?.isGradient
              ? theme?.primaryGradient
              : "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 dark:from-blue-500 dark:via-indigo-600 dark:to-cyan-500",
          )}
        ></div>
        {/* Right Blob */}
        <div
          className="absolute bottom-0 left-0 w-[350px] h-[350px]
                        bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500
                        dark:from-indigo-500 dark:via-blue-600 dark:to-cyan-500
                        opacity-20 rounded-full blur-3xl animate-pulse"
        ></div>
      </div>

      <h1
        className={cn(
          "text-3xl font-bold mb-6 bg-clip-text text-transparent",
          theme?.isGradient
            ? theme?.primaryGradient
            : "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500",
        )}
      >
        Manage Portfolio Content
      </h1>
      <p className="text-muted-foreground mb-8">
        Select a section below to update its content. Changes are saved
        automatically when you click the save button in each section.
      </p>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-lg p-1.5">
          {[
            "hero",
            "about",
            "skills",
            "projects",
            "experience",
            "certificates",
            "achievements",
            "contact",
          ].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={cn(
                "capitalize text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-300",
                "data-[state=active]:bg-white/30 data-[state=active]:dark:bg-black/30 data-[state=active]:shadow-md data-[state=active]:backdrop-blur-md data-[state=active]:rounded-md data-[state=active]:text-transparent data-[state=active]:bg-clip-text",
                "data-[state=active]:bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500",
              )}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="hero" className="mt-6">
          <EditHero themes={theme} />
        </TabsContent>
        <TabsContent value="about" className="mt-6">
          <EditAbout themes={theme} />
        </TabsContent>
        <TabsContent value="skills" className="mt-6">
          <EditSkill themes={theme} />
        </TabsContent>
        <TabsContent value="projects" className="mt-6">
          <EditProject themes={theme} />
        </TabsContent>
        <TabsContent value="experience" className="mt-6">
          <EditExperience themes={theme} />
        </TabsContent>
        <TabsContent value="certificates" className="mt-6">
          <EditCertificate themes={theme} />
        </TabsContent>
        <TabsContent value="achievements" className="mt-6">
          <EditAchievement themes={theme} />
        </TabsContent>
        <TabsContent value="contact" className="mt-6">
          <EditContact themes={theme} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
