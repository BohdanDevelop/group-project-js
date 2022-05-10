import './sass/main.scss';

import './js/preloader';
import './js/onSearchSubmit';
import './js/onLoadPage';

import { refs } from './js/refs'; // DOM Elements references
import { openHomePage, openLibraryPage } from './js/alternate-pages';
import { openWatchedList, openQueueList } from './js/library-lists';

import './js/markup';
import './js/movieModal';
import './js/upBtn';

// HOME & MY LIBRARY pages openning + Library Lists alternation (Watched, Queue)

refs.libraryPage.addEventListener('click', openLibraryPage);
refs.homePage.addEventListener('click', openHomePage);

refs.watchedBtn.addEventListener('click', openWatchedList);
refs.queueBtn.addEventListener('click', openQueueList);
refs.footerModalButton.addEventListener('click', evt => {
  refs.footerBackDrop.classList.add('footer-backdrop--visible');
  refs.footerModal.classList.add('footer-modal--visible');
  document.body.style.overflow = 'hidden';
  refs.footerCloseBtn.addEventListener('click', evt => {
    refs.footerBackDrop.classList.remove('footer-backdrop--visible');
    refs.footerModal.classList.remove('footer-modal--visible');
    document.body.style.overflow = 'auto';
  });
});
