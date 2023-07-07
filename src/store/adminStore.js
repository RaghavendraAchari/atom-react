import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './Admin/albumSlice';
import artReducer from './Admin/artSlice';

export default configureStore({
  reducer: {
    album: albumReducer,
    art: artReducer
  }
});