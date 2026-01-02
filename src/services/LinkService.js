// src/services/linkService.js
import axios from "axios";

const API_ENDPOINT = "/api/v1/link";

/**
 * Fetches the Contact/Link section data.
 */
export const fetchLinkData = async () => {
  const response = await axios.get(API_ENDPOINT);
  // Returns the nested data object required by the form
  return response.data.data;
};

/**
 * Updates the Contact/Link section data.
 */
export const updateLinkData = async (data) => {
  const response = await axios.post(API_ENDPOINT, data);
  return response.data;
};
