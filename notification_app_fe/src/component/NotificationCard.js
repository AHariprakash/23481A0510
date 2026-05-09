import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const typeColors = {
  Placement: "success",
  Result: "primary",
  Event: "warning",
};

const NotificationCard = ({ notification, index, isNew }) => {
  return (
    <Card
      sx={{
        mb: 1.5,
        borderLeft: `5px solid`,
        borderLeftColor: `${typeColors[notification.Type] || "grey"}.main`,
        backgroundColor: isNew ? "#f0f7ff" : "#fff",
        boxShadow: isNew ? "0 2px 12px rgba(33,150,243,0.15)" : 1,
        transition: "all 0.2s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {index !== undefined && (
            <Typography sx={{ fontWeight: "bold", color: "text.secondary", minWidth: 24 }}>
              {index + 1}
            </Typography>
          )}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography fontWeight={isNew ? 700 : 500} fontSize={15}>
                {notification.Message}
              </Typography>
              {isNew && <CircleIcon sx={{ fontSize: 10, color: "primary.main" }} />}
            </Box>
            <Typography fontSize={12} color="text.secondary">
              {notification.Timestamp}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {isNew && <Chip label="New" size="small" color="primary" variant="outlined" />}
          <Chip label={notification.Type} size="small" color={typeColors[notification.Type] || "default"} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;