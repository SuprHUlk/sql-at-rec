import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 2,
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="body1">Loading data from CSV...</Typography>
    </Box>
  );
}

export default Loading;
