import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/users";

export const fetchUsers = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_BASE_URL}?${params}`);
  return response.data.users;
};
