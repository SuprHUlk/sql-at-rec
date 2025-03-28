export const APP_CONFIG = {
  name: "SQL Query Playground",
  version: "1.0.0",

  api: {
    csvUrl: "/sample.csv",
  },

  localStorage: {
    savedQueriesKey: "savedQueries",
  },

  defaultQueries: [
    {
      name: "All Orders",
      query: "SELECT * FROM Orders;",
    },
    {
      name: "Orders by Customer",
      query: "SELECT * FROM Orders WHERE CustomerID = 'ALFKI';",
    },
    {
      name: "Orders with high freight",
      query: "SELECT * FROM Orders WHERE Freight > 100;",
    },
    {
      name: "Recent orders",
      query: "SELECT * FROM Orders ORDER BY OrderDate DESC LIMIT 10;",
    },
  ],

  ui: {
    responsive: {
      mobileBreakpoint: 950,
      smallMobileBreakpoint: 480,
    },
  },
};
