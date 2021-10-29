import { useEffect, useState } from 'react';
import { getNowPlaying } from '../api/nowPlaying';
import { Movie } from '../types/movies.interface';

export default function useNowPlaying(pageNumber: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        getNowPlaying(pageNumber)
            .then((res) => {
                setMovies((m) => m.concat(res!));
                setHasMore(res!.length > 0);
                setLoading(false);
            })
            .catch((e) => setError(true));
    }, [pageNumber]);

    return { loading, movies, hasMore, error };
}
