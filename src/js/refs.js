export const refs = {
  form: document.querySelector('.search-form'),
  homePage: document.querySelector('[data-home]'),
  libraryPage: document.querySelector('[data-library]'),
  header: document.querySelector('[data-header]'),
  libraryBtns: document.querySelector('.library-buttons'),
  watchedBtn: document.querySelector('[data-watched]'),
  queueBtn: document.querySelector('[data-queue]'),
  message: document.querySelector('.message'),
  // preloader
  preloader: document.querySelector('.loading'),
  // static from fetch
  API_KEY: '313da384ffe4ec90efea6fc8b4aa73ee',
  BASE_URL_TRENDING: 'https://api.themoviedb.org/3/trending/movie/week',
  BASE_URL_GANRES: 'https://api.themoviedb.org/3/genre/movie/list',
  BASE_URL_SEARCH: 'https://api.themoviedb.org/3/search/movie',
  gallery: document.querySelector('.gallery-list'),
  backdrop: document.querySelector('.js-backdrop'),
  modal: document.querySelector('.modal__wrapper'),
  closeModalBtn: document.querySelector('.js-modal__close-btn'),
};
