import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMoviesSearch } from '../hooks';
import { Error, Footer, Loader, Poster } from '../components';

export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { isLoading, error, movies } = useMoviesSearch(searchParams.get('q'));

  const goToMoviePage = (id) => {
    navigate(`/movie/${id}`);
  };

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto pt-[10vh] px-5">
        {movies.length ? (
          <>
            <h2 className="text-3xl mt-10 text-center">Search results</h2>
            <div className="mt-10">
              <div className="flex gap-9 flex-wrap justify-center">
                {movies.map((movie) => (
                  <Poster
                    key={movie.id}
                    {...movie}
                    onClick={() => goToMoviePage(movie.id)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-3xl mt-10 text-center">Nothing found</h2>
        )}
      </div>
      <Footer />
    </>
  );
}
