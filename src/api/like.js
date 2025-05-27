import axios from 'axios';
import { ACCESS_KEY, URL_API } from './const';

export const likeUpdate = (id, token, method) => {
  const searchParams = new URLSearchParams('');
  searchParams.append('client_id', ACCESS_KEY);

  if (!token) return;

  axios(`${URL_API}/photos/${id}/like?${searchParams.toString()}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      console.log('data: ', data);
    })
    .catch((error) => ({ error: error.toString() }));
};
