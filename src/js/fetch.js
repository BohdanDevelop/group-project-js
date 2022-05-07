import axios from 'axios';

export default function fetch(page) {
  const API_KEY = '313da384ffe4ec90efea6fc8b4aa73ee';
  const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';

  const response = axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      page,
    },
  });
  return response;
}
