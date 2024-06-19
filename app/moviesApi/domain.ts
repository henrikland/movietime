// MovieDB types

export interface Movie {
  id: number;
  media_type: "movie";
  title: string;
  genre_ids: number[];
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}
export interface TvShow {
  id: number;
  media_type: "tv";
  name: string;
  genre_ids: number[];
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

export interface Actor {
  id: number;
  media_type: "person";
  name: string;
  profile_path: string;
}

export interface SearchResult {
  results: (Movie | TvShow | Actor)[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

// Domain types

export interface MovietimeItem {
  id: number;
  type: "movie" | "tv" | "actor";
  name: string;
  imagePath: string;
  date?: string;
  score?: number;
}

function movieToMovietimeItem(movie: Movie): MovietimeItem {
  return {
    id: movie.id,
    type: "movie",
    name: movie.title ?? movie.original_title,
    imagePath: movie.poster_path,
    date: movie.release_date,
    score: movie.vote_average,
  };
}

function tvShowToMovietimeItem(tvShow: TvShow): MovietimeItem {
  return {
    id: tvShow.id,
    type: "tv",
    name: tvShow.name,
    imagePath: tvShow.poster_path,
    date: tvShow.first_air_date,
    score: tvShow.vote_average,
  };
}

function actorToMovietimeItem(actor: Actor): MovietimeItem {
  return {
    id: actor.id,
    type: "actor",
    name: actor.name,
    imagePath: actor.profile_path,
  };
}

export function convertToMovietimeItem(
  item: Movie | TvShow | Actor
): MovietimeItem {
  switch (item.media_type) {
    case "movie":
      return movieToMovietimeItem(item);
    case "tv":
      return tvShowToMovietimeItem(item);
    case "person":
      return actorToMovietimeItem(item);
  }
}
