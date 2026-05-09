import React, { useState } from "react";
import {
  Box, Typography, Container, ToggleButton, ToggleButtonGroup,
  Pagination, CircularProgress, Alert, AppBar, Toolbar, Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useNotifications from "../hook/useNotifications";
import NotificationCard from "../component/NotificationCard";

const VIEWED_KEY = "viewed_notifications";

const getViewed = () => JSON.parse(localStorage.getItem(VIEWED_KEY) || "[]");
const markViewed = (id) => {
  const viewed = getViewed();
  if (!viewed.includes(id)) {
    localStorage.setItem(VIEWED_KEY, JSON.stringify([...viewed, id]));
  }
};

const HomePage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(null);
  const { notifications, loading, error, totalPages } = useNotifications(page, 10, filter);
  const viewed = getViewed();

  const handleCardView = (id) => markViewed(id);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">📬 Campus Notifications</Typography>
          <Button color="inherit" onClick={() => navigate("/priority")}>
            ⭐ Priority Inbox
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>All Notifications</Typography>
        <Typography color="text.secondary" mb={3}>
          Filter and browse all campus notifications
        </Typography>

        {/* Filter */}
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, val) => { setFilter(val); setPage(1); }}
          sx={{ mb: 3 }}
        >
          <ToggleButton value={null}>All</ToggleButton>
          <ToggleButton value="Placement">Placement</ToggleButton>
          <ToggleButton value="Result">Result</ToggleButton>
          <ToggleButton value="Event">Event</ToggleButton>
        </ToggleButtonGroup>

        {loading && <Box textAlign="center"><CircularProgress /></Box>}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && notifications.map((n, i) => (
          <Box key={n.ID} onClick={() => handleCardView(n.ID)}>
            <NotificationCard
              notification={n}
              index={(page - 1) * 10 + i}
              isNew={!viewed.includes(n.ID)}
            />
          </Box>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, val) => setPage(val)}
              color="primary"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;