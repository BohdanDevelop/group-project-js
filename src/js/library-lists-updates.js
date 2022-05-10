import { refs } from './refs.js';
import { clickedMovie } from './movieModal.js';
import { Notify } from 'notiflix';

function getWatchedStorageState() {
  const stored = localStorage.getItem('watched-list');
  if (stored === null) {
    return (watchedList = []);
  }
  const parsed = JSON.parse(stored);
  watchedList = parsed;
}

function getQueueStorageState() {
  const stored = localStorage.getItem('queue-list');
  if (stored === null) {
    return (queueList = []);
  }
  const parsed = JSON.parse(stored);
  queueList = parsed;
}

export let watchedList = [];
export let queueList = [];

function IfMovieisAdded(movieName, listType) {
  const list = localStorage.getItem(listType);

  if (list === null) {
    return false;
  }

  let moviesArray = [];
  const parsedList = JSON.parse(list);

  parsedList.map(el => {
    moviesArray.push(el.name);
  });
  return moviesArray.includes(movieName);
}

function addToWatchedList(event) {
  const btn = event.target;

  if (btn.hasAttribute('data-watched-btn')) {
    const yearReleased = clickedMovie.release_date.slice(0, 4);

    const movie = {
      name: clickedMovie.title,
      genres: clickedMovie.genre_ids,
      rating: clickedMovie.vote_average,
      year: yearReleased,
      image: clickedMovie.poster_path,
    };

    if (!IfMovieisAdded(clickedMovie.title, 'queue-list')) {
      if (!IfMovieisAdded(clickedMovie.title, 'watched-list')) {
        watchedList.push(movie);
        Notify.success("Movie is added to Watched")
        return localStorage.setItem('watched-list', JSON.stringify(watchedList));
      } else {
        Notify.warning('This movie has already been added to Watched');
      }
    } else {
      return Notify.info('This movie is already in Queue');
    }
  }

  return;
}

function addToQueueList(event) {
  const btn = event.target;

  if (btn.hasAttribute('data-queue-btn')) {
    const yearReleased = clickedMovie.release_date.slice(0, 4);

    const movie = {
      name: clickedMovie.title,
      genres: clickedMovie.genre_ids,
      rating: clickedMovie.vote_average,
      year: yearReleased,
      image: clickedMovie.poster_path,
    };

    if (!IfMovieisAdded(clickedMovie.title, 'watched-list')) {
      if (!IfMovieisAdded(clickedMovie.title, 'queue-list')) {
        queueList.push(movie);
        Notify.success("Movie is added to Queue")
        return localStorage.setItem('queue-list', JSON.stringify(queueList));
      } else {
        Notify.warning('This movie has already been added to Queue');
      }
    } else {
      return Notify.info('This movie is already in Queue');
    }
  }

  return;
}

document.addEventListener("keydown", (event) => {
    if (event.key === 'r') {
        localStorage.clear();
        watchedList = []
        queueList = []
        refs.libraryGallery.innerHTML =""
    }
     });

export {
  addToWatchedList,
  addToQueueList,
  IfMovieisAdded,
  getWatchedStorageState,
  getQueueStorageState,
};
