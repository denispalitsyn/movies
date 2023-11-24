import { useEffect, useState } from 'react';
import { MoviesApi } from '../api';

export function useMoviesSearch(query) {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    MoviesApi.searchMovie(query)
      .then((response) => {
        setMovies(response.results);
      })
      .catch((error) => setError(error?.message ?? 'Something wrong'))
      .finally(() => setIsLoading(false));
  }, [query]);

  return {
    isLoading,
    error,
    movies,
  };
}
