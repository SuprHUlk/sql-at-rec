import { useState, useCallback } from "react";

//Custom hook for managing notification messages
export const useNotification = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showNotification = useCallback(
    (message, severity = "info", duration = 3000) => {
      setNotification({
        open: true,
        message,
        severity,
        duration,
      });
    },
    []
  );

  const closeNotification = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification((prev) => ({ ...prev, open: false }));
  }, []);

  return {
    notification,
    showNotification,
    closeNotification,
  };
};

export default useNotification;
