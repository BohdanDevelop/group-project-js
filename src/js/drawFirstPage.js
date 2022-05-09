import fetchAPI from './fetch';
import Markup from './markup';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './pagination';

async function onLoadPage(page) {
  const res = await Promise.all([fetchAPI.fetchTrendingMovies(page), fetchAPI.fetchGenres()]);
  Markup.fetchTrending(res[0].data.results, res[1].data.genres);

  const pagination = new Pagination('pagination', TUI.getOptions(res[0].data.total_pages));
  pagination.on('afterMove', event => {
    onPagination(event);
  });
}

// console.log(fetchAPI.fetchTrendingMovies(1).then(data => console.log(data.data.results)));

// console.log(fetchAPI.fetchGenres().then(data => console.log(data.data.genres)));

onLoadPage(1);

async function onPagination(event) {
  let page = event.page;

  const res = await Promise.all([fetchAPI.fetchTrendingMovies(page), fetchAPI.fetchGenres()]);
  Markup.fetchTrending(res[0].data.results, res[1].data.genres);
}
