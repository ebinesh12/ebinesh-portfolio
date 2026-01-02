"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { usePortfolioData } from "@/services/dataService";

import Header from "@/components/client/Header";
import Hero from "@/components/client/Hero";
import About from "@/components/client/About";
import Experience from "@/components/client/Experience";
import Skills from "@/components/client/Skill";
import Projects from "@/components/client/Project";
import Achievement from "@/components/client/Achivement";
import Certificate from "@/components/client/Certificate";
import Contact from "@/components/client/Contact";
import Footer from "@/components/client/Footer";
import Skeletons from "@/components/client/Skeletons";
import GlobalError from "./global-error";

const Page = () => {
  const { theme } = useTheme();

  // 1. Fetch data using the hook
  const { data: portfolioData, isLoading, isError } = usePortfolioData();

  // 2. Handle Loading State
  if (isLoading) {
    return <Skeletons />;
  }

  // 3. Handle Error State (Optional but recommended)
  if (isError) {
    return <GlobalError />;
  }

  return (
    <>
      <Header themes={theme} />
      <Hero data={portfolioData?.hero} themes={theme} />
      <About data={portfolioData?.about} themes={theme} />
      <Experience data={portfolioData?.experience} themes={theme} />
      <Skills data={portfolioData?.skill} themes={theme} />
      <Projects data={portfolioData?.project} themes={theme} />
      <Achievement data={portfolioData?.achievement} themes={theme} />
      <Certificate data={portfolioData?.certificate} themes={theme} />
      <Contact data={portfolioData?.link} themes={theme} />
      <Footer themes={theme} />
    </>
  );
};

export default Page;
