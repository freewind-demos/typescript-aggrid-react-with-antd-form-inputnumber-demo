import { ColDef, ColumnApi, GridApi, ValueGetterParams, ValueSetterParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { Typography } from 'antd';
import { useCallback, useMemo, useRef, useState } from 'react';
import { NumericCellEditor } from './NumericCellEditor';
import { NumericCellRenderer } from './NumericCellRenderer';
import { RowData } from './types';

function App() {
  // Initial row data
  const [rowData, setRowData] = useState<RowData[]>([
    { id: 1, value: 1.23, description: 'Item 1' },
    { id: 2, value: 4.56, description: 'Item 2' },
    { id: 3, value: 7.89, description: 'Item 3' },
    { id: 4, value: 0.01, description: 'Item 4' },
    { id: 5, value: 123.45, description: 'Item 5' },
  ]);

  // Column definitions - 显式指定数据类型
  const columnDefs = useMemo<ColDef<RowData>[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 80 },
      {
        field: 'value',
        headerName: 'Value (with precision=2)',
        // 显示组件，只负责格式化值的显示
        cellRenderer: NumericCellRenderer,
        // 编辑组件，在编辑模式下使用
        cellEditor: NumericCellEditor,
        // 启用编辑
        editable: true,
        // valueGetter从数据中获取值并传给cellRenderer和cellEditor
        valueGetter: (params: ValueGetterParams<RowData>) => {
          const { data } = params;
          if (!data) return null;
          // 安全访问 value 属性，因为我们已经在 RowData 接口中定义了它
          return data.value;
        },
        // valueSetter接收编辑后的值并更新数据
        valueSetter: (params: ValueSetterParams<RowData, number>) => {
          const { data, newValue } = params; // newValue 的类型是 number | undefined

          // 确保有效的数据和新值
          if (data && newValue !== undefined) {
            // 将newValue直接使用，已经通过泛型约束为number类型
            const numericValue = newValue;

            // 新值和旧值不同时才更新
            if (data.value !== numericValue) {
              data.value = numericValue ?? undefined;
              return true; // 返回true表示数据已更新
            }
          }
          return false;
        },
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
          // 创建一个新对象，避免引用问题
          updatedData.push({ ...node.data });
        }
      });
      // 更新React状态，触发渲染更新
      setRowData(updatedData);
    }
  }, []);

  return (
    <div>
      <Typography.Title level={2}>AG-Grid with Ant Design InputNumber Demo</Typography.Title>
      <Typography.Paragraph>
        This demo shows how InputNumber with precision=2 works in AG-Grid cells.
        Try entering numbers with more decimal places and observe how they get formatted after losing focus.
      </Typography.Paragraph>

      <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
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
          stopEditingWhenCellsLoseFocus={true}
          enableCellChangeFlash={true}
        />
      </div>

      <div>
        <Typography.Title level={4}>Current Grid Data:</Typography.Title>
        <pre>{JSON.stringify(rowData, null, 2)}</pre>
        <div>
          Data last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default App;