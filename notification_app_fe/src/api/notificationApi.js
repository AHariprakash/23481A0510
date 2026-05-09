import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const fetchTopNotifications = async (topN = 10) => {
  const response = await axios.get(`${BASE_URL}/notifications?top=${topN}`);
  return response.data.notifications;
};