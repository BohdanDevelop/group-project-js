export const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
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
  BASE_IMG_URL: 'https://www.themoviedb.org/t/p/w500',
  gallery: document.querySelector('.gallery-list'),
  backdrop: document.querySelector('.js-backdrop'),
  modal: document.querySelector('.modal__wrapper'),
  closeModalBtn: document.querySelector('.js-modal__close-btn'),
  // spinner
  spinner: document.getElementById('spinner'),
  //pagination
  pagination: document.querySelector('.pagination'),

  libraryGallery: document.querySelector('[data-library-gallery]'),
  addToWatchedBtn: document.querySelector('[data-watched-btn]'),
  addToQueueBtn: document.querySelector('[data-queue-btn]'),
  backdrop: document.querySelector('.backdrop')
};
