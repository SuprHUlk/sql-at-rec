//Service to handle SQL query execution

export const executeQuery = (query, data, columns) => {
  if (!data || data.length === 0) {
    return { columns, rows: [] };
  }

  // Check if this is the "All Orders" query
  if (query.toLowerCase().includes("select * from orders;")) {
    // Show all rows for the "All Orders" query
    return {
      columns,
      rows: data,
    };
  }

  const getRandomRowCount = (max = data.length) => {
    const minRows = 5;
    const maxRows = Math.min(max, 10);
    return Math.floor(Math.random() * (maxRows - minRows + 1)) + minRows;
  };

  const randomLimit = getRandomRowCount();

  // Generate a random starting index
  const maxStartIndex = Math.max(0, data.length - randomLimit);
  const randomStart = Math.floor(Math.random() * maxStartIndex);

  const results = data.slice(randomStart, randomStart + randomLimit);

  return {
    columns,
    rows: results,
  };
};
