// src/services/aboutService.js
import axios from "axios";

const API_ENDPOINT = "/api/v1/about";

export const fetchAboutData = async () => {
  const response = await axios.get(API_ENDPOINT);
  // Assuming your API returns { success: true, data: { ... } }
  return response.data.data;
};

export const updateAboutData = async (data) => {
  const response = await axios.post(API_ENDPOINT, data);
  return response.data;
};
