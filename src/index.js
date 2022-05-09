import './sass/main.scss';

import './js/preloader';
import './js/drawFirstPage';

import { refs } from './js/refs'; // DOM Elements references
import { openHomePage, openLibraryPage } from './js/alternate-pages';
import { openWatchedList, openQueueList } from './js/library-lists';

// pagination markup and styles

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './js/pagination';
import { MarkTrending } from './js/markup';

import './js/markup';
import './js/movieModal';
import './js/upBtn';

// HOME & MY LIBRARY pages openning + Library Lists alternation (Watched, Queue)

refs.libraryPage.addEventListener('click', openLibraryPage);
refs.homePage.addEventListener('click', openHomePage);

refs.watchedBtn.addEventListener('click', openWatchedList);
refs.queueBtn.addEventListener('click', openQueueList);
