import './sass/main.scss';

import './js/preloader';
import './js/onSearchSubmit';
import './js/onLoadPage';

import './js/markup';
import './js/movieModal';
import './js/upBtn';
import './js/registration';
import './js/library-lists';
import './js/library-lists-updates';
import './js/nightMode';
import './js/alternate-pages';
import './js/modal-footer';
// HOME & MY LIBRARY pages openning + Library Lists alternation (Watched, Queue)
refs.libraryPage.addEventListener('click', openLibraryPage);
refs.homePage.addEventListener('click', openHomePage);

refs.watchedBtn.addEventListener('click', openWatchedList);
refs.queueBtn.addEventListener('click', openQueueList);

refs.backdrop.addEventListener('click', addToQueueList);
refs.backdrop.addEventListener('click', addToWatchedList);

getQueueStorageState();
getWatchedStorageState();
