import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface MovieCardProps {
  movie: Movie;
  onDelete: (movieId: string) => void;
  onUpdate: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDelete, onUpdate }) => {
  const navigate = useNavigate();

  return (
    <Card hoverable onClick={() => navigate(`/movie/${movie._id}`)}>
      <p>
        <strong>{movie.name}</strong>
      </p>

      <p>Released: {dayjs(movie.releaseDate).format("D MMMM, YYYY")}</p>

      <p>
        Rating:{" "}
        {movie.averageRating ? `${movie.averageRating.toFixed(2)}/10` : "0/10"}
      </p>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <EditOutlined
          onClick={(e) => {
            e.stopPropagation();
            onUpdate(movie);
          }}
          style={{ fontSize: "18px", cursor: "pointer" }}
        />
        <DeleteOutlined
          onClick={(e) => {
            e.stopPropagation();
            onDelete(movie._id);
          }}
          style={{ fontSize: "18px", cursor: "pointer" }}
        />
      </div>
    </Card>
  );
};

export default MovieCard;
