import './sass/main.scss';

import './js/preloader';
import './js/onSearchSubmit';
import './js/onLoadPage';

import { refs } from './js/refs'; // DOM Elements references
import { openHomePage, openLibraryPage } from './js/alternate-pages';
import { openWatchedList, openQueueList } from './js/library-lists';
import { getQueueStorageState} from './js/library-lists-updates';
import { getWatchedStorageState } from './js/library-lists-updates';
import { addToQueueList } from './js/library-lists-updates';
import { addToWatchedList } from './js/library-lists-updates';
import { renderWatchedList } from './js/library-lists';
import { getStoragecurrentState } from './js/library-lists-updates';
import { clickedMovie } from './js/movieModal';

import './js/markup';
import './js/movieModal';
import './js/upBtn';

// HOME & MY LIBRARY pages openning + Library Lists alternation (Watched, Queue)

refs.libraryPage.addEventListener('click', openLibraryPage);
refs.homePage.addEventListener('click', openHomePage);

refs.watchedBtn.addEventListener('click', openWatchedList);
refs.queueBtn.addEventListener('click', openQueueList);

refs.backdrop.addEventListener('click', addToQueueList)
refs.backdrop.addEventListener('click', addToWatchedList)

getQueueStorageState()
getWatchedStorageState()

