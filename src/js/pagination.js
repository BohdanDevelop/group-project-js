import fetchAPI from './fetch';
import Markup from './markup';

const container = document.getElementById('pagination');
function getOptions(totalItems) {
  return {
    totalItems: totalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
}

async function onPaginationTrending(event) {
  let page = event.page;
  try {
    const res = await Promise.all([fetchAPI.fetchTrendingMovies(page), fetchAPI.fetchGenres()]);
    Markup.fetchMovies(res[0].data.results, res[1].data.genres);
    Markup.drawMovieCard(res[0].data.results);
  } catch (error) {
    console.log(error);
  }
}

async function onPaginationSearch(event, searchQuery) {
  let page = event.page;
  try {
    const res = await Promise.all([
      fetchAPI.fetchByQuery(page, searchQuery),
      fetchAPI.fetchGenres(),
    ]);
    Markup.fetchMovies(res[0].data.results, res[1].data.genres);
    Markup.drawMovieCard(res[0].data.results);
  } catch (error) {
    console.log(error);
  }
}

export { getOptions, container, onPaginationTrending, onPaginationSearch };
