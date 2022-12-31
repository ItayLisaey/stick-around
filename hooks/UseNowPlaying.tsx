import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getMoviesNowPlaying } from '../api/tmdb/nowPlaying';

export default function useNowPlaying() {
  // const [movies, setMovies] = useState<BaseMovie[]>([]);
  // const [hasMore, setHasMore] = useState(false);
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['movies'],
    async ({ pageParam = 0 }) => await getMoviesNowPlaying(pageParam),
    {
      getPreviousPageParam: (firstPage) => firstPage?.previousPage ?? undefined,
      getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    }
  );

  const movies = useMemo(() => {
    if (data) {
      return data.pages.map((p) => p.data).flat();
    }
    return [];
  }, [data]);

  const fetchNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return { status, movies, fetchNext };
}
