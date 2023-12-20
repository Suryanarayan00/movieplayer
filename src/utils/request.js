import {apiGet} from './utils';

const getMovieListRequest = page =>
  apiGet(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
  );

const getMovieDetailRequest = movieId =>
  apiGet(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`);

const getSearchMovieRequest = searchText =>
  apiGet(`https://api.themoviedb.org/3/search/movie?query=${searchText}&language=en-US&page=1`);

export {getMovieListRequest, getMovieDetailRequest, getSearchMovieRequest};
