//Service to handle CSV data loading and parsing

export const fetchCSVData = async (url = "/sample.csv") => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch CSV: ${response.status} ${response.statusText}`
      );
    }

    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error("Error loading CSV file:", error);
    throw error;
  }
};

export const parseCSV = (csvText) => {
  // Split the text into lines and remove any empty lines
  const lines = csvText.split("\n").filter((line) => line.trim() !== "");

  if (lines.length === 0) {
    return { headers: [], data: [] };
  }

  // Extract the header line and parse column names
  const headerLine = lines[0];
  const headerNames = headerLine.split(",").map((h) => h.trim());

  // Process data rows
  const dataRows = lines.slice(1);
  const data = dataRows.map((row, rowIndex) => {
    const values = row.split(",").map((val) => val.trim());
    const rowData = {};

    // Map each value to its corresponding header
    headerNames.forEach((header, index) => {
      const value = values[index] || "";
      // Try to convert to number if possible
      const numericValue = Number(value);
      rowData[header] =
        !isNaN(numericValue) && value !== "" ? numericValue : value;
    });

    // Add an ID for rows that don't have one
    if (!rowData.id && !rowData.ID) {
      rowData.id = `row-${rowIndex}`;
    }

    return rowData;
  });

  // Create column headers with proper type detection
  const headers = headerNames.map((name) => {
    // Check if the column is numeric by examining values in the first few rows
    const sampleSize = Math.min(5, data.length);
    const sample = data.slice(0, sampleSize);
    const numericValues = sample.filter((row) => typeof row[name] === "number");
    const isNumeric =
      numericValues.length > 0 && numericValues.length === sample.length;

    return {
      field: name,
      headerName: name,
      numeric: isNumeric,
    };
  });

  return { headers, data };
};
