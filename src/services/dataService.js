import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const endpoints = [
  "hero",
  "about",
  "skill",
  "project",
  "experience",
  "certificate",
  "achievement",
  "link",
];

// 1. Define a generic fetcher function
const fetchPortfolioSection = async (endpoint) => {
  const response = await axios.get(`${API_URL}/api/v1/${endpoint}`);
  return response.data.data;
};

export const usePortfolioData = () => {
  // 2. Use useQueries to run them in parallel
  const results = useQueries({
    queries: endpoints.map((endpoint) => ({
      queryKey: ["portfolio", endpoint],
      queryFn: () => fetchPortfolioSection(endpoint),
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    })),
  });

  // 3. Aggregate loading and error states
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const error = results.find((result) => result.error)?.error;

  // 4. Combine data back into the object structure { hero: ..., about: ... }
  const data = results.reduce((acc, result, index) => {
    const endpoint = endpoints[index];
    if (result.data) {
      acc[endpoint] = result.data;
    }
    return acc;
  }, {});

  return { data, isLoading, isError, error };
};
