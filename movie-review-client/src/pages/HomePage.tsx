import React, { useEffect } from "react";
import { Row, Col, Input, Space } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import MovieCard from "../components/MovieCard";
import MovieForm from "../components/MovieForm";
import { Movie } from "../types";
import { fetchMovies, deleteMovie, updateMovie } from "../redux/moviesSlice";
import Title from "antd/es/typography/Title";

const { Search } = Input;

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { movies, loading } = useAppSelector((state) => state.movies);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingMovie, setEditingMovie] = React.useState<Movie | null>(null);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleDelete = async (movieId: string) => {
    await dispatch(deleteMovie(movieId));
  };

  const handleUpdate = async (values: Movie) => {
    if (editingMovie) {
      await dispatch(
        updateMovie({ movieId: editingMovie._id, updatedData: values })
      );
      setEditingMovie(null);
    }
  };

  const filteredMovies = movies.filter((movie: Movie) =>
    movie.name.toLowerCase().includes(searchTerm)
  );

  const openEditMovieModal = (movie: Movie) => {
    setEditingMovie(movie);
    setIsModalVisible(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title> The best movie reviews site!</Title>
      <Space direction="vertical" style={{ width: "70%" }}>
        <Search
          placeholder="Search movies"
          enterButton
          size="large"
          onSearch={handleSearch}
        />
      </Space>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {filteredMovies.map((movie: Movie) => (
          <Col key={movie._id} xs={24} sm={12} md={8} lg={6}>
            <MovieCard
              movie={movie}
              onDelete={handleDelete}
              onUpdate={openEditMovieModal}
            />
          </Col>
        ))}
      </Row>

      <MovieForm
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onSubmit={handleUpdate}
        initialValues={
          editingMovie
            ? { name: editingMovie.name, releaseDate: editingMovie.releaseDate }
            : undefined
        }
        title={"EditmMovie"}
      />
    </div>
  );
};

export default HomePage;
