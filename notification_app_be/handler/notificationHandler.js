const { getPriorityNotifications } = require("../service/notificationService");
const { Log } = require("../../logging_middleware/index");

async function getTopNotifications(req, res) {
  try {
    const topN = parseInt(req.query.top) || 10;
    Log("backend", "info", "handler", `Request received for top ${topN} notifications`);
    const notifications = await getPriorityNotifications(topN);
    res.json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    Log("backend", "error", "handler", `Handler error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getTopNotifications };