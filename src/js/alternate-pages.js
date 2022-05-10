import {refs} from "./refs.js"
import { renderWatchedList } from "./library-lists.js";

function openLibraryPage() {
    refs.homePage.classList.remove('current-page');
    refs.libraryPage.classList.add('current-page');
    refs.header.classList.add('library');
    refs.libraryBtns.classList.add('visible');
    refs.form.classList.add('hidden');
    refs.message.classList.add('hidden');

    refs.gallery.classList.add('hidden')
    refs.libraryGallery.classList.remove('hidden')

    refs.watchedBtn.classList.add('active-button')
    refs.queueBtn.classList.remove('active-button')
    
    renderWatchedList()
    
}

function openHomePage() {
    refs.homePage.classList.add('current-page');
    refs.libraryPage.classList.remove('current-page');
    refs.header.classList.remove('library');
    refs.libraryBtns.classList.remove('visible');
    refs.form.classList.remove('hidden');
    refs.message.classList.remove('hidden');

    refs.gallery.classList.remove('hidden')
    refs.libraryGallery.classList.add('hidden')
   
}

export {openHomePage, openLibraryPage}
