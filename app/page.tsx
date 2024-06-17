import styles from "./page.module.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { MoviesApi } from "./moviesApi";

export default async function SearchPage({ searchParams }: any) {
  const { results } = await getData(searchParams.q ?? "");

  return (
    <>
      <Header />
      <div className={styles.main}>
        {results.map((movie) => (
          <p key={movie.id}>{movie.title}</p>
        ))}
      </div>
      <Footer />
    </>
  );
}

async function getData(query: string) {
  "use server";
  const api = new MoviesApi(process.env.MOVIE_DB_API_KEY ?? "");
  const data = await api.search(query);

  return data;
}
