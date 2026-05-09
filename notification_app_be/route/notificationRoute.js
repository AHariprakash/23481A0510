const express = require("express");
const router = express.Router();
const { getTopNotifications } = require("../handler/notificationHandler");

router.get("/notifications", getTopNotifications);

module.exports = router;