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
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto bg-white/20 dark:bg-white/15 border dark:border-white/30 backdrop-blur-sm rounded-lg p-1.5">
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
                "capitalize text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 data-[state=active]:bg-white/30 data-[state=active]:dark:bg-white/10 data-[state=active]:shadow-md ",
                "data-[state=active]:backdrop-blur-md data-[state=active]:rounded-md data-[state=active]:text-transparent data-[state=active]:bg-clip-text", 
                `data-[state=active]:${theme?.primaryGradient ?? "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"}`
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
  );
}
