// src/services/projectService.js
import axios from "axios";

const API_ENDPOINT = "/api/v1/project";

export const fetchProjectsData = async () => {
  const response = await axios.get(API_ENDPOINT);
  return response.data.data;
};

export const updateProjectsData = async (data) => {
  const response = await axios.post(API_ENDPOINT, data);
  return response.data;
};
