import fetchAPI from './fetch';
import Markup from './markup';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './pagination';
import scroll from './upBtn';
import { refs } from './refs';
import Notiflix from 'notiflix';

async function onLoadPage(page) {
  try {
    const res = await Promise.all([fetchAPI.fetchTrendingMovies(page), fetchAPI.fetchGenres()]);
    Markup.fetchMovies(res[0].data.results, res[1].data.genres);

    const pagination = new Pagination('pagination', TUI.getOptions(res[0].data.total_pages));
    pagination.on('afterMove', event => {
      scroll();
      onPagination(event);
    });
  } catch (error) {
    console.log(error);
  }
}

// console.log(fetchAPI.fetchTrendingMovies(1).then(data => console.log(data.data.results)));

// console.log(fetchAPI.fetchGenres().then(data => console.log(data.data.genres)));

onLoadPage(1);

async function onPagination(event) {
  let page = event.page;
  try {
    const res = await Promise.all([fetchAPI.fetchTrendingMovies(page), fetchAPI.fetchGenres()]);
    Markup.fetchMovies(res[0].data.results, res[1].data.genres);
  } catch (error) {
    console.log(error);
  }
}

async function onSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements['searchQuery'].value.trim();
  let page = 1;

  try {
    const res = await Promise.all([
      fetchAPI.fetchByQuery(page, searchQuery),
      fetchAPI.fetchGenres(),
    ]);
    Markup.fetchMovies(res[0].data.results, res[1].data.genres);
    refs.pagination.classList.remove('visually-hidden');
    if (res[0].data.total_results === 0) {
      // refs.message.classList.remove('visually-hidden');
      Notiflix.Notify.failure('Search result not successful. Enter the correct movie name');
      refs.pagination.classList.add('visually-hidden');
    }
  } catch (error) {
    Notiflix.Notify.info('Please type something');
  }
}

refs.form.addEventListener('submit', onSubmit);
