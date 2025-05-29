import axios from 'axios';
import { ACCESS_KEY, API_URL_TOKEN, REDIRECT_URI, SECRET_KEY } from './const';

export const setToken = (token) => {
  localStorage.setItem('bearer', token);
};

export const getToken = () => {
  let token = '';

  if (location.search.includes('code')) {
    const code = new URLSearchParams(location.search).get('code');
    const url = new URL(API_URL_TOKEN);

    url.searchParams.append('client_id', ACCESS_KEY);
    url.searchParams.append('client_secret', SECRET_KEY);
    url.searchParams.append('redirect_uri', REDIRECT_URI);
    url.searchParams.append('code', code);
    url.searchParams.append('grant_type', 'authorization_code');

    axios
      .post(url)
      .then(({ data }) => {
        token = data.access_token;
        setToken(data.access_token);
        location.replace('/');
      })
      .catch((error) => {
        console.error(error.messsage);
      });
  }

  if (localStorage.getItem('bearer')) {
    token = localStorage.getItem('bearer');
  }

  return token;
};
