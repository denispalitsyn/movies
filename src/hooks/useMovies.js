import { useEffect, useState } from 'react';
import { MoviesApi } from '../api';

const genresId = {
  action: 29,
  adventure: 12,
  comedy: 35,
  documentary: 99,
  fantasy: 14,
  horror: 27,
  western: 37,
};

export function useMovies() {
  const [moviesByType, setMoviesByType] = useState({
    popular: [],
    topRated: [],
    upcoming: [],
    adventure: [],
    animation: [],
    comedy: [],
    documentary: [],
    fantasy: [],
    horror: [],
    western: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      MoviesApi.getPopular(),
      MoviesApi.getTopRated(),
      MoviesApi.getUpcoming(),
      MoviesApi.getMoviesByGenreId(genresId.adventure),
      MoviesApi.getMoviesByGenreId(genresId.comedy),
      MoviesApi.getMoviesByGenreId(genresId.documentary),
      MoviesApi.getMoviesByGenreId(genresId.fantasy),
      MoviesApi.getMoviesByGenreId(genresId.horror),
      MoviesApi.getMoviesByGenreId(genresId.western),
    ])
      .then((responses) => {
        setMoviesByType({
          popular: responses[0].results,
          topRated: responses[1].results,
          upcoming: responses[2].results,
          adventure: responses[3].results,
          comedy: responses[4].results,
          documentary: responses[5].results,
          fantasy: responses[6].results,
          horror: responses[7].results,
          western: responses[8].results,
        });
      })
      .catch((error) => setError(error?.message ?? 'Something wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    error,
    moviesByType,
  };
}
