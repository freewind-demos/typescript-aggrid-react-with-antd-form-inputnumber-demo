import { ICellRendererParams } from "ag-grid-community";
import { RowData } from "./types";

/**
 * 数值单元格渲染器 - 只负责显示格式化值
 */
export const NumericCellRenderer = (props: ICellRendererParams<RowData, number>) => {
    const { value } = props;

    // 格式化数字显示，保留两位小数
    const formattedValue = value !== undefined && value !== null
        ? Number(value).toFixed(2)
        : '';

    return (
        <div>
            {formattedValue}
        </div>
    );
};
