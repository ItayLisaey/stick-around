export interface TMDBMovie {
  backdrop_path: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  status: string;
  tagline: string;
  title: string;
}

export interface TMDBPagination<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
