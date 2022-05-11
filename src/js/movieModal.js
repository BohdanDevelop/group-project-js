import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import noPosterImg from '../images/no-poster.jpg';

import fetchAPI from './fetch';
import { refs } from './refs';

refs.gallery.addEventListener('click', onOpenMovieModal);

let newArrMovies = null;
let clickedMovie = null; // exported to library-lists-updates

async function onOpenMovieModal(e) {
  try {
    clearModal();
    if (e.target.nodeName === 'UL') {
      return;
    }

    const filmId = Number(e.target.closest('li').dataset.id);
    refs.backdrop.classList.add('show');
    document.body.style.overflow = 'hidden';

    const rightMovie = newArrMovies.find(arr => arr.id === filmId);

    clickedMovie = rightMovie; // Object used for adding movies to the Watched and Queue lists
    const trailerKey = await fetchAPI.fetchYoutube(filmId);
    const keyOfTrailer = trailerKey.data.results[0].key;

    refs.modal.insertAdjacentHTML('afterbegin', markupModal(rightMovie, keyOfTrailer));

    const templateInstance = basicLightbox.create(document.querySelector('#template'));
    document.querySelector('div.modal__trailer-link').onclick = templateInstance.show;

    document.addEventListener('keydown', onCloseByEsc);
    refs.closeModalBtn.addEventListener('click', onCloseMovieModal);
    refs.backdrop.addEventListener('click', onBackdropClick);
  } catch (error) {
    console.log(error);
  }
}

function onCloseMovieModal(e) {
  refs.backdrop.classList.remove('show');
  document.body.style.overflow = 'scroll';
  document.removeEventListener('keydown', onCloseByEsc);
  refs.closeModalBtn.removeEventListener('click', onCloseMovieModal);
  refs.backdrop.removeEventListener('click', onBackdropClick);
}

function getArrMovie(arr) {
  newArrMovies = arr;
}

function onBackdropClick(e) {
  if (e.target === refs.backdrop) {
    onCloseMovieModal();
  }
}

function onCloseByEsc(e) {
  if (e.code === 'Escape') {
    onCloseMovieModal();
  }
}

function clearModal() {
  refs.modal.innerHTML = '';
}

function markupModal(
  { poster_path, title, vote_average, vote_count, genre_ids, overview, popularity },
  key,
) {
  if (poster_path) {
    poster_path = refs.BASE_IMG_URL + poster_path;
  } else {
    poster_path = noPosterImg;
  }
  return `<div class="modal__img--block">
      <div class="modal__img-wrapper">
        <img
          class="modal__img"
          src="${poster_path}"
          alt="${title}"
        />
        <div class="modal__trailer-link">
          <template id="template">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" frameborder="0" allowfullscreen></iframe>
  </template><span class="modal__trailer-icon">&#x25B6</span>
        </div>
      </div>
    </div>
    <div class="film modal__film">
      <h2 class="film__title">${title}</h2>
      <ul class="film__list">
        <li class="film__item">
          <p class="film__info">Vote / Votes</p>
          <p class="film__value film__value--orange">${vote_average}</p>
          <p class="film_value-slash">&nbsp;/&nbsp;</p>
          <p class="film__value film__value--gray">${vote_count}</p>
        </li>
        <li class="film__item">
          <p class="film__info">Popularity</p>
          <p class="film__value">${popularity}</p>
        </li>
        <li class="film__item">
          <p class="film__info">Original Title</p>
          <p class="film__value">${title}</p>
        </li>
        <li class="film__item">
          <p class="film__info">Genre</p>
          <p class="film__value">${genre_ids}</p>
        </li>
      </ul>
      <div class="modal__about">
        <h3 class="film__pre-title">About</h3>
        
      </div>
      <p class="film__description">
        ${overview}
      </p>
      <div class="modal__btn-block">
        <button class="modal__btn modal__btn--orange" type="button" data-watched-btn>add to Watched</button>
        <button class="modal__btn" type="button" data-queue-btn>add to queue</button>
      </div>    
    </div>`;
}

export { getArrMovie };
export { clickedMovie };
