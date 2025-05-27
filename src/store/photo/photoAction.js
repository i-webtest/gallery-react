import { createAsyncThunk } from '@reduxjs/toolkit';
import { ACCESS_KEY, URL_API } from '../../api/const';
import axios from 'axios';

export const photoRequestAsync = createAsyncThunk('photo/fetch', (id, { getState }) => {
  const token = getState().token.token;

  if (!token) return;

  const searchParams = new URLSearchParams('');
  searchParams.append('client_id', ACCESS_KEY);

  return axios(`${URL_API}/photos/${id}?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({ data }) => {
      const isLiked = data.liked_by_user;
      const likes = data.likes;
      return { data, isLiked, likes };
    })
    .catch((error) => {
      console.error(error);
      return { error: error.toString() };
    });
});
