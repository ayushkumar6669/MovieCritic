import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Flex, List } from "antd";
import { useSelector } from "react-redux";
import { fetchMovieById } from "../redux/moviesSlice";
import {
  fetchReviews,
  deleteReview,
  updateReview,
} from "../redux/reviewsSlice";
import ReviewForm from "../components/ReviewForm";
import { Review } from "../types";
import { useAppDispatch } from "../redux/hooks";
import Title from "antd/es/typography/Title";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState<Review | undefined>(
    undefined
  );

  const { selectedMovie } = useSelector((state: any) => state.movies);
  const { reviews } = useSelector((state: any) => state.reviews);

  const fetchMoviedata = () => {
    dispatch(fetchMovieById(id as string));
    dispatch(fetchReviews(id as string));
  };
  useEffect(() => {
    fetchMoviedata();
  }, [dispatch, id]);

  const handleEditReview = (review: Review) => {
    setReviewToEdit(review);
    setIsModalVisible(true);
  };

  const handleDeleteReview = async (reviewId: string) => {
    await dispatch(deleteReview(reviewId));
    fetchMoviedata();
  };

  const handleSubmitReview = async (values: Omit<Review, "_id">) => {
    if (reviewToEdit) {
      await dispatch(
        updateReview({ reviewId: reviewToEdit._id, updatedData: values })
      );
    }
    fetchMoviedata();
    setIsModalVisible(false);
    setReviewToEdit(undefined);
  };

  return (
    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      {selectedMovie && (
        <Flex justify="space-between" align="center">
          <Title level={3} style={{ margin: "0" }}>
            {selectedMovie.name}
          </Title>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Average Rating :{" "}
            <p style={{ color: "#6558F5", marginLeft: "5px" }}>
              {selectedMovie.averageRating
                ? selectedMovie.averageRating.toFixed(2)
                : 0}{" "}
              / 10
            </p>
          </div>
        </Flex>
      )}

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <List
            itemLayout="horizontal"
            dataSource={reviews}
            renderItem={(review: Review) => (
              <List.Item>
                <List.Item.Meta
                  description={
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Title level={5}>{review.comments}</Title>
                        <p style={{ color: "#6558F5" }}>
                          {review.rating ? review.rating.toFixed(2) : 0}/10
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <p>By {review.reviewerName}</p>
                        <div>
                          <EditOutlined
                            onClick={() => handleEditReview(review)}
                            style={{
                              fontSize: "18px",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                          />
                          <DeleteOutlined
                            onClick={() => handleDeleteReview(review._id)}
                            style={{ fontSize: "18px", cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>

      <ReviewForm
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        initialValues={reviewToEdit}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
};

export default MoviePage;
