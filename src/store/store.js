import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authReducer';
import { errorsReducer } from './errorsReducer';
import { tokenMiddleware, tokenReducer } from './tokenReducer';
import photosReducer from './photos/photosSlice';
import photoReducer from './photo/photoSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    photos: photosReducer,
    photo: photoReducer,
    errors: errorsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware),
});
