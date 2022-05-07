const openModalRef = document.querySelector('.openModal');
const backdropRef = document.querySelector('.js-backdrop');
const btnCloseModalRef = document.querySelector('.js-modal__close-btn');

openModalRef.addEventListener('click', onOpenMovieModal);
btnCloseModalRef.addEventListener('click', onCloseMovieModal);
backdropRef.addEventListener('click', onBackdropClick);
function onOpenMovieModal(e) {
  backdropRef.classList.add('show');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onCloseByEsc);
}

function onCloseMovieModal(e) {
  backdropRef.classList.remove('show');
  document.body.style.overflow = 'scroll';
  document.removeEventListener('keydown', onCloseByEsc);
}

function onBackdropClick(e) {
  if (e.target === backdropRef) {
    onCloseMovieModal();
  }
}

function onCloseByEsc(e) {
  if (e.code === 'Escape') {
    onCloseMovieModal();
  }
}
export { openModalRef };
