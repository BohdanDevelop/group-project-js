import './sass/main.scss';
import fetchAPI from './js/fetch';

// pagination markup and styles

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './js/pagination';

const pagination = new Pagination('pagination', TUI.getOptions(500));
pagination.on('afterMove', event => {
  console.log('knock knock');
});

// console.log(pagination);

console.log(fetchAPI(1).then(data => console.log(data.data.results)));
