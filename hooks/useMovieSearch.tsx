import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { movieService } from '../services/movies.service';
import { useDebounce } from './useDebounce';

export const useMovieSearch = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);

  const { data, status, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['movies', 'search', debouncedQuery],
    async ({ pageParam = 1 }) => {
      if (debouncedQuery) {
        return await movieService.search(query, pageParam);
      }
      return await movieService.nowPlaying(pageParam);
    },
    {
      // enabled: Boolean(query),
      getPreviousPageParam: (firstPage) => firstPage?.page - 1 ?? undefined,
      getNextPageParam: (lastPage) => lastPage?.page + 1 ?? undefined,
    }
  );

  const searchResults = useMemo(() => {
    if (data) {
      return data.pages.map((p) => p.movies).flat();
    }
    return [];
  }, [data]);
  const fetchNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return {
    status,
    searchResults,
    fetchNext,
  };
};
