import React, { useEffect, useState } from "react";
import { Layout, Button, Select } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { addMovie, fetchMovieById, fetchMovies } from "../redux/moviesSlice";
import { Movie, Review } from "../types";
import { addReview } from "../redux/reviewsSlice";
import MovieForm from "./MovieForm";
import ReviewForm from "./ReviewForm";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isMovieModalVisible, setIsMovieModalVisible] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleAddMovie = async (values: Movie) => {
    await dispatch(addMovie(values));
    setIsMovieModalVisible(false);
  };

  const handleAddReview = async (values: Omit<Review, "_id">) => {
    await dispatch(addReview({ ...values }));
    await dispatch(fetchMovies());
    dispatch(fetchMovieById(values.movieId as string));
    setIsReviewModalVisible(false);
  };

  return (
    <AntHeader style={headerStyle}>
      <div style={titleStyle}>MOVIECRITIC</div>

      <div style={buttonGroupStyle}>
        <Button
          style={addMovieButtonStyle}
          onClick={() => setIsMovieModalVisible(true)}
        >
          Add new movie
        </Button>
        <Button
          type="primary"
          style={addReviewButtonStyle}
          onClick={() => setIsReviewModalVisible(true)}
        >
          Add new review
        </Button>
      </div>

      <MovieForm
        isModalVisible={isMovieModalVisible}
        setIsModalVisible={setIsMovieModalVisible}
        onSubmit={handleAddMovie}
        initialValues={undefined}
        title="Add new movie"
      />

      <ReviewForm
        isModalVisible={isReviewModalVisible}
        setIsModalVisible={setIsReviewModalVisible}
        onSubmit={handleAddReview}
      />
    </AntHeader>
  );
};

const headerStyle: React.CSSProperties = {
  background: "#E3E8ED",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "auto",
  flexWrap: "wrap",
};

const titleStyle: React.CSSProperties = {
  fontSize: "20px",
  flexGrow: 1,
};

const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  alignContent: "center",
  gap: "10px",
  flexWrap: "wrap",
};

const addMovieButtonStyle: React.CSSProperties = {
  border: "1px solid #6558F5",
  color: "#6558F5",
};

const addReviewButtonStyle: React.CSSProperties = {
  backgroundColor: "#6558F5",
};

export default Header;
