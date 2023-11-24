export function Poster({ poster_path, title, onClick }) {
  return (
    <div
      className="overflow-hidden w-[150px] h-[225px] cursor-pointer"
      onClick={onClick}
    >
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={title}
          width={150}
          height={225}
          className="block w-full h-full transition-all duration-700 hover:scale-125"
        />
      ) : (
        <div className="bg-gray-700 p-2 w-full h-full flex justify-center items-center text-center">{title}</div>
      )}
    </div>
  );
}
