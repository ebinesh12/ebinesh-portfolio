// src/services/skillService.js
import axios from "axios";

const API_ENDPOINT = "/api/v1/skill";

export const fetchSkillsData = async () => {
  const response = await axios.get(API_ENDPOINT);
  return response.data.data;
};

export const updateSkillsData = async (data) => {
  const response = await axios.post(API_ENDPOINT, data);
  return response.data;
};
