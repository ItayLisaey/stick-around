import { Movie } from '../../types/movies.interface';
import { parseMovieDate } from '../../utils/movie.utils';
import { apiUrl } from './url.api';

export async function getSingleMovie(id: number) {
    const url = apiUrl([], `${id}`, 'movie');

    const movie = await fetch(url).then((res) => res.json());

    const currentMovie = {
        id: movie.id,
        title: movie.title,
        releaseDate: parseMovieDate(movie.release_date),
        overview: movie.overview ?? '',
        posterPath: movie.poster_path ?? '',
    };

    return currentMovie as Movie;
}
