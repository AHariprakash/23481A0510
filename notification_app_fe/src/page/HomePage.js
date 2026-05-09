import React, { useState } from "react";
import useNotifications from "../hook/useNotifications";
import NotificationCard from "../component/NotificationCard";

const HomePage = () => {
  const [topN, setTopN] = useState(10);
  const { notifications, loading, error } = useNotifications(topN);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f7fa",
      padding: "40px 20px",
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", color: "#333", marginBottom: "8px" }}>
          📬 Priority Inbox
        </h1>
        <p style={{ textAlign: "center", color: "#888", marginBottom: "30px" }}>
          Showing top {topN} most important notifications
        </p>

        {/* Top N selector */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <label style={{ marginRight: "10px", fontWeight: "600" }}>
            Show top:
          </label>
          {[10, 15, 20].map((n) => (
            <button
              key={n}
              onClick={() => setTopN(n)}
              style={{
                margin: "0 5px",
                padding: "8px 20px",
                borderRadius: "20px",
                border: "none",
                background: topN === n ? "#333" : "#e0e0e0",
                color: topN === n ? "#fff" : "#333",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "24px" }}>
          {[["Placement", "#4CAF50"], ["Result", "#2196F3"], ["Event", "#FF9800"]].map(([type, color]) => (
            <span key={type} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: color, display: "inline-block" }}></span>
              {type}
            </span>
          ))}
        </div>

        {/* Content */}
        {loading && <p style={{ textAlign: "center" }}>Loading notifications...</p>}
        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
        {!loading && !error && notifications.map((n, i) => (
          <NotificationCard key={n.ID} notification={n} index={i} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;