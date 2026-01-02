// src/services/certificateService.js
import axios from "axios";

const API_ENDPOINT = "/api/v1/certificate";

/**
 * Fetches the Certificate section data.
 */
export const fetchCertificatesData = async () => {
  const response = await axios.get(API_ENDPOINT);
  // Returns the nested data object required by the form
  return response.data.data;
};

/**
 * Updates the Certificate section data.
 */
export const updateCertificatesData = async (data) => {
  const response = await axios.post(API_ENDPOINT, data);
  return response.data;
};
