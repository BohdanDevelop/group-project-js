import './sass/main.scss';

// pagination markup and styles

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './js/pagination';

const pagination = new Pagination('pagination', TUI.getOptions(500));
pagination.on('afterMove', event => {
  console.log('knock knock');
});

// console.log(pagination);
