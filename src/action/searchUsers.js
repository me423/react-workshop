import {URL} from './constants';
export const searchUsers = (query, page) => {
  return fetch(`${URL}&q=${query}&page=${page}`)
    .then(res => res.json())
    .catch(err => console.log(err));
};
