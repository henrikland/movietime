import { MoviesApi } from "./moviesApi";

export default async function SearchPage({ searchParams }: any) {
  const { results } = await getData(searchParams.q ?? "");

  return (
    <div>
      {results.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
}

async function getData(query: string) {
  "use server";
  const api = new MoviesApi(process.env.MOVIE_DB_API_KEY ?? "");
  const data = await api.search(query);

  return data;
}
