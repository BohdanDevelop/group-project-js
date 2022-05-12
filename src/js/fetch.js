import axios from 'axios';
import { refs } from './refs';
import { Notify } from 'notiflix';

export default class FetchAPI {
  static API_KEY = refs.API_KEY;
  static BASE_URL_TRENDING = refs.BASE_URL_TRENDING;
  static BASE_URL_GENRES = refs.BASE_URL_GANRES;
  static BASE_URL_SEARCH = refs.BASE_URL_SEARCH;

  static async fetchTrendingMovies(page) {
    refs.spinner.classList.add('is-visible');
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
    } finally {
      setTimeout(function () {
        refs.spinner.classList.remove('is-visible');
      }, 700);
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
      refs.spinner.classList.add('is-visible');
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
      Notify.info('Please enter something');
      refs.pagination.style.display = 'none';
    } finally {
      refs.spinner.classList.remove('is-visible');
    }
  }

  static async fetchYoutube(id) {
    try {
      let response = await axios.get(`https://api.themoviedb.org/3//movie/${id}/videos`, {
        params: {
          api_key: this.API_KEY,
          language: 'en - US',
        },
      });
      // console.log(data);
      return response;
    } catch (error) {
      console.log('error');
    }
  }
}
