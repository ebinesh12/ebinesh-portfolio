import axios from "axios";

const getData = async () => {
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

  try {
    const dataPromises = endpoints.map((endpoint) =>
      axios.get(`${API_URL}/api/v1/${endpoint}`),
    );

    const responses = await axios.all(dataPromises);

    const portfolioData = responses.reduce((acc, response, index) => {
      const endpoint = endpoints[index];
      acc[endpoint] = response.data.data;
      return acc;
    }, {});

    return portfolioData;
  } catch (error) {
    console.error("Failed to fetch portfolio data:", error);
    // throw new Error("There was an issue fetching portfolio data. Please try again later.");
  }
};
export default getData;
