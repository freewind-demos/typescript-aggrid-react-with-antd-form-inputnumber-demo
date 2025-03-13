# AG-Grid with Ant Design InputNumber Demo

这个项目演示了如何在React应用程序中将AG-Grid与Ant Design的InputNumber组件集成，特别聚焦于实现在AG-Grid单元格中的小数精度控制。

## 核心特性

- 使用标准的AG-Grid cellEditor机制集成Ant Design InputNumber组件
- 精确控制数值的小数精度（固定为2位小数）
- 实时显示表格数据更新
- 类型安全的实现（使用TypeScript泛型和接口）
- 清晰的关注点分离（显示与编辑分离）

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **包管理器**: PNPM
- **表格组件**: AG-Grid Community
- **UI组件库**: Ant Design 5
- **开发语言**: TypeScript

## 实现方式

本项目使用了标准的AG-Grid单元格编辑器模式，通过以下组件分工实现：

1. **NumericCellRenderer** - 负责数值的显示格式化（保持2位小数）
2. **NumericCellEditor** - 处理编辑功能，集成了Ant Design的InputNumber
3. **ValueGetter/ValueSetter** - 处理数据的获取与更新

## 核心代码亮点

### 类型安全的数据流

```typescript
// 定义行数据类型
interface RowData {
  id: number;
  value: number;
  description: string;
}

// 类型安全的valueGetter
valueGetter: (params: ValueGetterParams<RowData>) => {
  const { data } = params;
  if (!data) return null;
  return data.value;
}
```

### 标准的AG-Grid单元格编辑器实现

```typescript
useImperativeHandle(ref, () => {
  return {
    // 获取编辑后的值
    getValue() {
      const formValues = form.getFieldsValue();
      return formValues.value;
    },
    // ...其他必要方法
  } satisfies Partial<ICellEditorComp>;
});
```

### 双重精度保证

```typescript
// InputNumber组件中的精度控制
<InputNumber
  precision={2}
  // ...其他属性
/>

// valueSetter中的精度确保
valueSetter: (params: ValueSetterParams<RowData>) => {
  // ...
  const numericValue = Number(Number(newValue).toFixed(2));
  // ...
}
```

## 使用方法

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm start
```

### 构建生产版本

```bash
pnpm build
```

## 如何使用

1. 双击任何数值单元格进入编辑模式
2. 输入带有多位小数的数字（如：1.234）
3. 按Enter或点击其他位置完成编辑
4. 观察值如何自动格式化为两位小数（1.23）
5. 表格下方会实时显示当前表格的数据状态

## 实现细节

1. **分离显示和编辑功能**：
   - NumericCellRenderer专注于显示数据
   - NumericCellEditor专注于编辑数据

2. **自动聚焦优化**：
   - 编辑器自动聚焦并选中文本
   - 支持键盘导航和交互

3. **响应式数据流**：
   - 使用标准的AG-Grid事件系统
   - 通过onCellValueChanged更新React状态

4. **样式优化**：
   - 自定义样式增强用户体验
   - 移除InputNumber的控制箭头为更干净的界面

## 特别说明

本项目展示了AG-Grid和Ant Design组件的标准集成方式，而不是使用自定义渲染器或非标准API。这确保了最佳的兼容性和性能。