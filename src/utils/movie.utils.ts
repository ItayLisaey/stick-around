import { BaseMovie } from '../models/movie.model';
import { TMDBMovie } from '../types/tmdb.types';

export function parseMovieDate(date: string) {
    const newDate = new Date(Date.parse(date));
    return newDate;
}

export const tmdbMovieToBaseMovie = (movie: TMDBMovie): BaseMovie => {
    const newMovie: BaseMovie = {
        id: movie.id,
        title: movie.title,
        releaseDate: parseMovieDate(movie.release_date),
        overview: movie.overview ?? '',
        posterPath: movie.poster_path ?? '',
    };
    return newMovie;
};
