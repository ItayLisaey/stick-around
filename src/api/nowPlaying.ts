import { API_INDEX } from '../constants/api.constants';
import { Movie } from '../types/movies.interface';
import { parseMovieDate } from '../utils/movie.utils';
import { apiUrl } from './url.api';

export async function getNowPlaying() {
  const url = apiUrl(['language=en-US', 'page=1'], API_INDEX.PLAYING, 'movie');

  try {
    const movies = await fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        throw Error('Error fetching movies');
      });

    const currentMovies = movies.results.map(
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
