import { useState, useEffect } from "react";
import { fetchTopNotifications } from "../api/notificationApi";

const useNotifications = (topN) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchTopNotifications(topN);
        setNotifications(data);
      } catch (err) {
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [topN]);

  return { notifications, loading, error };
};

export default useNotifications;