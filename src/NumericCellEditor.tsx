import { ICellEditorComp, ICellEditorParams } from "ag-grid-community";
import { Form, InputNumber } from "antd";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { RowData } from "./types";

/**
 * 数值单元格编辑器 - 使用Ant Design InputNumber与precision=2
 * 遵循AG-Grid的cellEditor接口
 */
export const NumericCellEditor = forwardRef((props: ICellEditorParams<RowData, number>, ref) => {
    const { value, stopEditing } = props;
    const [form] = Form.useForm();

    // 初始化表单值
    useEffect(() => {
        form.setFieldsValue({ value });
    }, [form, value]);

    // 实现AG-Grid的CellEditor接口
    useImperativeHandle(ref, () => {
        return {
            // 获取编辑后的值 - AG-Grid会传给valueSetter
            getValue() {
                const formValues = form.getFieldsValue();
                return formValues.value;
            },
        } satisfies Partial<ICellEditorComp>;
    });

    // 当按下回车时结束编辑
    const onPressEnter = () => {
        stopEditing();
    };

    // 当失焦时结束编辑
    const onBlur = () => {
        stopEditing();
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Form form={form} initialValues={{ value }}>
                <Form.Item name="value" noStyle>
                    <InputNumber
                        precision={2}
                        style={{ width: '100%' }}
                        onPressEnter={onPressEnter}
                        onBlur={onBlur}
                        autoFocus={true}  // 添加autoFocus属性辅助聚焦
                        controls={false}  // 移除上下箭头为更干净的界面
                    />
                </Form.Item>
            </Form>
        </div>
    );
});
