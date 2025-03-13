// 定义行数据类型
export interface RowData {
  id: number;
  value?: number;
  description: string;
  // 可以添加表示编辑状态或验证信息的字段
  _valueError?: string;
}