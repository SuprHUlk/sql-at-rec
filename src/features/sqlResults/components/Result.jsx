import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "../styles/Result.css";

function Result({ results }) {
  const { columns, rows } = results;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Reset to page 0 when results change
  useEffect(() => {
    setPage(0);
  }, [rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRowKey = (row, index) => {
    return row.orderID || row.id || `row-${index}`;
  };

  // Function to format cell values
  const formatCellValue = (value) => {
    if (value === null || value === undefined) return "";

    if (typeof value === "number") {
      if (String(value).includes(".")) {
        return value.toFixed(2);
      }

      return value.toLocaleString("en-US");
    }

    return value;
  };

  // Display a message when there are no rows
  const renderEmptyState = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" color="text.secondary">
        No Data to Display
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Run a query to see results here
      </Typography>
    </Box>
  );

  return (
    <div id="result" className="result">
      <Typography variant="h6" className="result-header">
        Query Results {rows.length > 0 ? `(${rows.length} rows)` : ""}
      </Typography>
      <Box className="result-container">
        <Paper sx={{ width: "100%", overflow: "hidden", flex: 1 }}>
          {rows.length === 0 ? (
            renderEmptyState()
          ) : (
            <>
              <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  size={isMobile ? "small" : "medium"}
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.field}
                          align={column.numeric ? "right" : "left"}
                          style={{ minWidth: isMobile ? "50px" : "100px" }}
                        >
                          {column.headerName}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={getRowKey(row, index)}
                          >
                            {columns.map((column) => {
                              const value = row[column.field];
                              return (
                                <TableCell
                                  key={`${getRowKey(row, index)}-${
                                    column.field
                                  }`}
                                  align={column.numeric ? "right" : "left"}
                                  title={value?.toString() || ""}
                                  className="table-cell"
                                >
                                  {formatCellValue(value)}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={
                  window.innerWidth < 600 ? "Rows:" : "Rows per page:"
                }
                labelDisplayedRows={({ from, to, count }) =>
                  window.innerWidth < 600
                    ? `${from}-${to} of ${count}`
                    : `${from}–${to} of ${count}`
                }
              />
            </>
          )}
        </Paper>
      </Box>
    </div>
  );
}

export default Result;
