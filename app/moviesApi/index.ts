const baseUrl = "https://api.themoviedb.org/3";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface MoviesDBResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export class MoviesApi {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async search(query: string, page: number = 1) {
    const res = await fetch(
      `${baseUrl}/search/movie?query=${query}&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );

    const json = await res.json();

    if (json.success === false) {
      throw json;
    }

    return json as MoviesDBResponse;
  }
}
