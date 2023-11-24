export function Backdrop({ backdrop_path, children }) {
  return (
    <div
      className="backdrop max-w-full h-[80vh]"
      style={{
        '--url': `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
      }}
    >
      {children}
    </div>
  );
}
