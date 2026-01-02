// src/services/heroService.js
import axios from "axios";

const API_ENDPOINT = "/api/v1/hero";

export const fetchHeroData = async () => {
  const response = await axios.get(API_ENDPOINT);
  return response.data.data;
};

export const updateHeroData = async (data) => {
  const response = await axios.post(API_ENDPOINT, data);
  return response.data;
};
