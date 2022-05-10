import fetchAPI from './fetch';
import Markup from './markup';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './pagination';
import scroll from './upBtn';
import { refs } from './refs';
import Notiflix from 'notiflix';

async function onSearchSubmit(event) {
  refs.gallery.innerHTML = '';
  event.preventDefault();
  const searchQuery = event.currentTarget.elements['searchQuery'].value.trim();
  let page = 1;

  try {
    const res = await Promise.all([
      fetchAPI.fetchByQuery(page, searchQuery),
      fetchAPI.fetchGenres(),
    ]);
    Markup.fetchMovies(res[0].data.results, res[1].data.genres);

    refs.pagination.style.display = 'block';

    if (res[0].data.total_results === 0) {
      Notiflix.Notify.failure('Search result not successful. Enter the correct movie name');
      refs.pagination.style.display = 'none';
      return;
    }

    const paginationOnSearch = new Pagination(
      'pagination',
      TUI.getOptions(res[0].data.total_results),
    );

    paginationOnSearch.on('afterMove', event => {
      scroll();
      TUI.onPaginationSearch(event, searchQuery);
    });
  } catch (error) {
    console.log(error);
  }
}

refs.form.addEventListener('submit', onSearchSubmit);
