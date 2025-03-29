# SQL Playground

A modern, responsive SQL query builder and visualization tool built with React and Material UI. This application allows users to write SQL queries, visualize results, and save favorite queries for later use.

**Live Demo:** [https://sql-at-rec.vercel.app/](https://sql-at-rec.vercel.app/)

**GitHub:** [https://github.com/SuprHUlk/sql-at-rec](https://github.com/SuprHUlk/sql-at-rec)

**Video Walkthrough:** [https://drive.google.com/file/d/119ytVpzTmyF1fFQHYe75Fa07sZKTYTU9/view?usp=sharing](https://drive.google.com/file/d/119ytVpzTmyF1fFQHYe75Fa07sZKTYTU9/view?usp=sharing)

![SQL Playground Screenshot](https://i.imgur.com/5xJxoCs.png)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Architecture Diagram](#architecture-diagram)
- [Project Structure](#project-structure)
- [Technical Decisions](#technical-decisions)
- [Features](#features)
- [Installation](#installation)
- [Performance Metrics](#performance-metrics)
- [Performance Optimizations](#performance-optimizations)

## Technologies Used

### Core Framework

- **React 19**: Using hooks for state management and component lifecycle
- **Vite**: For fast development and optimized production builds

### UI Libraries

- **Material UI (MUI) v7**: For UI components, theming, and responsive design
- **Monaco Editor**: For the SQL editor with syntax highlighting

### Major Packages

- **@monaco-editor/react**: React wrapper for Monaco Editor
- **@mui/material** & **@mui/icons-material**: Material UI components and icons

## Project Structure

The application follows a feature-based architecture inspired by Bulletproof React principles:

```
src/
├── features/           # Feature-based modules
│   ├── common/         # Shared components and hooks
│   │   ├── components/ # Common components (Loading)
│   │   └── hooks/      # Shared hooks (useNotification)
│   ├── sidebar/        # Sidebar feature module
│   │   ├── components/ # Sidebar components
│   │   └── styles/     # Sidebar-specific styles
│   ├── sqlEditor/      # SQL Editor feature module
│   │   ├── components/ # Editor components
│   │   └── styles/     # Editor-specific styles
│   └── sqlResults/     # SQL Results feature module
│       ├── components/ # Result components
│       └── styles/     # Result-specific styles
├── lib/                # Shared utilities
│   └── api/            # API services
│       ├── csvService.js  # CSV data handling
│       └── sqlService.js  # SQL query execution
├── providers/          # Context providers
│   └── ThemeProvider.jsx # Theme provider implementation
├── layouts/            # Layout components
│   └── MainLayout.css  # Main layout styles
├── config/             # Configuration files
│   └── index.js        # App configuration
└── App.jsx             # Main application component
```

## Architecture Diagram

![SQL Playground Screenshot](https://i.imgur.com/mzBCulQ_d.webp?maxwidth=760&fidelity=grand)

## Technical Decisions

### Architecture

The application is built with a feature-based architecture following the [Bulletproof React](https://github.com/alan2207/bulletproof-react) principles to improve maintainability and scalability. This approach provides:

- **Feature-based organization**: Each feature (SQL Editor, Results, Sidebar) is encapsulated in its own directory with dedicated components and styles
- **Clean separation of concerns**: Clear boundaries between application layers
- **Consistent patterns**: Standardized approach to component structure, state management, and styling
- **Scalability**: Architecture that scales well with team size and codebase growth

### State Management

- **Local Component State**: For UI-specific state using React's useState hook
- **localStorage**: For persisting user queries across sessions
- **Service Layer**: Separated data handling logic into service modules

### Responsive Design Strategy

The application uses a mobile-first approach with three key breakpoints:

- Mobile: Up to 480px
- Tablet: 481px to 950px
- Desktop: 951px and above

CSS Grid is used for layout with media queries to adjust the layout based on screen size. On mobile devices, the sidebar transforms into a drawer with a fixed header.

### CSS Strategy

A combination of:

- Component-scoped CSS files for feature-specific styling
- Material UI's styled components for dynamic styling
- CSS variables for consistent theming and breakpoints

## Features

### Core Functionality

- **SQL Editor**: Monaco-based SQL editor with syntax highlighting
- **Query Results**: Tabulated results with proper formatting and pagination
- **Sample Data**: Built-in CSV data to run queries against
- **Example Queries**: Pre-loaded example queries for quick experimentation
- **Saving Queries**: Save custom queries to browser's localStorage
- **Responsive Design**: Full support for mobile, tablet, and desktop views

### Advanced Features

- **Query Management**:

  - Save, edit, and delete custom queries
  - Quick-access to run saved queries
  - Visual feedback through tooltips and notifications

- **Data Handling**:

  - Automatic data type detection for proper alignment
  - Numeric formatting for better readability
  - Hover-to-expand cell content for wide data

- **Accessibility & UX**:
  - Keyboard navigation support
  - Tooltips for actions and buttons
  - Notifications for user actions
  - Dark theme for reduced eye strain

## Installation

### Prerequisites

- Node.js (v14.x or later)
- npm or yarn

### Setup and Run

1. **Clone the repository**

```bash
git clone https://github.com/SuprHUlk/sql-at-rec.git
cd sql-at-rec
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
```

5. **Preview production build**

```bash
npm run preview
```

## Performance Metrics

### Load Time Measurements

The application has been optimized for fast load times, measured using the following methods:

1. **First Contentful Paint (FCP)**: 0.6s
2. **Largest Contentful Paint (LCP)**: 0.6s
3. **Total Blocking Time**: 0ms
4. **Cumulative Layout Shift**: 0
5. **Speed Index**: 0.8s

These metrics were measured using:

- Lighthouse in Chrome DevTools (Performance score: 100/100, Accessibility: 98/100, Best Practices: 89/100, SEO: 90/100)
- Web Vitals library integrated into the application

### Mobile Performance

- Performance score: 88/100
- First Contentful Paint: 2.2s
- Largest Contentful Paint: 3.0s
- Total Blocking Time: 240ms
- Speed Index: 2.7s

### Performance Testing Environment

- Tests conducted on a standard broadband connection (50Mbps)
- Desktop and mobile devices simulated through Chrome DevTools

## Performance Optimizations

### Rendering Optimizations

- **Pagination**: For result table

Built with ❤️ by SuprHUlk
