import axios from 'axios';
import { URL_API } from '../../api/const';
import { deleteToken } from '../tokenReducer';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authRequest = () => ({
  type: AUTH_REQUEST,
  error: '',
});

export const authRequestSuccess = (data) => ({
  type: AUTH_REQUEST_SUCCESS,
  data,
});

export const authRequestError = (error) => ({
  type: AUTH_REQUEST_ERROR,
  error,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const authRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;

  if (!token) return;

  dispatch(authRequest());

  axios(`${URL_API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({ data }) => {
      const username = data.username;
      const name = data.name;
      const img = data.profile_image.small.replace(/\?.*$/, '');
      const info = { name, img, username };
      dispatch(authRequestSuccess(info));
    })
    .catch((error) => {
      console.error(error);
      dispatch(deleteToken());
      dispatch(authRequestError(error.toString()));
    });
};
