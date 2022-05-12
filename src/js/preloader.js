import { refs } from './refs';

function preloaderHide() {
  setTimeout(function () {
    refs.preloader.classList.add('visually-hidden');
  }, 1500);
}

preloaderHide();
