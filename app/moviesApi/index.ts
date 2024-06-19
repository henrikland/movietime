import { Genre, SearchResult } from "./domain";

export class MoviesApi {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.themoviedb.org/3";
  }

  private async fetchJson(url: string, options?: RequestInit) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      ...options,
    });
    const json = await response.json();

    if (json.success === false) {
      throw json;
    }

    return json;
  }

  async fetchConfiguration() {
    const json = await this.fetchJson(`${this.baseUrl}/configuration`);

    return {
      imageBaseUrl: json.images.secure_base_url,
      imageSize: "w185",
    };
  }

  async fetchMovieGenres() {
    const json = await this.fetchJson(`${this.baseUrl}/genre/movie/list`);
    return json.genres as Genre[];
  }

  async fetchTvGenres() {
    const json = await this.fetchJson(`${this.baseUrl}/genre/tv/list`);
    return json.genres as Genre[];
  }

  async search(query: string, page: number = 1) {
    const results = await this.fetchJson(
      `${this.baseUrl}/search/multi?query=${query}&page=${page}`
    );
    return results as SearchResult;
  }
}
