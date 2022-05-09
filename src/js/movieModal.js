// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';

import fetchAPI from './fetch';
import { refs } from './refs';

refs.gallery.addEventListener('click', onOpenMovieModal);

function onOpenMovieModal(e) {
  clearModal();
  if (e.target.nodeName === 'UL') {
    return;
  }

  const filmId = e.target.closest('li').dataset.id;

  refs.backdrop.classList.add('show');
  document.body.style.overflow = 'hidden';

  fetchAPI
    .fetchMovieByID(filmId)
    .then(r => {
      refs.modal.insertAdjacentHTML('afterbegin', markupModal(r.data));
    })
    .catch(error => {
      console.log(error);
    });

  document.addEventListener('keydown', onCloseByEsc);
  refs.closeModalBtn.addEventListener('click', onCloseMovieModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
}

function onCloseMovieModal(e) {
  refs.backdrop.classList.remove('show');
  document.body.style.overflow = 'scroll';
  document.removeEventListener('keydown', onCloseByEsc);
  refs.closeModalBtn.removeEventListener('click', onCloseMovieModal);
  refs.backdrop.removeEventListener('click', onBackdropClick);
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

function markupModal({
  poster_path,
  original_title,
  title,
  name,
  vote_average,
  vote_count,
  genres,
  overview,
  popularity,
  id,
}) {
  const genresList = genres.map(({ name }) => name).join(', ');
  return `<div class="modal__img--block">
      <img
        class="modal__img"
        src="https://image.tmdb.org/t/p/original${poster_path}"
        alt="${original_title}"
      />
    </div>
    <div class="film modal__film">
      <h2 class="film__title">${original_title}</h2>
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
          <p class="film__value">${original_title}</p>
        </li>
        <li class="film__item">
          <p class="film__info">Genre</p>
          <p class="film__value">${genresList}</p>
        </li>
      </ul>
      <div class="modal__about">
        <h3 class="film__pre-title">About</h3>
        <a
          class="modal__trailer-link"
          href="https://www.youtube.com/watch?v=MCAnQIs_kAs&ab_channel=MovieTrailersSource"
        >
          <p><span class="modal__trailer-icon">&#x25B6</span> Watch Trailer</p></a
        >
      </div>
      <p class="film__description">
        ${overview}
      </p>
      <div class="modal__btn-block">
        <button class="modal__btn modal__btn--orange" type="button">add to Watched</button>
        <button class="modal__btn" type="button">add to queue</button>
      </div>    
      
    </div>`;
}
