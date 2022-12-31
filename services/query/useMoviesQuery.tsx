import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { BaseMovie } from '../../models/movie.model';

type MovieQueryData = {
  pageParams: [number, number];
  pages: {
    data: BaseMovie[];
    nextPage: number;
    previousPage: number;
  }[];
};

export const useMoviesQuery = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<MovieQueryData>(['movies']);

  const movies = useMemo(() => {
    if (!data) return [];
    return data.pages.map((page) => page.data).flat();
  }, [data]);

  const getOneMovie = (id: number) => {
    return movies.find((movie) => movie.id === id);
  };

  return {
    getOneMovie,
  };
};
