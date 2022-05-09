// import FetchAPI from './fetch';

// const formEl = document.querySelector('.search-form');
// const inputEl = document.querySelector('input[name="searchQuery"]');
// const galleryEl = document.querySelector('.gallery-list');
// const BASE_URL_IMG = 'https://www.themoviedb.org/t/p/w500';

export default class Markup {
  static formEl = document.querySelector('.search-form');
  static inputEl = document.querySelector('input[name="searchQuery"]');
  static galleryEl = document.querySelector('.gallery-list');
  static BASE_IMG_URL = 'https://www.themoviedb.org/t/p/w500';

  static fetchTrending(data, data1) {
    // console.log(data);
    this.galleryEl.innerHTML = '';
    data.filter(el => {
      el.title = el.title.toUpperCase();
      el.release_date = el.release_date.slice(0, 4);

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

    const markup = data
      .map(el => {
        return `<li class="card" data-id=${el.id}>
          <img class="card-img" src=${this.BASE_IMG_URL}${el.poster_path} alt=${el.title} />
          <h3 class="card-title">${el.title}</h3>
          <p class="card-description">
           ${el.genre_ids} | ${el.release_date}<span class="card-rating">${el.vote_average}</span>
          </p>
        </li>`;
      })
      .join('');
    this.galleryEl.innerHTML = markup;
  }
}

// formEl.addEventListener('submit', onSubmit);

// async function onSubmit(event) {
//   event.preventDefault();
//   const searchQuery = event.currentTarget.elements['searchQuery'].value.trim();
//   let page = 1;

//   if (searchQuery === '') {
//     console.log('Please type something');
//   }

//   const fetchResponse = await FetchAPI.fetchQuery(page, searchQuery);
//   console.log(fetchResponse);
// }
