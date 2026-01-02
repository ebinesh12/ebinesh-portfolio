// src/services/achievementService.js
import axios from "axios";

const API_ENDPOINT = "/api/v1/achievement";

/**
 * Fetches the Achievement section data.
 */
export const fetchAchievementsData = async () => {
  const response = await axios.get(API_ENDPOINT);
  // Returns the nested data object required by the form
  return response.data.data;
};

/**
 * Updates the Achievement section data.
 */
export const updateAchievementsData = async (data) => {
  const response = await axios.post(API_ENDPOINT, data);
  return response.data;
};
