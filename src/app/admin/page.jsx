"use client";

import { useTheme } from "@/providers/ThemeProvider"; // Keeping this if your child components need 'theme' prop
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Icons
import {
  LayoutTemplate,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  Award,
  Trophy,
  Mail,
} from "lucide-react";

// Components
import EditHero from "@/components/admin/EditHero";
import EditAbout from "@/components/admin/EditAbout";
import EditSkill from "@/components/admin/EditSkill";
import EditProject from "@/components/admin/EditProject";
import EditExperience from "@/components/admin/EditExperience";
import EditCertificate from "@/components/admin/EditCertificate";
import EditAchievement from "@/components/admin/EditAchievement";
import EditContact from "@/components/admin/EditContact";

// Tab Configuration
const tabItems = [
  { value: "hero", label: "Hero", icon: LayoutTemplate, component: EditHero },
  { value: "about", label: "About", icon: User, component: EditAbout },
  { value: "skills", label: "Skills", icon: Cpu, component: EditSkill },
  {
    value: "projects",
    label: "Projects",
    icon: FolderGit2,
    component: EditProject,
  },
  {
    value: "experience",
    label: "Experience",
    icon: Briefcase,
    component: EditExperience,
  },
  {
    value: "certificates",
    label: "Certificates",
    icon: Award,
    component: EditCertificate,
  },
  {
    value: "achievements",
    label: "Achievements",
    icon: Trophy,
    component: EditAchievement,
  },
  { value: "contact", label: "Contact", icon: Mail, component: EditContact },
];

export default function AdminDashboardPage() {
  const { theme } = useTheme();

  return (
    <Tabs defaultValue="hero" className="w-full">
      {/* Scrollable Tab Navigation */}
      <div className="w-full border-b border-neutral-200 bg-white/50 p-2 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/50 rounded-t-xl">
        <TabsList className="flex h-auto w-full justify-start gap-2 overflow-x-auto bg-transparent p-0 pb-2 scrollbar-hide md:pb-0">
          {tabItems.map((item) => {
            const Icon = item.icon;
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className={cn(
                  "group flex min-w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white",
                  // Active State Styling
                  "data-[state=active]:bg-neutral-900 data-[state=active]:text-white data-[state=active]:shadow-md",
                  "dark:data-[state=active]:bg-white dark:data-[state=active]:text-neutral-900",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {/* Tab Content Area */}
      <div className="p-4 md:p-6 lg:p-8">
        {tabItems.map((item) => {
          const Component = item.component;
          return (
            <TabsContent
              key={item.value}
              value={item.value}
              className="mt-0 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              {/* 
                 Pass 'theme' if your edit components rely on it. 
                 Ideally, refactor those components to use Tailwind 'dark:' classes eventually.
              */}
              <Component themes={theme} />
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
}
