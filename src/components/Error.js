export function Error({ error }) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center flex-col text-center">
      <h2 className="text-2xl mb-5">Sorry, try again later</h2>
      <div className="max-w-md text-red-700">{error}</div>
    </div>
  );
}
