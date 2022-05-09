import axios from 'axios';
import { refs } from './refs';

export default class FetchAPI {
  static API_KEY = refs.API_KEY;
  static BASE_URL_TRENDING = refs.BASE_URL_TRENDING;
  static BASE_URL_GENRES = refs.BASE_URL_GANRES;
  static BASE_URL_SEARCH = refs.BASE_URL_SEARCH;

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

  static async fetchByQuery(page, query) {
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
