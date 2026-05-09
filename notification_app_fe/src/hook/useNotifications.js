import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notificationApi";

const useNotifications = (page, limit, notification_type) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications(page, limit, notification_type);
        setNotifications(data.notifications);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, limit, notification_type]);

  return { notifications, loading, error, totalPages };
};

export default useNotifications;