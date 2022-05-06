import { BaseMovie } from '../models/movie.model';
import { ServerResponse } from '../types/api.types';
import { CreditsData, creditType } from '../types/movies.interface';
import { TMDBMovie } from '../types/tmdb.types';
import { tmdbMovieToBaseMovie } from '../utils/movie.utils';
import { ServiceInstance } from './utils/backend.service';
import { TMDBInstance } from './utils/tmdb.service';

class MovieService {
    service_prefix = 'movies';
    vote_prefix = 'vote';

    tmdb_prefix = 'movie';

    async findOne(movieId: number): Promise<BaseMovie> {
        try {
            const res = await (
                await TMDBInstance()
            ).get<TMDBMovie>(this.tmdb_prefix + '/' + movieId);

            const movie = tmdbMovieToBaseMovie(res.data);
            return movie;
        } catch {
            throw new Error("Couldn't fetch movie information");
        }
    }

    async credits(movieId: number): Promise<CreditsData> {
        try {
            const res = await (
                await ServiceInstance()
            ).get<ServerResponse<CreditsData>>(
                this.service_prefix + '/' + movieId
            );
            if (!res.data.success) throw new Error();

            if (res.status === 404) console.log('got 404');

            return res.data;
        } catch {
            throw new Error("Couldn't fetch movie credits");
        }
    }

    async vote(movieId: number, type: creditType, content: boolean) {
        try {
            const payload = {
                value: content,
                type: type,
            };
            const res = await (
                await ServiceInstance()
            ).post<ServerResponse<{}>>(
                this.vote_prefix + '/' + movieId,
                payload
            );

            if (!res.data.success) throw new Error();

            return res.data;
        } catch {
            throw new Error("Couldn't vote on movie");
        }
    }
}

export const movieService = new MovieService();
