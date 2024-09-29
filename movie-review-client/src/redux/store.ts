import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import reviewsReducer from "./reviewsSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    reviews: reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
