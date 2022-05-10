import { refs } from './refs';
import noPosterImg from '../images/no-poster.jpg';

export default class Markup {
  static formEl = refs.form;
  static inputEl = refs.input;
  static galleryEl = refs.gallery;
  static BASE_IMG_URL = refs.BASE_IMG_URL;

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
      // getArrMovie(data);
      return;
    });
  }

  static drawMovieCard(data) {
    this.galleryEl.innerHTML = '';

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

  static drawModal(
    { poster_path, title, vote_average, vote_count, genre_ids, overview, popularity },
    key,
  ) {
    console.log(vote_average, vote_count);
    return `<div class="modal__img--block">
          <div >
            <img
              class="modal__img"
              src="${poster_path}"
              alt="${title}"
            />
            <button class="modal__trailer-link">
              <template id="template">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" frameborder="0" allowfullscreen></iframe>
      </template><span class="modal__trailer-icon">&#x25B6</span>
            </button>
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
            <button class="modal__btn modal__btn--orange" type="button">add to Watched</button>
            <button class="modal__btn" type="button">add to queue</button>
          </div>
        </div>`;
  }
}
