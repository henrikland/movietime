import Image from "next/image";
import styles from "./page.module.css";
import { MoviesApi } from "./moviesApi";

export default async function Home() {
  const data = await getData();
  return <div>hej</div>;
}

async function getData() {
  "use server";
  const api = new MoviesApi(process.env.MOVIE_DB_API_KEY ?? "");
  const data = await api.search("jaws");
  console.log(data);

  return {};
}
