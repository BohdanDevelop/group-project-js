import {refs} from "./refs.js";

function openWatchedList() {
    refs.watchedBtn.classList.add('active-button');
    refs.queueBtn.classList.remove('active-button');
};

function openQueueList() {
    refs.queueBtn.classList.add('active-button');
    refs.watchedBtn.classList.remove('active-button');
};

export {openQueueList, openWatchedList};