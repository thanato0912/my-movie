export const movieAPIKey = '77ec013b8f3ebce20f6b6b185bc76d23';
export const movieURI = 'https://api.themoviedb.org/3/';
export const imageURL = 'https://image.tmdb.org/t/p/';

if (process.env.REACT_APP === 'development') {
  export const BASE_URL = 'http://localhost:5000/';
} else {
  export const BASE_URL = '52.79.61.9:5000/';
}
