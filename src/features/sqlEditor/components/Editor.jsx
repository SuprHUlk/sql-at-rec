import React, { useState } from "react";
import { Button, Box, Snackbar, Alert, Tooltip } from "@mui/material";
import MonacoEditor from "@monaco-editor/react";
import "../styles/Editor.css";

function Editor({ sqlQuery, setSqlQuery, onExecuteQuery }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const handleEditorChange = (value) => {
    setSqlQuery(value);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const executeQuery = () => {
    if (sqlQuery.trim() === "") {
      showSnackbar("Please enter a valid SQL query.");
      return;
    }
    onExecuteQuery(sqlQuery);
    showSnackbar("Query executed successfully!", "success");
  };

  return (
    <div id="editor" className="editor">
      <Box className="editor-container">
        <MonacoEditor
          height="100%"
          width="100%"
          language="sql"
          theme="vs-dark"
          value={sqlQuery}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            suggestOnTriggerCharacters: true,
            formatOnPaste: true,
            automaticLayout: true,
          }}
        />
      </Box>
      <Box className="editor-actions">
        <Tooltip title="Execute SQL query" placement="top">
          <Button
            variant="contained"
            color="primary"
            onClick={executeQuery}
            fullWidth
            size="large"
          >
            Run Query
          </Button>
        </Tooltip>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Editor;
