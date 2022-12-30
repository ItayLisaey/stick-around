import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getNowPlaying } from '../api/tmdb/nowPlaying';
import { BaseMovie } from '../models/movie.model';

export default function useNowPlaying(pageNumber: number) {
  const [movies, setMovies] = useState<BaseMovie[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const { data, status } = useQuery(
    ['movies', pageNumber],
    () => getNowPlaying(pageNumber),
    {
      onSuccess: (data) => {
        if (data) {
          setMovies((m) => m.concat(data));
          setHasMore(data.length > 0);
        }
      },
    }
  );

  return { status, movies, hasMore };
}
