import { useCallback, useEffect, useState } from 'react';
import { getNowPlaying } from '../api/tmdb/nowPlaying';
import { Movie } from '../types/movies.interface';

export default function useNowPlaying(pageNumber: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [hasMore, setHasMore] = useState(false);

    const getMovies = useCallback(async (pageNum: number) => {
        const mvs = await getNowPlaying(pageNum);
        if (mvs) {
            setMovies((m) => m.concat(mvs));
            setHasMore(mvs.length > 0);
            setLoading(false);
        } else {
            setError(true);
        }
    }, []);

    useEffect(() => {
        getMovies(pageNumber);
    }, [getMovies, pageNumber]);

    return { loading, movies, hasMore, error };
}
