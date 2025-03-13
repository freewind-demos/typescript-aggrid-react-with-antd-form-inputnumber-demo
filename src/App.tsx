import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { Typography } from 'antd';
import { useMemo, useState, useRef, useCallback } from 'react';
import { NumericCellRenderer } from './NumericCellRenderer';

// Define the row data type
interface RowData {
  id: number;
  value: number;
  description: string;
}

function App() {
  // Initial row data
  const [rowData, setRowData] = useState<RowData[]>([
    { id: 1, value: 1.23, description: 'Item 1' },
    { id: 2, value: 4.56, description: 'Item 2' },
    { id: 3, value: 7.89, description: 'Item 3' },
    { id: 4, value: 0.01, description: 'Item 4' },
    { id: 5, value: 123.45, description: 'Item 5' },
  ]);

  // Column definitions
  const columnDefs = useMemo<ColDef[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 80 },
      {
        field: 'value',
        headerName: 'Value (with precision=2)',
        cellRenderer: NumericCellRenderer,
        editable: false, // Set to false since we're handling editing in the cell renderer
        width: 200,
      },
      { field: 'description', headerName: 'Description', width: 150 },
    ],
    []
  );

  // Reference to the grid API
  const gridRef = useRef<{ api: GridApi; columnApi: ColumnApi } | null>(null);

  // Handler for cell value changed event - gets latest data from grid
  const onCellValueChanged = useCallback(() => {
    const api = gridRef.current?.api;
    if (api) {
      // Get the latest data from the grid
      const updatedData: RowData[] = [];
      api.forEachNode((node) => {
        if (node.data) {
          updatedData.push({ ...node.data });
        }
      });
      // Update state with the latest data
      setRowData([...updatedData]);
    }
  }, []);

  return (
    <div>
      <Typography.Title level={2}>AG-Grid with Ant Design InputNumber Demo</Typography.Title>
      <Typography.Paragraph>
        This demo shows how InputNumber with precision=2 works in AG-Grid cells.
        Try entering numbers with more decimal places and observe how they get formatted after losing focus.
      </Typography.Paragraph>

      <div className="ag-theme-alpine">
        <AgGridReact
          ref={(ref) => {
            if (ref) {
              gridRef.current = ref;
            }
          }}
          rowData={rowData}
          columnDefs={columnDefs}
          onCellValueChanged={onCellValueChanged}
          animateRows={true}
        />
      </div>

      <div className="data-display">
        <Typography.Title level={4}>Current Grid Data:</Typography.Title>
        <pre>{JSON.stringify(rowData, null, 2)}</pre>
        <div style={{ color: 'gray', fontSize: '12px', marginTop: '8px' }}>
          Data last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default App;
