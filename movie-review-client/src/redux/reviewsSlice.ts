import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Review } from "../types";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (movieId: string) => {
    const response = await axios.get(`${apiUrl}/reviews/${movieId}`);
    return response.data;
  }
);

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData: any) => {
    const response = await axios.post(`${apiUrl}/reviews`, reviewData);
    return response.data;
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ reviewId, updatedData }: { reviewId: string; updatedData: any }) => {
    const response = await axios.put(
      `${apiUrl}/reviews/${reviewId}`,
      updatedData
    );
    return response.data;
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId: string) => {
    await axios.delete(`${apiUrl}/reviews/${reviewId}`);
    return reviewId;
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [] as Review[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (review) => review._id === action.payload._id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      });
  },
});

export default reviewsSlice.reducer;
