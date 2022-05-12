const footerModalButton = document.querySelector('.footer-modalButton');
const footerBackDrop = document.querySelector('.footer-backdrop');
const footerModal = document.querySelector('.footer-modal');
const footerCloseBtn = document.querySelector('.footer__close-btn');

footerModalButton.addEventListener('click', evt => {
  evt.preventDefault();
  footerBackDrop.classList.add('footer-backdrop--visible');
  footerModal.classList.add('footer-modal--visible');
  document.body.style.overflow = 'hidden';
  footerCloseBtn.addEventListener('click', evt => {
    footerBackDrop.classList.remove('footer-backdrop--visible');
    footerModal.classList.remove('footer-modal--visible');
    document.body.style.overflow = 'auto';
  });
});
