import Image from "next/image";
import styles from "./page.module.css";
import { MoviesApi } from "./moviesApi";

export default async function SearchPage() {
  const { results } = await getData();

  return (
    <div>
      {results.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
}

async function getData() {
  "use server";
  const api = new MoviesApi(process.env.MOVIE_DB_API_KEY ?? "");
  const data = await api.search("jaws");

  return data;
}
