import { createAsyncThunk } from '@reduxjs/toolkit';
import { ACCESS_KEY, URL_API } from '../../api/const';
import axios from 'axios';

export const photoRequestAsync = createAsyncThunk('photo/fetch', (id, { getState, rejectWithValue }) => {
  const token = getState().token.token;

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
      return { data, likes, isLiked };
    })
    .catch((error) => {
      console.error(error);
      return rejectWithValue(error.message);
    });
});
