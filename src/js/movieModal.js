import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import { refs } from './refs';
import Markup from './markup';
import fetchAPI from './fetch';

export default class Modal {
  constructor() {
    this.newArrMovies;

    this.backdrop = refs.backdrop;
    this.modal = refs.modal;
    this.closeModalBtn = refs.closeModalBtn;
    this.gallery = refs.gallery;

    this.closeModalBtn.addEventListener('click', this.onCloseMovieModal.bind(this));
    this.backdrop.addEventListener('click', this.onBackdropClick.bind(this));
    this.gallery.addEventListener('click', this.onOpenMovieModal.bind(this));
  }

  getArrMovie(arr) {
    this.newArrMovies = arr;
  }

  async onOpenMovieModal(e) {
    if (e.target.nodeName === 'UL') {
      return;
    }

    this.backdrop.classList.add('show');
    document.body.style.overflow = 'hidden';

    try {
      const filmId = Number(e.target.closest('li').dataset.id);
      const rightMovie = this.newArrMovies.find(arr => arr.id === filmId);
      const trailerKey = await fetchAPI.fetchYoutube(filmId);
      // const keyOfTrailer = `"https://www.youtube.com/embed/${trailerKey.data.results[0].key}"`;
      const keyOfTrailer = trailerKey.data.results[0].key;
      Markup.drawModal(rightMovie, keyOfTrailer);
    } catch (err) {
      console.log(err);
    }

    const templateInstance = basicLightbox.create(document.querySelector('#template'));
    document.querySelector('button.modal__trailer-link').onclick = templateInstance.show;

    document.addEventListener('keydown', this.onCloseByEsc);
  }

  onCloseMovieModal(e) {
    this.backdrop.classList.remove('show');
    document.body.style.overflow = 'scroll';
    document.removeEventListener('keydown', this.onCloseByEsc);
    this.closeModalBtn.removeEventListener('click', this.onCloseMovieModal);
    this.backdrop.removeEventListener('click', this.onBackdropClick);
  }

  onBackdropClick(e) {
    if (e.target === this.backdrop) {
      this.onCloseMovieModal();
    }
  }

  onCloseByEsc(e) {
    if (e.code === 'Escape') {
      this.onCloseMovieModal();
    }
  }
}
