import {refs} from "./refs.js";

function openWatchedList() {
    refs.watchedBtn.classList.add('active-button');
    refs.queueBtn.classList.remove('active-button');
    renderWatchedList()

};

function openQueueList() {
    refs.queueBtn.classList.add('active-button');
    refs.watchedBtn.classList.remove('active-button');
    renderQueueList()
};


function renderWatchedList() {
    const movies = localStorage.getItem('watched-list')
    refs.libraryGallery.innerHTML =""
    if(movies === null) {
      return}

    const parsedMovies = JSON.parse(movies)
    
    renderListMarkup(parsedMovies)

}

function renderQueueList() {
    const movies = localStorage.getItem('queue-list')
    refs.libraryGallery.innerHTML=""
    if(movies === null) {
      return}

    const parsedMovies = JSON.parse(movies)
    if (refs.queueBtn.classList.contains('active-button')) {
      
      renderListMarkup(parsedMovies)
    }
  
}

function renderListMarkup(parsedMovies) {
  parsedMovies.map((movie) => {
    const markup = `<li class="card">
        <img class="card-img" src="https://image.tmdb.org/t/p/original${movie.image}" alt="${movie.name}" />
        <h3 class="card-title">${movie.name}</h3>
        <p class="card-description">
         ${movie.genres} | ${movie.year}<span class="card-rating">${movie.rating}</span>
        </p>
      </li>`
      refs.libraryGallery.insertAdjacentHTML('beforeend', markup)
  })        
}

export {openQueueList, openWatchedList, renderWatchedList};
