import './sass/main.scss';
import fetchAPI from './js/fetch';
import { refs } from './js/refs'; // DOM Elements references
import { openHomePage, openLibraryPage } from './js/alternate-pages';
import { openWatchedList, openQueueList } from './js/library-lists';

// pagination markup and styles

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './js/pagination';

import { openModalRef } from './js/movieModal';

preloaderHide();

const pagination = new Pagination('pagination', TUI.getOptions(500));
pagination.on('afterMove', event => {
  console.log('knock knock');
});

// HOME & MY LIBRARY pages openning + Library Lists alternation (Watched, Queue)

refs.libraryPage.addEventListener('click', openLibraryPage);
refs.homePage.addEventListener('click', openHomePage);

refs.watchedBtn.addEventListener('click', openWatchedList);
refs.queueBtn.addEventListener('click', openQueueList);

// try fetch

console.log(fetchAPI.fetchTrendingMovies(1).then(data => console.log(data.data.results)));

console.log(fetchAPI.fetchGenres().then(data => console.log(data.data.genres)));

//hide preloader

function preloaderHide() {
  setTimeout(function () {
    refs.preloader.classList.add('visually-hidden');
  }, 1300);
}
