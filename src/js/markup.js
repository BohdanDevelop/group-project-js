import FetchAPI from './fetch';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery-list');
const BASE_URL_URL = 'https://www.themoviedb.org/t/p/w500';

export async function fetchTrending() {
  const fetchResponse = await FetchAPI.fetchTrendingMovies();
  const results = fetchResponse.data.results;
  console.log(results);
  const markup = results
    .map(el => {
      return `<li class="card" data-id=${el.id}>
          <img class="card-img" src=${BASE_URL_URL}${el.poster_path} alt=${el.title} />
          <h3 class="card-title">${el.title}</h3>
          <p class="card-description">
           ${el.genre_ids} | ${el.release_date}<span class="card-rating">${el.vote_average}</span>
          </p>
        </li>`;
    })
    .join('');
  galleryEl.innerHTML = markup;
}

fetchTrending();

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
