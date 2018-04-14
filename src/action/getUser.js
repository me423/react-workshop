import {USER_URL, TOKEN} from './constants';
export const getUser = username => {
  return fetch(`${USER_URL}${username}?access_token=${TOKEN}`)
    .then(res => res.json())
    .catch(err => console.log(err));
};
