// src/types.ts

export interface Movie {
    _id: string;
    name: string;
    releaseDate: string;
    averageRating?: number;  // optional field
  }
  
  export interface Review {
    _id: string;
    movieId: string;
    reviewerName: string;
    rating: number;
    comments: string;
  }
  