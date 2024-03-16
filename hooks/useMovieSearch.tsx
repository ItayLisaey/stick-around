import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { movieService } from '../services/movies.service';
import { useDebounce } from './useDebounce';

export const useMovieSearch = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);

  const fetchMovies = async ({ pageParam }: { pageParam: number }) => {
    if (debouncedQuery) {
      return await movieService.search(query, pageParam);
    }
    return await movieService.nowPlaying(pageParam);
  }
  const { data, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['movies', 'search', debouncedQuery],
    queryFn: fetchMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    getPreviousPageParam: (firstPage) => firstPage.page - 1,
  });

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
