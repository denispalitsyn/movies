import { useNavigate } from 'react-router-dom';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useMovies } from '../hooks';
import { Backdrop, Error, Footer, Loader, Poster } from '../components';
import { getRandomMinMax } from '../utils';

export function MainPage() {
  const navigate = useNavigate();

  const { isLoading, error, moviesByType } = useMovies();

  const [randomMovie, setRandomMovie] = useState(null);

  const moviesTypes = useMemo(
    () => [
      {
        key: 'upcoming',
        title: 'Upcoming Movies',
      },
      {
        key: 'popular',
        title: 'Popular Movies',
      },
      {
        key: 'topRated',
        title: 'Top Rated Movies',
      },
      {
        key: 'adventure',
        title: 'Adventure Movies',
      },
      {
        key: 'western',
        title: 'Western Movies',
      },
      {
        key: 'comedy',
        title: 'Comedy Movies',
      },
      {
        key: 'documentary',
        title: 'Documentary Movies',
      },
      {
        key: 'horror',
        title: 'Horror Movies',
      },
      {
        key: 'fantasy',
        title: 'Fantasy Movies',
      },
    ],
    []
  );

  const getRandomMovie = useCallback(
    () =>
      moviesByType[moviesTypes[getRandomMinMax(0, 8)].key][
        getRandomMinMax(0, 19)
      ],
    [moviesByType, moviesTypes]
  );

  useEffect(() => {
    setRandomMovie(getRandomMovie());
  }, [getRandomMovie]);

  const goToMoviePage = (id) => {
    navigate(`/movie/${id}`);
  };

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading || !randomMovie) {
    return <Loader />;
  }

  return (
    <>
      <Backdrop {...randomMovie}>
        <div className="container mx-auto px-5 pt-[30vh]">
          <h2 className="text-5xl sm:text-8xl font-bold mb-5">
            {randomMovie.original_title}
          </h2>
          <button
            onClick={() => goToMoviePage(randomMovie.id)}
            className="bg-white text-black font-bold text-lg rounded-md transition-all duration-300 w-24 h-10 mb-5 hover:bg-orange-500 hover:text-white"
          >
            Details
          </button>
          <div className="max-w-2xl line-clamp-4">{randomMovie.overview}</div>
        </div>
      </Backdrop>
      <div className="container mx-auto mt-24 px-5">
        {moviesTypes.map(({ key, title }) => (
          <Fragment key={key}>
            <h2 className="text-3xl mt-10">{title}</h2>
            <div className="overflow-auto mt-5">
              <div className="flex gap-10 w-min">
                {moviesByType[key].map((movie) => (
                  <Poster
                    key={movie.id}
                    {...movie}
                    onClick={() => goToMoviePage(movie.id)}
                  />
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <Footer />
    </>
  );
}
