import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const fetchNotifications = async (page = 1, limit = 10, notification_type = null) => {
  const params = { page, limit };
  if (notification_type) params.notification_type = notification_type;
  const response = await axios.get(`${BASE_URL}/notifications`, { params });
  return response.data;
};

export const fetchPriorityNotifications = async (topN = 10) => {
  const response = await axios.get(`${BASE_URL}/notifications/priority`, { params: { top: topN } });
  return response.data.notifications;
};