import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import Sidebar from "./features/sidebar/components/Sidebar";
import Editor from "./features/sqlEditor/components/Editor";
import Result from "./features/sqlResults/components/Result";
import Loading from "./features/common/components/Loading";
import ThemeProvider from "./providers/ThemeProvider";
import { fetchCSVData } from "./lib/api/csvService";
import { executeQuery } from "./lib/api/sqlService";
import { useNotification } from "./features/common/hooks/useNotification";
import { APP_CONFIG } from "./config";
import "./layouts/MainLayout.css";

function App() {
  const [sqlQuery, setSqlQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notification, showNotification, closeNotification } =
    useNotification();
  const [queryResults, setQueryResults] = useState({
    columns: [],
    rows: [],
  });

  useEffect(() => {
    document.title = APP_CONFIG.name;

    // Fetch and parse the CSV file
    async function loadData() {
      try {
        const { headers, data } = await fetchCSVData(APP_CONFIG.api.csvUrl);

        if (data.length === 0) {
          showNotification(
            "CSV file is empty or could not be parsed correctly.",
            "warning"
          );
        } else {
          showNotification(
            `Successfully loaded ${data.length} records.`,
            "success"
          );
        }

        setOrders(data);

        setQueryResults({
          columns: headers,
          rows: [],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error loading CSV file:", error);
        showNotification(`Error loading CSV file: ${error.message}`, "error");
        setLoading(false);
      }
    }

    loadData();
  }, [showNotification]);

  const handleExecuteQuery = (query) => {
    if (loading) return;

    setSqlQuery(query);

    const results = executeQuery(query, orders, queryResults.columns);
    setQueryResults(results);
  };

  return (
    <ThemeProvider>
      <div className="wrapper">
        <Sidebar onRunQuery={handleExecuteQuery} />
        <Editor
          sqlQuery={sqlQuery}
          setSqlQuery={setSqlQuery}
          onExecuteQuery={handleExecuteQuery}
        />
        {loading ? (
          <div id="result" className="result">
            <Loading />
          </div>
        ) : (
          <Result results={queryResults} />
        )}

        <Snackbar
          open={notification.open}
          autoHideDuration={notification.duration || 3000}
          onClose={closeNotification}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          sx={{
            bottom: {
              xs: 16,
              sm: 24,
            },
            width: {
              xs: "90%",
              sm: "auto",
            },
          }}
        >
          <Alert
            onClose={closeNotification}
            severity={notification.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default App;
