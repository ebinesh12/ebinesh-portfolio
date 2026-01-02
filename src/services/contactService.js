import axios from "axios";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL + "/api/v1/contact" ||
  "http://localhost:3000/api/v1/contact";

export const getMessages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await axios.delete(`${API_URL}?id=${id}`);
  return response.data;
};

export const updateMessage = async (id, data) => {
  const response = await axios.put(`${API_URL}?id=${id}`, data);
  return response.data;
};
