import { createAsyncThunk } from '@reduxjs/toolkit';
import { ACCESS_KEY, URL_API } from '../../api/const';
import axios from 'axios';

export const photosRequestAsync = createAsyncThunk('photos/fetch', (_, { getState }) => {
  const token = getState().token.token;
  // const page = getState().photos.page;
  // const count = getState().photos.count;
  // const photos = getState().photos.photos;

  const { photos, page, count } = getState().photos;

  // let options = {};

  // if (token) {
  //   options = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  // }

  const searchParams = new URLSearchParams('');
  searchParams.set('client_id', ACCESS_KEY);
  searchParams.append('per_page', count);
  searchParams.append('page', page);

  if (page && count) {
    searchParams.append('page', page);
    searchParams.append('per_page', count);
  }

  return axios(`${URL_API}/photos?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({ data }) => {
      let newPhotos = data;

      if (page > 1) {
        newPhotos = [...photos, ...newPhotos];
      }

      return {
        photos: newPhotos,
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        error: error.toString(),
      };
    });
});
