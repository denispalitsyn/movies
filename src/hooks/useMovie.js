import { useEffect, useState } from 'react';
import { MoviesApi } from '../api';

export function useMovie(id) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    MoviesApi.getMovieById(id)
      .then((response) => {
        setMovie(response);
      })
      .catch((error) => setError(error?.message ?? 'Something wrong'))
      .finally(() => setIsLoading(false));
  }, [id]);

  return {
    isLoading,
    error,
    movie,
  };
}
