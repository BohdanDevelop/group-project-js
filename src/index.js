import './sass/main.scss';

import './js/preloader';
import './js/drawFirstPage';

import { refs } from './js/refs'; // DOM Elements references
import { openHomePage, openLibraryPage } from './js/alternate-pages';
import { openWatchedList, openQueueList } from './js/library-lists';

import { openModalRef } from './js/movieModal';

// HOME & MY LIBRARY pages openning + Library Lists alternation (Watched, Queue)

refs.libraryPage.addEventListener('click', openLibraryPage);
refs.homePage.addEventListener('click', openHomePage);

refs.watchedBtn.addEventListener('click', openWatchedList);
refs.queueBtn.addEventListener('click', openQueueList);
