import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { APP_CONFIG } from "../../../config";
import "../styles/Sidebar.css";

function Sidebar({ onRunQuery }) {
  const [savedQueries, setSavedQueries] = useState(() => {
    const saved = localStorage.getItem(APP_CONFIG.localStorage.savedQueriesKey);
    return saved ? JSON.parse(saved) : [];
  });
  const [queryName, setQueryName] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [expanded, setExpanded] = useState("panel1");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery(
    `(max-width:${APP_CONFIG.ui.responsive.mobileBreakpoint}px)`
  );

  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(false);
    }
  }, [isMobile]);

  // Example queries from config
  const exampleQueries = APP_CONFIG.defaultQueries;

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleQueryNameChange = (event) => {
    setQueryName(event.target.value);
  };

  const handleCurrentQueryChange = (event) => {
    setCurrentQuery(event.target.value);
  };

  const showNotification = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSaveQuery = () => {
    if (!queryName.trim() || !currentQuery.trim()) {
      return;
    }

    const newQuery = {
      id: Date.now(),
      name: queryName,
      query: currentQuery,
    };

    const updatedQueries = [...savedQueries, newQuery];
    setSavedQueries(updatedQueries);
    localStorage.setItem(
      APP_CONFIG.localStorage.savedQueriesKey,
      JSON.stringify(updatedQueries)
    );

    showNotification(`Query "${queryName}" saved successfully!`);

    // Reset form
    setQueryName("");
    setCurrentQuery("");
  };

  const handleDeleteQuery = (id) => {
    const queryToDelete = savedQueries.find((query) => query.id === id);
    const updatedQueries = savedQueries.filter((query) => query.id !== id);
    setSavedQueries(updatedQueries);
    localStorage.setItem(
      APP_CONFIG.localStorage.savedQueriesKey,
      JSON.stringify(updatedQueries)
    );

    if (queryToDelete) {
      showNotification(`Query "${queryToDelete.name}" deleted`, "info");
    }
  };

  const handleRunQuery = (query) => {
    onRunQuery(query);
    // If on mobile, close the drawer after running a query
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const sidebarContent = (
    <>
      <Box className="sidebar-header">
        <Typography variant="h6" className="sidebar-title">
          SQL Playground
        </Typography>
        {isMobile && (
          <IconButton onClick={toggleDrawer} className="close-sidebar">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handlePanelChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Example Queries</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List className="query-list">
            {exampleQueries.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleRunQuery(item.query)}
                secondaryAction={
                  <Tooltip title="Run this query" placement="left">
                    <IconButton
                      edge="end"
                      aria-label="run"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRunQuery(item.query);
                      }}
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText primary={item.name} secondary={item.query} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handlePanelChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography>Saved Queries</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {savedQueries.length === 0 ? (
            <Typography color="text.secondary">No saved queries yet</Typography>
          ) : (
            <List className="query-list">
              {savedQueries.map((item) => (
                <ListItem
                  key={item.id}
                  button
                  onClick={() => handleRunQuery(item.query)}
                  secondaryAction={
                    <Box>
                      <Tooltip title="Run this query" placement="left">
                        <IconButton
                          edge="end"
                          aria-label="run"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRunQuery(item.query);
                          }}
                        >
                          <PlayArrowIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete query" placement="left">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQuery(item.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                >
                  <ListItemText primary={item.name} secondary={item.query} />
                </ListItem>
              ))}
            </List>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handlePanelChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography>Save New Query</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component="form" className="save-query-form">
            <TextField
              label="Query Name"
              variant="outlined"
              fullWidth
              size="small"
              value={queryName}
              onChange={handleQueryNameChange}
              margin="normal"
            />
            <TextField
              label="SQL Query"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={currentQuery}
              onChange={handleCurrentQueryChange}
              margin="normal"
            />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveQuery}
              disabled={!queryName.trim() || !currentQuery.trim()}
              fullWidth
              sx={{ mt: 2 }}
            >
              Save Query
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );

  // Collapse sidebar on mobile
  if (isMobile) {
    return (
      <>
        <Box
          className="mobile-header"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            zIndex: 1100,
            height: "56px",
          }}
        >
          <IconButton
            onClick={toggleDrawer}
            aria-label="open sidebar"
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            SQL Playground
          </Typography>
        </Box>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          variant="temporary"
          className="mobile-sidebar-drawer"
          PaperProps={{
            sx: {
              width: "80%",
              maxWidth: "300px",
              height: "100%",
              padding: "16px",
              bgcolor: "background.paper",
            },
          }}
        >
          {sidebarContent}
        </Drawer>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
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
      </>
    );
  }

  // Normal sidebar for desktop
  return (
    <div id="sidebar" className="sidebar">
      {sidebarContent}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
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

export default Sidebar;
