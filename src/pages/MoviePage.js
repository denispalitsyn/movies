import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMovie } from '../hooks';
import { Backdrop, Error, Footer, Loader, Poster } from '../components';

export function MoviePage() {
  const params = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { movie, isLoading, error } = useMovie(params.id);

  const ref = useRef();

  const goToMoviePage = (id) => {
    navigate(`/movie/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!movie || error) {
    return <Error />;
  }

  const {
    original_title,
    overview,
    release_date,
    genres,
    poster_path,
    runtime,
    credits: { cast, crew },
    similar: { results: similarMovies },
  } = movie;

  console.log('crew', crew);

  const releaseYear = release_date.split('-')[0];

  const genreNames = genres.map(({ name }) => name).join(' | ');

  const videoKey = movie.videos?.results?.[0]?.key;

  const getDuration = () => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - hours * 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <Backdrop {...movie}>
        <div className="container mx-auto px-5 flex gap-10 pt-[20vh]">
          <div className="overflow-hidden w-[300px] h-[450px] ml-10 hidden sm:block">
            {poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                alt={original_title}
                width={300}
                height={450}
                className="block w-full h-full"
              />
            ) : (
              <div className="bg-gray-700 p-2 w-full h-full flex justify-center items-center">
                Image not found
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-5">
              {original_title}
            </h2>
            <div className="text-3xl sm:text-5xl font-bold mb-5">
              ({releaseYear})
            </div>
            <div className="mb-5">{getDuration()}</div>
            <div className="mb-5">{genreNames}</div>
            {videoKey && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black font-bold text-lg rounded-md transition-all duration-300 w-24 h-10 mb-5 hover:bg-orange-500 hover:text-white"
              >
                Trailer
              </button>
            )}
            <div className="max-w-2xl line-clamp-4">{overview}</div>
          </div>
        </div>
      </Backdrop>
      <div className="container mx-auto px-5 mt-20">
        {!!cast.length && (
          <>
            <h2 className="text-2xl font-bold mb-5">Cast</h2>
            <div className="overflow-x-auto mb-10">
              <div className="flex gap-10 w-min">
                {cast
                  .slice(0, 20)
                  .map(({ character, name, id, profile_path }, index) => (
                    <div key={'cast' + id + index}>
                      {profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                          alt={name}
                          width={150}
                          height={225}
                          className="block min-w-[150px] h-[225px] mb-5 rounded-lg"
                        />
                      ) : (
                        <div className="bg-gray-700 p-2 min-w-[150px] h-[225px] mb-5 rounded-lg flex justify-center items-center">
                          Image not found
                        </div>
                      )}
                      <div className="text-xl font-bold">{name}</div>
                      <div className="text-orange-500">{character}</div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
        {!!crew.length && (
          <>
            <h2 className="text-2xl font-bold mb-5">Crew</h2>
            <div className="overflow-x-auto mb-20">
              <div className="flex gap-10 w-min">
                {crew
                  .slice(0, 20)
                  .map(
                    (
                      { known_for_department, name, id, profile_path },
                      index
                    ) => (
                      <div key={'crew' + id + index}>
                        {profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                            alt={name}
                            width={150}
                            height={225}
                            className="block min-w-[150px] h-[225px] mb-5 rounded-lg"
                          />
                        ) : (
                          <div className="bg-gray-700 p-2 min-w-[150px] h-[225px] mb-5 rounded-lg flex justify-center items-center">
                            Image not found
                          </div>
                        )}
                        <div className="text-xl font-bold">{name}</div>
                        <div className="text-orange-500">
                          {known_for_department}
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </>
        )}
        {!!similarMovies.length && (
          <>
            <h2 className="text-3xl font-bold mb-5">Similar movies</h2>
            <div className="overflow-auto mt-5">
              <div className="flex gap-10 w-min">
                {similarMovies.map((movie) => (
                  <Poster
                    key={movie.id}
                    {...movie}
                    onClick={() => goToMoviePage(movie.id)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
      <CSSTransition
        nodeRef={ref}
        in={isModalOpen}
        timeout={200}
        classNames="modal"
        unmountOnExit
      >
        <div
          ref={ref}
          className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black bg-opacity-80 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div>
            <div className="relative w-5 h-5 ml-auto mb-2 cursor-pointer hover:opacity-70">
              <div className="w-5 h-[2px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45" />
              <div className="w-5 h-[2px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45" />
            </div>
            <iframe
              width="900"
              height="450"
              src={`https://www.youtube.com/embed/${movie.videos?.results?.[0]?.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
