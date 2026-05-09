const axios = require("axios");
const { getToken } = require("../config/auth");
const { Log } = require("../../logging_middleware/index");
require("dotenv").config();

// Priority weights
const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getPriorityNotifications(topN = 10) {
  try {
    Log("backend", "info", "service", "Fetching notifications from API");

    const token = await getToken();
    const response = await axios.get(
      `${process.env.BASE_URL}/notifications`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const notifications = response.data.notifications;

    Log("backend", "info", "service", `Fetched ${notifications.length} notifications`);

    // Score each notification
    const scored = notifications.map((n) => {
      const typeScore = TYPE_WEIGHT[n.Type] || 0;
      const recencyScore = new Date(n.Timestamp).getTime();
      const priorityScore = typeScore * 1e13 + recencyScore;
      return { ...n, priorityScore };
    });

    // Sort by priority descending and take top N
    const topNotifications = scored
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .slice(0, topN);

    Log("backend", "info", "service", `Returning top ${topN} priority notifications`);

    return topNotifications;
  } catch (error) {
    Log("backend", "error", "service", `Failed to fetch notifications: ${error.message}`);
    throw error;
  }
}

module.exports = { getPriorityNotifications };