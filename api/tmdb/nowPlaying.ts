import axios from "axios";
import { BaseMovie } from "../../models/movie.model";
import { parseMovieDate } from "../../utils/movie.utils";

export async function getMoviesNowPlaying(page: number) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${
      process.env.TMDB_KEY
    }&language=en-US&page=${page + 1}`,
    {},
  );
  const { data } = res;

  const { total_pages, total_results, results, page: dataPage } = data;

  const nextPage = () => {
    if (dataPage < total_pages) {
      return dataPage + 1;
    }
    return undefined;
  };

  const previousPage = () => {
    if (dataPage > 1) {
      return dataPage - 1;
    }
    return undefined;
  };

  const currentMovies: BaseMovie[] = data.results.map(
    (movie: {
      id: any;
      title: any;
      release_date: any;
      overview: any;
      poster_path: any;
    }) => ({
      id: movie.id,
      title: movie.title,
      releaseDate: parseMovieDate(movie.release_date),
      overview: movie.overview ?? "",
      posterPath: movie.poster_path ?? "",
    }),
  );

  return {
    data: currentMovies,
    nextPage: nextPage(),
    previousPage: previousPage(),
  };
}
