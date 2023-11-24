import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  },
});

export class MoviesApi {
  static async getPopular() {
    const res = await client.get('/movie/popular?language=en-US&page=1');

    return res.data;
  }

  static async getTopRated() {
    const res = await client.get('/movie/top_rated?language=en-US&page=1');

    return res.data;
  }

  static async getUpcoming() {
    const res = await client.get('/movie/upcoming?language=en-US&page=1');

    return res.data;
  }

  static async getMoviesByGenreId(genreId) {
    const res = await client.get(
      `/discover/movie?include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`
    );

    return res.data;
  }

  static async getMovieById(id) {
    const res = await client.get(
      `/movie/${id}?append_to_response=similar,credits,videos&language=en-US`
    );

    return res.data;
  }

  static async searchMovie(q) {
    const res = await client.get(
      `/search/movie?query=${q}&language=en-US&page=1`
    );

    return res.data;
  }
}
