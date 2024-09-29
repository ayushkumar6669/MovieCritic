import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Movie } from "../types";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(`${apiUrl}/movies`);
  return response.data;
});

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (movieId: string) => {
    const response = await axios.get(`${apiUrl}/movies/${movieId}`);
    return response.data;
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData: Movie) => {
    const response = await axios.post(`${apiUrl}/movies`, movieData);
    return response.data;
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ movieId, updatedData }: { movieId: string; updatedData: Movie }) => {
    const response = await axios.put(
      `${apiUrl}/movies/${movieId}`,
      updatedData
    );
    return response.data;
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movieId: string) => {
    await axios.delete(`${apiUrl}/movies/${movieId}`);
    return movieId;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [] as Movie[],
    loading: false,
    error: null as string | null,
    selectedMovie: null as Movie | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie._id === action.payload._id
        );
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload
        );
      });
  },
});

export default moviesSlice.reducer;
