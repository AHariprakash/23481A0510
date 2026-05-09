import React from "react";

const typeColors = {
  Placement: "#4CAF50",
  Result: "#2196F3",
  Event: "#FF9800",
};

const NotificationCard = ({ notification, index }) => {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "10px",
      padding: "16px 20px",
      marginBottom: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      borderLeft: `5px solid ${typeColors[notification.Type] || "#ccc"}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{
          background: "#f0f0f0",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "14px",
        }}>
          {index + 1}
        </span>
        <div>
          <p style={{ margin: 0, fontWeight: "600", fontSize: "15px" }}>
            {notification.Message}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#888" }}>
            {notification.Timestamp}
          </p>
        </div>
      </div>
      <span style={{
        background: typeColors[notification.Type] || "#ccc",
        color: "#fff",
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
      }}>
        {notification.Type}
      </span>
    </div>
  );
};

export default NotificationCard;