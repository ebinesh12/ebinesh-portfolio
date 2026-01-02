// src/services/experienceService.js
import axios from "axios";

const API_ENDPOINT = "/api/v1/experience";

export const fetchExperienceData = async () => {
  const response = await axios.get(API_ENDPOINT);
  // Return the nested data object required by the form
  return response.data.data;
};

export const updateExperienceData = async (data) => {
  const response = await axios.post(API_ENDPOINT, data);
  return response.data;
};
