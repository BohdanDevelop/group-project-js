import { refs } from './refs';
import noPosterImg from '../images/no-poster.jpg';
import templateModalMarkup from '../template/modalMarkup';

export default class Markup {
  static formEl = refs.form;
  static inputEl = refs.input;
  static galleryEl = refs.gallery;
  static BASE_IMG_URL = refs.BASE_IMG_URL;
  static modalEl = refs.modal;

  static fetchMovies(data, data1) {
    data.filter(el => {
      if (el.poster_path) {
        el.poster_path = this.BASE_IMG_URL + el.poster_path;
      } else {
        el.poster_path = noPosterImg;
      }
      el.title = el.title.toUpperCase();
      el.release_date = el.release_date.slice(0, 4);
      el.popularity = parseFloat(el.popularity).toFixed(1);

      el.genre_ids = el.genre_ids.map(el => {
        data1.filter(elem => {
          if (el === elem.id) {
            el = elem.name;
          }
        });
        return el;
      });
      el.genre_ids = el.genre_ids.join(', ');
      return;
    });
  }

  static drawMovieCard(data) {
    this.galleryEl.innerHTML = data
      .map(el => {
        return `<li class="card" data-id=${el.id}>
          <img class="card-img" src=${el.poster_path} alt=${el.title} />
          <h3 class="card-title">${el.title}</h3>
          <p class="card-description">
           ${el.genre_ids} | ${el.release_date}<span class="card-rating">${el.vote_average}</span>
          </p>
        </li>`;
      })
      .join('');
  }

  static drawModal(data, key) {
    this.modalEl.innerHTML = templateModalMarkup(data, key);
  }
}
