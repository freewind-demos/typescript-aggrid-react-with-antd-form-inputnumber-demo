import { ICellRendererParams } from "ag-grid-community";
import { Form, InputNumber } from "antd";
import { useEffect } from "react";

export const NumericCellRenderer = (props: ICellRendererParams) => {
    const { value, node, column, api, data } = props;
    const [form] = Form.useForm();

    // Initialize form with current value
    useEffect(() => {
        form.setFieldsValue({ value });
    }, [form, value]);

    // When form values change, update the grid data
    const onFormFinish = (values: { value: number }) => {
        if (column?.getColId() && values.value !== undefined) {
            const fieldName = column.getColId();
            const newValue = values.value;

            // Update the data in the grid
            node.setDataValue(fieldName, newValue);

            // Let AG-Grid know the cell value has changed by triggering an event
            api.refreshCells({
                rowNodes: [node],
                force: true
            });

            // Instead of manually creating and dispatching an event, use the API's built-in method
            // that will properly format the event with correct typing
            if (api.applyTransaction) {
                api.applyTransaction({
                    update: [data]
                });
            }
        }
    };

    return (
        <div className="numeric-cell-editor" style={{ width: '100%' }}>
            <Form
                form={form}
                onFinish={onFormFinish}
                initialValues={{ value }}
            >
                <Form.Item name="value" noStyle>
                    <InputNumber
                        precision={2}
                        style={{ width: '100%' }}
                        onPressEnter={() => form.submit()}
                        onBlur={() => form.submit()}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};
