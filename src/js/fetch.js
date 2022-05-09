import axios from 'axios';

export default class FetchAPI {
  static API_KEY = '313da384ffe4ec90efea6fc8b4aa73ee';
  static BASE_URL_TRENDING = 'https://api.themoviedb.org/3/trending/movie/week';
  static BASE_URL_GENRES = 'https://api.themoviedb.org/3/genre/movie/list';
  static BASE_URL_SEARCH = 'https://api.themoviedb.org/3/search/movie';
  // static BASE_URL_TERNDING = '';

  static async fetchTrendingMovies(page) {
    try {
      const response = await axios.get(this.BASE_URL_TRENDING, {
        params: {
          api_key: this.API_KEY,
          page,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchGenres() {
    try {
      const response = await axios.get(this.BASE_URL_GENRES, {
        params: {
          api_key: this.API_KEY,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchQuery(page, query) {
    try {
      const response = await axios.get(this.BASE_URL_SEARCH, {
        params: {
          api_key: this.API_KEY,
          page,
          query,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
