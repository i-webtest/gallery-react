import { createSlice } from '@reduxjs/toolkit';
import { photosRequestAsync } from './photosAction';

const initialState = {
  photos: [],
  page: 1,
  count: 30,
  error: '',
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    photosClear: (state) => {
      state.photos = [];
      state.page = 1;
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(photosRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(photosRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload.photos;
        state.error = '';
        state.page += 1;
      })
      .addCase(photosRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default photosSlice.reducer;
