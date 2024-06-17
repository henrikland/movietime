const baseUrl = "https://api.themoviedb.org/3";

export class MoviesApi {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async search(query: string) {
    const res = await fetch(`${baseUrl}/search/movie?query=${query}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    const json = await res.json();

    return json;
  }
}
