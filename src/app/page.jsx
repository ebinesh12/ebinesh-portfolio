"use client";

import { useState, useEffect } from "react";
import getData from "@/services/dataService";
import { useTheme } from "@/utils/ThemeProvider";

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

const page = () => {
  const [portfolioData, setPortfolioData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const { theme } = useTheme();

  useEffect(() => {
    // Define an async function inside useEffect to call the data fetcher
    const fetchData = async () => {
      try {
        const data = await getData();
        setPortfolioData(data);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

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
export default page;
