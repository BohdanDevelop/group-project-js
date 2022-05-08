import {refs} from "./refs.js"

function openLibraryPage() {
    refs.homePage.classList.remove('current-page');
    refs.libraryPage.classList.add('current-page');
    refs.header.classList.add('library');
    refs.libraryBtns.classList.add('visible');
    refs.form.classList.add('hidden');
    refs.message.classList.add('hidden');
}

function openHomePage() {
    refs.homePage.classList.add('current-page');
    refs.libraryPage.classList.remove('current-page');
    refs.header.classList.remove('library');
    refs.libraryBtns.classList.remove('visible');
    refs.form.classList.remove('hidden');
    refs.message.classList.remove('hidden');
}

export {openHomePage, openLibraryPage}