import { createSlice } from '@reduxjs/toolkit';
import { photoRequestAsync } from './photoAction';

const initialState = {
  photo: {},
  status: '',
  likes: 0,
  isLiked: false,
  error: '',
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    changeLikes: (state) => {
      state.likes += state.isLiked ? -1 : 1;
      state.isLiked = !state.isLiked;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(photoRequestAsync.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(photoRequestAsync.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.photo = action.payload.data;
        state.likes = action.payload.likes;
        state.isLiked = action.payload.isLiked;
        state.error = '';
      })
      .addCase(photoRequestAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export default photoSlice.reducer;
