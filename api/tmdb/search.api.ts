import { Movie } from '../../types/movies.interface';
import { parseMovieDate } from '../../utils/movie.utils';
import { apiUrl } from './url.api';

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=aaaaa&page=1&include_adult=false

export async function getSearchResults(query: string) {
    const url = apiUrl(['language=en', `query=${query}`], 'search/movie');

    const { results } = await fetch(url).then((res) => res.json());

    const currentMovies = results.map(
        (movie: {
            id: any;
            title: any;
            release_date: any;
            overview: any;
            backdrop_path: any;
        }) => ({
            id: movie.id,
            title: movie.title,
            releaseDate: parseMovieDate(movie.release_date),
            overview: movie.overview ?? '',
            posterPath: movie.backdrop_path ?? '',
        })
    );

    return currentMovies as Movie[];
}
