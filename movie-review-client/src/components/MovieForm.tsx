import React from "react";
import { Modal, Form, Input, DatePicker, Button } from "antd";
import dayjs from "dayjs";

interface MovieFormProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  onSubmit: (values: any) => Promise<void>;
  initialValues?: any;
  title: string;
}

const MovieForm: React.FC<MovieFormProps> = ({
  isModalVisible,
  setIsModalVisible,
  onSubmit,
  initialValues,
  title,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        releaseDate: dayjs(initialValues.releaseDate),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: any) => {
    await onSubmit(values);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      title={title}
      open={isModalVisible}
      footer={null}
      onCancel={() => setIsModalVisible(false)}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="name" label="Movie Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="releaseDate"
          label="Release Date"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default MovieForm;
