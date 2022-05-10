import axios from 'axios';
import { refs } from './refs';

export default class FetchAPI {
  static API_KEY = refs.API_KEY;
  static BASE_URL_TRENDING = refs.BASE_URL_TRENDING;
  static BASE_URL_GENRES = refs.BASE_URL_GANRES;
  static BASE_URL_SEARCH = refs.BASE_URL_SEARCH;

  static async fetchTrendingMovies(page) {
    refs.spinner.classList.add('is-visible');
    try {
      const response = await axios.get(this.BASE_URL_TRENDING, {
        params: {
          api_key: this.API_KEY,
          page,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(function () {
        refs.spinner.classList.remove('is-visible');
      }, 700);
    }
  }

  static async fetchGenres() {
    try {
      const response = await axios.get(this.BASE_URL_GENRES, {
        params: {
          api_key: this.API_KEY,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchByQuery(page, query) {
    try {
      refs.spinner.classList.add('is-visible');
      const response = await axios.get(this.BASE_URL_SEARCH, {
        params: {
          api_key: this.API_KEY,
          page,
          query,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      refs.spinner.classList.remove('is-visible');
    }
  }

  static async fetchYoutube(id) {
    try {
      let response = await axios.get(`https://api.themoviedb.org/3//movie/${id}/videos`, {
        params: {
          api_key: this.API_KEY,
          language: 'en - US',
        },
      });
      // console.log(data);
      return response;
    } catch (error) {
      console.log('error');
    }
  }
}

// let newArrMovies = null;
// async function onOpenMovieModal(e) {
//   try {
//     clearModal();
//     if (e.target.nodeName === 'UL') {
//       return;
//     }

//     const filmId = Number(e.target.closest('li').dataset.id);

//     refs.backdrop.classList.add('show');
//     document.body.style.overflow = 'hidden';

//     const rightMovie = newArrMovies.find(arr => arr.id === filmId);

//     const trailerKey = await fetchAPI.fetchYoutube(filmId);
//     const keyOfTrailer = trailerKey.data.results[0].key;

//     refs.modal.insertAdjacentHTML('afterbegin', markupModal(rightMovie, keyOfTrailer));

//     const templateInstance = basicLightbox.create(document.querySelector('#template'));
//     document.querySelector('button.modal__trailer-link').onclick = templateInstance.show;

//     document.addEventListener('keydown', onCloseByEsc);
//     refs.closeModalBtn.addEventListener('click', onCloseMovieModal);
//     refs.backdrop.addEventListener('click', onBackdropClick);
//   } catch (error) {
//     console.log(error);
//   }
// }

// function onCloseMovieModal(e) {
//   refs.backdrop.classList.remove('show');
//   document.body.style.overflow = 'scroll';
//   document.removeEventListener('keydown', onCloseByEsc);
//   refs.closeModalBtn.removeEventListener('click', onCloseMovieModal);
//   refs.backdrop.removeEventListener('click', onBackdropClick);
// }

// function getArrMovie(arr) {
//   newArrMovies = arr;
// }

// function onBackdropClick(e) {
//   if (e.target === refs.backdrop) {
//     onCloseMovieModal();
//   }
// }

// function onCloseByEsc(e) {
//   if (e.code === 'Escape') {
//     onCloseMovieModal();
//   }
// }

// function clearModal() {
//   refs.modal.innerHTML = '';
// }

// function markupModal(
//   { poster_path, title, vote_average, vote_count, genre_ids, overview, popularity },
//   key,
// ) {
//   return `<div class="modal__img--block">
//       <div >
//         <img
//           class="modal__img"
//           src="${poster_path}"
//           alt="${title}"
//         />
//         <button class="modal__trailer-link">
//           <template id="template">
//     <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" frameborder="0" allowfullscreen></iframe>
//   </template><span class="modal__trailer-icon">&#x25B6</span>
//         </button>
//       </div>
//     </div>
//     <div class="film modal__film">
//       <h2 class="film__title">${title}</h2>
//       <ul class="film__list">
//         <li class="film__item">
//           <p class="film__info">Vote / Votes</p>
//           <p class="film__value film__value--orange">${vote_average}</p>
//           <p class="film_value-slash">&nbsp;/&nbsp;</p>
//           <p class="film__value film__value--gray">${vote_count}</p>
//         </li>
//         <li class="film__item">
//           <p class="film__info">Popularity</p>
//           <p class="film__value">${popularity}</p>
//         </li>
//         <li class="film__item">
//           <p class="film__info">Original Title</p>
//           <p class="film__value">${title}</p>
//         </li>
//         <li class="film__item">
//           <p class="film__info">Genre</p>
//           <p class="film__value">${genre_ids}</p>
//         </li>
//       </ul>
//       <div class="modal__about">
//         <h3 class="film__pre-title">About</h3>

//       </div>
//       <p class="film__description">
//         ${overview}
//       </p>
//       <div class="modal__btn-block">
//         <button class="modal__btn modal__btn--orange" type="button">add to Watched</button>
//         <button class="modal__btn" type="button">add to queue</button>
//       </div>
//     </div>`;
// }
