# AG-Grid with Ant Design InputNumber Demo

This project demonstrates how to integrate AG-Grid with Ant Design's InputNumber component in a React application. The primary goal is to verify that the decimal precision functionality of InputNumber works correctly within AG-Grid cells.

## Features

- AG-Grid integration with React
- Custom cell renderer using Ant Design Form with InputNumber
- InputNumber with decimal precision set to 2
- Real-time display of grid data below the grid
- Demonstration of number formatting (e.g., 1.234 → 1.23 after losing focus)

## Running the Project

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open your browser and navigate to the local development server (typically http://localhost:5173).

## Usage

1. The grid displays several rows with numeric values
2. Click on a cell to edit its value
3. Try entering numbers with more than 2 decimal places
4. After pressing Enter or clicking outside the cell, observe that the value is formatted to have exactly 2 decimal places
5. The current data in the grid is displayed in JSON format below the grid

## Technical Implementation

The demo uses:
- Vite as the build tool
- React for UI components
- AG-Grid for the data grid
- Ant Design for the form controls and styling
- TypeScript for type safety
