import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import fetchAPI from './fetch';
import { refs } from './refs';
import Markup from './markup';

export default class Modal {
  constructor() {
    this.newArrMovies = newArr;

    this.backdrop = refs.backdrop;
    // this.modal = refs.modal;
    this.closeModalBtn = refs.closeModalBtn;
    this.gallery = refs.gallery;

    this.closeModalBtn.addEventListener('click', this.onCloseMovieModal.bind(this));
    this.backdrop.addEventListener('click', this.onBackdropClick.bind(this));
    this.gallery.addEventListener('click', this.onOpenMovieModal.bind(this));
    console.log(this.newArrMovies);

    this.getArrMovie = function getArrMovie(arr) {
      // console.log(arr);
      this.newArr = arr;
      // arr.map(el => this.newArrMovies.push(el));
    };
  }

  async onOpenMovieModal(e) {
    try {
      // this.modal.innerHTML = '';
      if (e.target.nodeName === 'UL') {
        return;
      }

      const filmId = Number(e.target.closest('li').dataset.id);

      this.backdrop.classList.add('show');
      document.body.style.overflow = 'hidden';

      const rightMovie = this.newArrMovies.find(arr => arr.id === filmId);
      console.log(rightMovie);

      const trailerKey = await fetchAPI.fetchYoutube(filmId);
      const keyOfTrailer = trailerKey.data.results[0].key;

      this.modal.insertAdjacentHTML('afterbegin', Markup.drawModal(rightMovie, keyOfTrailer));

      const templateInstance = basicLightbox.create(document.querySelector('#template'));
      document.querySelector('button.modal__trailer-link').onclick = templateInstance.show;

      document.addEventListener('keydown', this.onCloseByEsc);
    } catch (error) {
      console.log(error);
    }
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
