import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Select, InputNumber } from "antd";
import { Review } from "../types";
import { Movie } from "../types";
import { useAppSelector } from "../redux/hooks";

interface ReviewFormProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  onSubmit: (values: Omit<Review, "_id"> | Review) => void;
  initialValues?: Review;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  isModalVisible,
  setIsModalVisible,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const movies = useAppSelector((state) => state.movies.movies);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = (values: Omit<Review, "_id">) => {
    onSubmit(values);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Edit review" : "Add review"}
      open={isModalVisible}
      footer={null}
      onCancel={() => {
        setIsModalVisible(false);
      }}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="movieId"
          label="Select Movie"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select a movie"
            disabled={initialValues ? true : false}
          >
            {movies.map((movie: Movie) => (
              <Select.Option key={movie._id} value={movie._id}>
                {movie.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="reviewerName" label="Your Name">
          <Input />
        </Form.Item>
        <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
          <InputNumber min={0} max={10} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="comments"
          label="Comments"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default ReviewForm;
