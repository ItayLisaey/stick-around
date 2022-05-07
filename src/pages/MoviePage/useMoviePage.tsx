import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { useAnalytics } from '../../hooks/useAnalytics';
import { movieService } from '../../services/movies.service';

export const useMoviePage = (id: string) => {
    const movieId = useMemo(() => {
        try {
            return parseInt(id);
        } catch {
            throw new Error('Invalid movie id');
        }
    }, [id]);

    useAnalytics('page-view', {
        page_title: `movie-page-${id}`,
    });

    const { data: movie, status: movieStatus } = useQuery(
        ['base-movies', movieId],
        () => movieService.findOne(movieId)
    );

    const loading = useMemo(() => {
        if (movieStatus === 'loading') return true;
        return false;
    }, [movieStatus]);

    const error = useMemo(() => {
        if (movieStatus === 'error') return "Couldn't load movie";
        return undefined;
    }, [movieStatus]);

    return {
        status: {
            loading,
            error,
        },
        data: {
            movie,
        },
    };
};
