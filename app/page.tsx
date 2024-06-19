import { Fragment } from "react";
import { groupBy, uniqBy } from "lodash";

import styles from "./page.module.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Search from "./components/search";
import Card from "./components/card";
import Carousel from "./components/carousel";

import {
  Genre,
  Movie,
  MovietimeItem,
  TvShow,
  convertToMovietimeItem,
} from "./moviesApi/domain";
import { MoviesApi } from "./moviesApi";

interface Props {
  searchParams: Record<string, string>;
}

export default async function Page({ searchParams }: Props) {
  const data = await getData(searchParams.q);

  return (
    <>
      <Header />
      <div className={styles.main}>
        <Search />
        {data && (
          <>
            {" "}
            {Object.entries(data.genresMap)
              .filter(([genre, items]) => items.length > 0)
              .map(([genre, items]) => (
                <Fragment key={genre}>
                  <h2>{genre}</h2>
                  <Carousel>
                    {items.map((item) => (
                      <Card
                        key={item.id}
                        title={item.name}
                        imageSrc={`${data.config.imageBaseUrl}${data.config.imageSize}/${item.imagePath}`}
                      />
                    ))}
                  </Carousel>
                </Fragment>
              ))}
            {data.actors && (
              <>
                <h2>Actors</h2>
                <Carousel>
                  {data.actors.map((item) => (
                    <Card
                      key={item.id}
                      title={item.name}
                      imageSrc={`${data.config.imageBaseUrl}${data.config.imageSize}/${item.imagePath}`}
                    />
                  ))}
                </Carousel>
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

async function getData(query: string) {
  if (!query) {
    return null;
  }

  const api = new MoviesApi(process.env.MOVIE_DB_API_KEY ?? "");
  const [results, movieGenres, tvGenres, config] = await Promise.all([
    api.search(query),
    api.fetchMovieGenres(),
    api.fetchTvGenres(),
    api.fetchConfiguration(),
  ]);

  const { movie, tv, person } = groupBy(results.results, "media_type");
  const moviesAndTvShows = movie.concat(tv) as (Movie | TvShow)[]; // FIXME we "know" the type here

  const genresMap = buildGenresMap(
    moviesAndTvShows,
    uniqBy(movieGenres.concat(tvGenres), "id")
  );

  return {
    genresMap,
    actors: person?.map(convertToMovietimeItem),
    config,
  };
}

function buildGenresMap(moviesAndTvShows: (Movie | TvShow)[], genres: Genre[]) {
  const idToGenre = genres.reduce<Record<number, string>>(
    (acc, genre) => ({
      ...acc,
      [genre.id]: genre.name,
    }),
    {}
  );

  const moviesByGenre = genres.reduce<Record<string, MovietimeItem[]>>(
    (acc, genre) => ({
      ...acc,
      [genre.name]: [],
    }),
    {}
  );

  moviesAndTvShows.forEach((item) => {
    item.genre_ids.forEach((id) => {
      moviesByGenre[idToGenre[id]].push(convertToMovietimeItem(item));
    });
  });

  return moviesByGenre;
}
