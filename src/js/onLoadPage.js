import fetchAPI from './fetch';
import Markup from './markup';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './pagination';
import scroll from './upBtn';
import { refs } from './refs';
import Modal from './movieModal';
// import onSearchSubmit from './onSearchSubmit';

let modal = new Modal();
// export function modal.getClickedMovie();
// console.log(modal.getClickedMovie());
// export { modal.getClickedMovie };

async function onLoadPage(page) {
  try {
    const res = await Promise.all([fetchAPI.fetchTrendingMovies(page), fetchAPI.fetchGenres()]);

    Markup.fetchMovies(res[0].data.results, res[1].data.genres);
    Markup.drawMovieCard(res[0].data.results);
    modal.getArrMovie(res[0].data.results);

    const paginationOnTrending = new Pagination(
      'pagination',
      TUI.getOptions(res[0].data.total_pages),
    );
    paginationOnTrending.on('afterMove', event => {
      scroll();
      onPaginationTrending(event);
    });
  } catch (error) {
    console.log(error);
  }
}

onLoadPage(1);

refs.form.addEventListener('submit', onSearchSubmit);

async function onPaginationTrending(event) {
  let page = event.page;
  try {
    const res = await Promise.all([fetchAPI.fetchTrendingMovies(page), fetchAPI.fetchGenres()]);
    Markup.fetchMovies(res[0].data.results, res[1].data.genres);
    Markup.drawMovieCard(res[0].data.results);
    modal.getArrMovie(res[0].data.results);
  } catch (error) {
    console.log(error);
  }
}

async function onSearchSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements['searchQuery'].value.trim();
  let page = 1;

  try {
    const res = await Promise.all([
      fetchAPI.fetchByQuery(page, searchQuery),
      fetchAPI.fetchGenres(),
    ]);
    Markup.fetchMovies(res[0].data.results, res[1].data.genres);
    Markup.drawMovieCard(res[0].data.results);
    modal.getArrMovie(res[0].data.results);

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
      onPaginationSearch(event, searchQuery);
    });
  } catch (error) {
    console.log(error);
  }
}

async function onPaginationSearch(event, searchQuery) {
  let page = event.page;
  try {
    const res = await Promise.all([
      fetchAPI.fetchByQuery(page, searchQuery),
      fetchAPI.fetchGenres(),
    ]);
    Markup.fetchMovies(res[0].data.results, res[1].data.genres);
    Markup.drawMovieCard(res[0].data.results);
    modal.getArrMovie(res[0].data.results);
  } catch (error) {
    console.log(error);
  }
}

function getClickedMovie() {
  return modal.getClickedMovie();
}

export { getClickedMovie };
