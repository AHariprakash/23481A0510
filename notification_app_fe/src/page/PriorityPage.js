import React, { useState, useEffect } from "react";
import {
  Box, Typography, Container, AppBar, Toolbar,
  Button, CircularProgress, Alert, ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchPriorityNotifications } from "../api/notificationApi";
import NotificationCard from "../component/NotificationCard";

const VIEWED_KEY = "viewed_notifications";
const getViewed = () => JSON.parse(localStorage.getItem(VIEWED_KEY) || "[]");
const markViewed = (id) => {
  const viewed = getViewed();
  if (!viewed.includes(id)) {
    localStorage.setItem(VIEWED_KEY, JSON.stringify([...viewed, id]));
  }
};

const PriorityPage = () => {
  const navigate = useNavigate();
  const [topN, setTopN] = useState(10);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const viewed = getViewed();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchPriorityNotifications(topN);
        setNotifications(data);
      } catch {
        setError("Failed to fetch priority notifications");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [topN]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">⭐ Priority Inbox</Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            📬 All Notifications
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>Priority Inbox</Typography>
        <Typography color="text.secondary" mb={3}>
          Top {topN} most important notifications
        </Typography>

        <ToggleButtonGroup
          value={topN}
          exclusive
          onChange={(e, val) => val && setTopN(val)}
          sx={{ mb: 3 }}
        >
          <ToggleButton value={10}>Top 10</ToggleButton>
          <ToggleButton value={15}>Top 15</ToggleButton>
          <ToggleButton value={20}>Top 20</ToggleButton>
        </ToggleButtonGroup>

        {loading && <Box textAlign="center"><CircularProgress /></Box>}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && notifications.map((n, i) => (
          <Box key={n.ID} onClick={() => markViewed(n.ID)}>
            <NotificationCard notification={n} index={i} isNew={!viewed.includes(n.ID)} />
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default PriorityPage;