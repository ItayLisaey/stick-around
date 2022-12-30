import { API_INDEX } from '../../constants/api.constants';
import { Movie } from '../../types/movies.interface';
import { parseMovieDate } from '../../utils/movie.utils';
import { apiUrl } from './url.api';

export async function getNowPlaying(pageNumber: number) {
  const url = (pageNumber: number) =>
    apiUrl(
      ['language=en-US', `page=${pageNumber}`],
      API_INDEX.PLAYING,
      'movie'
    );

  try {
    console.log(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=${pageNumber}}`
    );
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=${pageNumber}}`
    );

    const data = await res.json();
    const currentMovies = data.results.map(
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
        overview: movie.overview ?? '',
        posterPath: movie.poster_path ?? '',
      })
    );

    return currentMovies as Movie[];
  } catch (error) {
    console.error(error);
  }
}
